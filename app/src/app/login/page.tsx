"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div className="pt-20">
            {session ? (
                <>
                    <div className="text-white">You are signed in.</div>
                    <button onClick={() => signOut()}>Sign Out</button>
                </>
            ) : (
                <>
                    <div className="text-white">You are signed out.</div>
                    <button onClick={() => signIn("google")}>Sign In</button>
                </>
            )}
        </div>
    );
}