"use client";
import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDarkMode, setDarkMode] = useState(
    false
    // () => localStorage.getItem("theme") === "dark"
  );
  // console.log("check dark mode", isDarkMode);
  useEffect(() => {
    // console.log("co cc", isDarkMode);

    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
    }
  }, []);
  let toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    const next = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", next);
  };
  useEffect(() => {
    // console.log("check dark", isDarkMode);
    const html = window.document.documentElement;
    const prev = isDarkMode ? "light" : "dark";
    html.classList.remove(prev);
    const next = isDarkMode ? "dark" : "light";
    html.classList.add(next);
  }, [isDarkMode]);
  return { isDarkMode, toggleDarkMode };
}
