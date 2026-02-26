"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex gap-2 max-w-400 select-none p-3 w-full justify-between items-center mb-2 max-md:mb-0">
      <div className="flex gap-1 items-center">
        <Image
          src={"/sun.png"}
          width={80}
          height={100}
          alt="sun"
          className="max-md:w-8 w-10"
        />{" "}
        <p className="font-bold max-md:text-xl text-body text-3xl ">
          Mood Journal
        </p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-2 text-text-secondary hover:text-header transition-colors px-3 py-2 rounded-xl hover:bg-sky/30"
        title="Sign out"
      >
        <FiLogOut className="w-5 h-5" />
        <span className="max-md:hidden text-lg font-medium">Sign out</span>
      </button>
    </div>
  );
};

export default Header;
