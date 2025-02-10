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
import useBusStore from "@/store/useBusStore";

function Header() {
  const Menu = [
    { id: 1, name: "Services", path: "/services" },
    { id: 2, name: "Locations", path: "/locations" },
  ];

  const { isSignedIn } = useUser();

  const { isAdmin } = useBusStore();

  return (
    <div className="fixed w-full backdrop-blur-sm bg-white shadow-md transition-all duration-300 p-4 flex items-center justify-between rounded-b-lg z-50">
      <div className="flex items-center gap-10">
        <Link href="/">
          <h1 className="text-xl font-bold text-black cursor-pointer">
            UrbanFlow
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <li className="cursor-pointer hover:scale-105 transition-all ease-in-out text-black">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        {isAdmin && (
          <Link href={"/admin"}>
            <span className="cursor-pointer hover:scale-105 transition-all ease-in-out text-black">
              Admin
            </span>
          </Link>
          
        )}
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
