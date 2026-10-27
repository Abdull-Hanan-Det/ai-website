import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  signInWithGoogle,
  signOutUser,
  BOOTSTRAPPED_ADMIN_EMAIL,
} from '../firebase';

interface FirebaseContextValue {
  user: User | null;
  isAuthReady: boolean;
  isAdmin: boolean;
  authError: string | null;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  user: null,
  isAuthReady: false,
  isAdmin: false,
  authError: null,
  loginWithGoogle: async () => null,
  logout: async () => {},
});

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = Boolean(
    user &&
      user.emailVerified &&
      user.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()
  );

  const loginWithGoogle = async (): Promise<User | null> => {
    setAuthError(null);
    try {
      const cred = await signInWithGoogle();
      return cred.user;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Google Sign-In failed.';
      setAuthError(msg);
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    setAuthError(null);
    try {
      await signOutUser();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign-out failed.';
      setAuthError(msg);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAuthReady,
        isAdmin,
        authError,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
