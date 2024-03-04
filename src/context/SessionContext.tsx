"use client"
// SessionContext.tsx
import { Session } from 'next-auth';
import { ReactNode, createContext, useContext } from 'react';

interface SessionContextType {
  session: Session | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children, session }: { children: ReactNode, session: Session | null }) => {
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
