"use client";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Services", path: "/services" },
    { id: 3, name: "Locations", path: "/locations" },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Image
              src={
                user.picture ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
              alt="profile-image"
              width={40}
              height={40}
              className="rounded-full border border-white"
            />
          </PopoverTrigger>
          <PopoverContent className="w-44 bg-white shadow-lg rounded-lg">
            <ul className="flex flex-col gap-2">
              <Link
                href="/my-booking"
                className="hover:bg-gray-100 p-2 rounded-md"
              >
                My Booking
              </Link>
              <li className="hover:bg-gray-100 p-2 rounded-md">
                <LogoutLink>Logout</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button className="bg-primary text-white hover:bg-primary/80">
            Get Started
          </Button>
        </LoginLink>
      )}
    </div>
  );
}

export default Header;
