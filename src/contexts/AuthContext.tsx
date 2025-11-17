"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

interface AuthContextType {
    session: any;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session, isPending } = useSession();

    return (
        <AuthContext.Provider value={{ session, isLoading: isPending }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
