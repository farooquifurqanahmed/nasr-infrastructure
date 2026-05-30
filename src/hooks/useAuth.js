import { useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Local storage fallback for admin sessions
      const session = localStorage.getItem('nasr_admin_session');
      if (session) {
        setUser(JSON.parse(session));
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      if (isFirebaseConfigured && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setLoading(false);
        return userCredential.user;
      } else {
        // Fallback checks
        if (email === 'admin@nasr.com' && password === 'admin123') {
          const mockUser = {
            uid: 'mock-admin-uid-12345',
            email: 'admin@nasr.com',
            displayName: 'Nasr Admin (Offline)',
            isMock: true
          };
          localStorage.setItem('nasr_admin_session', JSON.stringify(mockUser));
          setUser(mockUser);
          setLoading(false);
          return mockUser;
        } else {
          throw new Error('Invalid credentials. For local preview, use admin@nasr.com and admin123');
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await fbSignOut(auth);
      } else {
        localStorage.removeItem('nasr_admin_session');
        setUser(null);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout
  };
};
