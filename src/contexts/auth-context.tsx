import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { getStorageItem, setStorageItem } from '@/lib/utils';
import { UserModel } from '@/models/user';

const LOCAL_STORAGE_USER_KEY = 'cm:user';

type AuthContextType = {
  user: UserModel | null;

  login(user: UserModel): void;
  logout(): void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);

  const login = (user: UserModel) => {
    setUser(user);
    setStorageItem(LOCAL_STORAGE_USER_KEY, user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  useEffect(() => {
    const recoverSession = () => {
      try {
        const storedUser = getStorageItem(LOCAL_STORAGE_USER_KEY);

        if (storedUser) {
          login(JSON.parse(storedUser));
        } else {
          logout();
        }
      } catch (error) {
        console.error('Failed to recover session:', error);
        logout();
      }
    };

    recoverSession();
  }, []);

  const value = {
    user,
    login,
    logout,
  } satisfies AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
