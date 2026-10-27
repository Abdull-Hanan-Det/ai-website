# Security Specification (Phase 0 — Payload-First Security TDD)

## 1. Data Invariants & Master Source of Truth

1. **Default-Deny Catch-All**: Every path not explicitly matched is rejected via `match /{document=**} { allow read, write: if false; }`.
2. **Verified Authentication Requirement**: All standard writes and reads require `request.auth != null && request.auth.token.email_verified == true`.
3. **Path Variable Hardening**: Every single-document target operation (`get`, `create`, `update`, `delete`) validates its path ID using `isValidId(id)` (`id is string && id.size() >= 1 && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$')`).
4. **PII Isolation (`/inquiries/{inquiryId}`)**: Because `Inquiry` documents contain PII (`name`, `email`), `get` and `list` operations are strictly restricted to the document's `authorUid` (`resource.data.authorUid == request.auth.uid`) or a verified administrator.
5. **Strict Schema & Volumetric Bounds (`isValidInquiry`)**:
   - `authorUid`: `string`, `1..128` chars, regex `^[a-zA-Z0-9_\-]+$`, must match `request.auth.uid` on create and remain immutable on update.
   - `name`: `string`, `2..100` chars.
   - `email`: `string`, `5..150` chars, regex `^[^@\s]+@[^@\s]+\.[^@\s]+$`.
   - `projectType`: `string`, `2..120` chars.
   - `message`: `string`, `15..2000` chars.
   - `status`: `string` in `['received', 'in_review', 'replied', 'closed']`. Must be `'received'` on initial creation.
   - `createdAt` & `updatedAt`: `timestamp`. On `create`, both must equal `request.time`. On `update`, `createdAt` is immutable (`incoming().createdAt == existing().createdAt`) and `updatedAt == request.time`.
6. **Terminal State Locking**: Once `existing().status == 'closed'`, non-admin users cannot perform further updates on `/inquiries/{inquiryId}`.

---

## 2. The "Dirty Dozen" Payloads (Adversarial Vectors)

1. **Payload 01 — Identity Spoofing (`authorUid` mismatch)**:
   ```json
   {
     "authorUid": "victim_uid_999",
     "name": "Attacker",
     "email": "attacker@example.com",
     "projectType": "AI Agents",
     "message": "Attempting to spoof another user UID on creation.",
     "status": "received",
     "createdAt": "SERVER_TIMESTAMP",
     "updatedAt": "SERVER_TIMESTAMP"
   }
   ```
2. **Payload 02 — Shadow Field Injection (`isAdmin: true`)**:
   ```json
   {
     "authorUid": "user_123",
     "name": "Normal Name",
     "email": "user@example.com",
     "projectType": "AI Agents",
     "message": "Valid message length here for testing.",
     "status": "received",
     "isAdmin": true,
     "createdAt": "SERVER_TIMESTAMP",
     "updatedAt": "SERVER_TIMESTAMP"
   }
   ```
3. **Payload 03 — State Shortcutting on Create (`status: 'replied'`)**:
   ```json
   {
     "authorUid": "user_123",
     "name": "Normal Name",
     "email": "user@example.com",
     "projectType": "AI Agents",
     "message": "Attempting to create an inquiry already marked replied.",
     "status": "replied",
     "createdAt": "SERVER_TIMESTAMP",
     "updatedAt": "SERVER_TIMESTAMP"
   }
   ```
4. **Payload 04 — Unverified Email Spoof Attack (`email_verified: false`)**:
   ```json
   {
     "auth": { "uid": "spoof_admin", "token": { "email": "abdullhanan212@gmail.com", "email_verified": false } },
     "operation": "get /inquiries/inq_1"
   }
   ```
5. **Payload 05 — Resource Exhaustion / Oversized Message (`message.size() > 2000`)**:
   ```json
   {
     "authorUid": "user_123",
     "name": "Normal Name",
     "email": "user@example.com",
     "projectType": "AI Agents",
     "message": "<2500_CHARACTER_PAYLOAD>",
     "status": "received",
     "createdAt": "SERVER_TIMESTAMP",
     "updatedAt": "SERVER_TIMESTAMP"
   }
   ```
6. **Payload 06 — Path ID Poisoning (`inquiryId` with invalid characters `../admin`)**:
   ```json
   {
     "path": "/inquiries/bad$id!@#",
     "operation": "create"
   }
   ```
7. **Payload 07 — Temporal Forgery (Backdated `createdAt`)**:
   ```json
   {
     "authorUid": "user_123",
     "name": "Normal Name",
     "email": "user@example.com",
     "projectType": "AI Agents",
     "message": "Forging a past timestamp on creation.",
     "status": "received",
     "createdAt": "2020-01-01T00:00:00Z",
     "updatedAt": "SERVER_TIMESTAMP"
   }
   ```
8. **Payload 08 — Immutable Field Tampering on Update (`authorUid` or `createdAt` changed)**:
   ```json
   {
     "authorUid": "different_uid",
     "updatedAt": "SERVER_TIMESTAMP"
   }
   ```
9. **Payload 09 — Terminal State Bypass (Updating an inquiry where `existing().status == 'closed'`)**:
   ```json
   {
     "message": "Trying to edit a closed inquiry as regular owner.",
     "updatedAt": "SERVER_TIMESTAMP"
   }
   ```
10. **Payload 10 — Value Poisoning on Update (`message` set to integer `12345`)**:
    ```json
    {
      "message": 12345,
      "updatedAt": "SERVER_TIMESTAMP"
    }
    ```
11. **Payload 11 — Cross-Tenant PII Read (Authenticated User B reading User A's inquiry)**:
    ```json
    {
      "auth": { "uid": "user_b", "token": { "email_verified": true } },
      "operation": "get /inquiries/inquiry_owned_by_user_a"
    }
    ```
12. **Payload 12 — Self-Assigned Admin Privilege Escalation (`create /admins/user_b`)**:
    ```json
    {
      "auth": { "uid": "user_b", "token": { "email": "attacker@example.com", "email_verified": true } },
      "path": "/admins/user_b",
      "payload": { "uid": "user_b", "createdAt": "SERVER_TIMESTAMP" }
    }
    ```
