/**
 * Firestore Security Rules Specification Test Suite
 * Verifies that all 12 Dirty Dozen adversarial payloads return PERMISSION_DENIED.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  auth: {
    uid: string;
    email: string;
    email_verified: boolean;
  } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Identity Spoofing: authorUid mismatch on create',
    operation: 'create',
    path: '/inquiries/inq_01',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      authorUid: 'victim_999',
      name: 'Attacker',
      email: 'user@example.com',
      projectType: 'AI Agents',
      message: 'Valid length message for inquiry testing.',
      status: 'received',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Shadow Field Injection: extra isAdmin key on create',
    operation: 'create',
    path: '/inquiries/inq_02',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      authorUid: 'user_123',
      name: 'User',
      email: 'user@example.com',
      projectType: 'AI Agents',
      message: 'Valid length message for inquiry testing.',
      status: 'received',
      isAdmin: true,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'State Shortcutting: creating inquiry with status=replied',
    operation: 'create',
    path: '/inquiries/inq_03',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      authorUid: 'user_123',
      name: 'User',
      email: 'user@example.com',
      projectType: 'AI Agents',
      message: 'Valid length message for inquiry testing.',
      status: 'replied',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Email Spoofing: admin email with email_verified=false',
    operation: 'get',
    path: '/inquiries/inq_01',
    auth: { uid: 'spoof_uid', email: 'abdullhanan212@gmail.com', email_verified: false },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Resource Exhaustion: message exceeding 2000 chars',
    operation: 'create',
    path: '/inquiries/inq_05',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      authorUid: 'user_123',
      name: 'User',
      email: 'user@example.com',
      projectType: 'AI Agents',
      message: 'A'.repeat(2100),
      status: 'received',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Path Variable Poisoning: invalid characters in inquiryId',
    operation: 'create',
    path: '/inquiries/invalid$id!@#',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      authorUid: 'user_123',
      name: 'User',
      email: 'user@example.com',
      projectType: 'AI Agents',
      message: 'Valid length message for inquiry testing.',
      status: 'received',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Temporal Forgery: forged client timestamp on create',
    operation: 'create',
    path: '/inquiries/inq_07',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      authorUid: 'user_123',
      name: 'User',
      email: 'user@example.com',
      projectType: 'AI Agents',
      message: 'Valid length message for inquiry testing.',
      status: 'received',
      createdAt: '2020-01-01T00:00:00Z',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Immutable Field Tampering: modifying authorUid on update',
    operation: 'update',
    path: '/inquiries/inq_01',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      authorUid: 'other_user',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Terminal State Bypass: owner updating a closed inquiry',
    operation: 'update',
    path: '/inquiries/inq_closed',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      message: 'Attempting to modify after status reached closed.',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Value Poisoning: non-string message on update',
    operation: 'update',
    path: '/inquiries/inq_01',
    auth: { uid: 'user_123', email: 'user@example.com', email_verified: true },
    payload: {
      message: 999999,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Cross-Tenant PII Read: non-owner reading another user inquiry',
    operation: 'get',
    path: '/inquiries/inq_owned_by_user_a',
    auth: { uid: 'user_b', email: 'userb@example.com', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Privilege Escalation: non-admin creating admin document',
    operation: 'create',
    path: '/admins/user_b',
    auth: { uid: 'user_b', email: 'userb@example.com', email_verified: true },
    payload: {
      uid: 'user_b',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
];
