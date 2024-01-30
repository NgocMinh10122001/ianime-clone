import { useEffect } from "react";

const useResizeNavbar = (setResponsive: Function, setResponsive2: Function) => {
  useEffect(() => {
    // Define a function to resize all elements with the ID "content"
    const resizeAllContentElements = () => {
      const containerWidth = window.innerWidth;
      if (containerWidth >= 768) {
        setResponsive(true);
        setResponsive2(false);
      } else {
        setResponsive(false);
        setResponsive2(false);
      }
    };

    // Add a resize event listener to the window, calling the resize function
    window.addEventListener("resize", resizeAllContentElements);

    // Call the function initially to set the initial size
    resizeAllContentElements();

    // Clean up: remove the resize event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", resizeAllContentElements);
    };
  }, []); // Empty dependency array to run the effect only once
};

export default useResizeNavbar;
