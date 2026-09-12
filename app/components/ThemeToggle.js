"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { RiMoonClearLine } from "react-icons/ri";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme("light");
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div onClick={() => setTheme(theme === "light" ? "light" : "light")}>
      {theme === "light" ? (
        <IoSunnyOutline className="h-6 w-6 text-white" />
      ) : (
        <RiMoonClearLine className="h-6 w-6 text-black" />
      )}
    </div>
  );
}