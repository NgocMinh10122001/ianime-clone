import React, { useEffect, useState } from "react";

export default function useDarkMode() {
  // useEffect(() => {
  //   localStorage.setItem("theme", "");
  // });

  const [isDarkMode, setDarkMode] = useState(() => true);
  let toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
  useEffect(() => {
    // console.log("check dark", isDarkMode);
    const html = window.document.documentElement;
    const prev = isDarkMode ? "dark" : "light";
    html.classList.remove(prev);
    const next = isDarkMode ? "light" : "dark";
    html.classList.add(next);
    // localStorage.setItem("theme", next);
  }, [isDarkMode]);
  return { isDarkMode, toggleDarkMode };
}
