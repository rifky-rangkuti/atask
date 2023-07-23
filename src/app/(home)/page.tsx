"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Board from "./components/Board";
import Image from "next/image";
import clsx from "clsx";
import { Session } from "next-auth";

type SessionWithToken = Session & { accessToken?: string };

export default function Home() {
  const session = useSession();
  // Fast way to cast type | not recommended in prod env
  const token = (session.data as SessionWithToken)?.accessToken;
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" && e.metaKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <main
      className={clsx(
        "flex items-center h-screen bg-zinc-900 flex-col overflow-auto",
        session.status !== "authenticated" ? "justify-center" : "pt-[5vh]"
      )}
    >
      {session.status === "unauthenticated" && (
        <Link href="api/auth/signin" className="text-white">
          Sign In First!
        </Link>
      )}
      {session.status === "loading" && (
        <p className="text-white text-3xl font-semibold">
          I understand your patience is Amazing...
        </p>
      )}
      {session.status === "authenticated" && (
        <>
          <Board
            search={search}
            setSearch={setSearch}
            token={token}
            searchRef={searchRef}
          />
          <div className="w-full max-w-[480px] flex items-center mt-2">
            <Image
              src={session.data.user?.image as string}
              alt={session.data.user?.name as string}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="ml-4">
              <p className="text-white">{session.data.user?.name}</p>
              <Link href="/api/auth/signout" className="text-red-400">
                Sign Out
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
