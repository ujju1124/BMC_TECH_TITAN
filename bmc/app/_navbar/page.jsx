"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Header() {
  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Services", path: "/services" },
    { id: 3, name: "Locations", path: "/locations" },
  ];

  const { isSignedIn } = useUser();

  return (
    <div className="fixed w-full backdrop-blur-sm bg-white/10 shadow-md transition-all duration-300 p-4 flex items-center justify-between rounded-b-lg z-50">
      <div className="flex items-center gap-10">
        <Link href="/">
          <h1 className="text-xl font-bold text-white cursor-pointer">
            Path Finder
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <li className="cursor-pointer hover:scale-105 transition-all ease-in-out text-white">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* User Authentication */}
      {isSignedIn ? (
        <UserButton />
      ) : (
        <>
          <Button className="bg-primary text-white hover:bg-primary/80">
            {isSignedIn ? (
              <SignOutButton />
            ) : (
              <SignInButton forceRedirectUrl={"/sign-in"} />
            )}
          </Button>
        </>
      )}
    </div>
  );
}

export default Header;
