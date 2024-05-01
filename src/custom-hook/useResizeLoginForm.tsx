import { useEffect } from "react";

const useResizeLoginForm = () => {
  useEffect(() => {
    // Define a function to resize all elements with the ID "content"
    const resizeAllContentElements = () => {
      // Get all elements with the ID "content"
      const contentElements = document.querySelectorAll('[id^="login-form"]');
      // const title = document.getElementById("title");

      // Loop through each element and set the height
      contentElements.forEach((element) => {
        // Cast the element to HTMLElement to access the style property
        const content = element as HTMLElement;

        // Get the current width of the contentContainer
        const containerWidth = window.innerWidth;

        if (containerWidth >= 1536) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.2734375; // 16:9 aspect ratio
          // Set the height of the content element
          content.style.width = newHeight + "px";
        } else if (containerWidth >= 1280) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.2734375; // 16:9 aspect ratio

          // Set the height of the content element
          content.style.width = newHeight + "px";
        } else if (containerWidth >= 1024) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.46875; // 16:9 aspect ratio

          // Set the height of the content element
          content.style.width = newHeight + "px";
        } else if (containerWidth >= 640) {
          const newHeight = containerWidth * 0.68359375; // 16:9 aspect ratio
          // const newTitleSize = containerWidth * 0.0250783699;
          content.style.width = newHeight + "px";
          // title.style.fontSize = newTitleSize + "px";
        } else {
          // Calculate the new height based on a 16:9 aspect ratio

          const newHeight = containerWidth * 0.9375; // 16:9 aspect ratio
          // const newTitleSize = containerWidth * 0.0250783699;
          content.style.width = newHeight + "px";
          // title.style.fontSize = newTitleSize + "px";
        }
      });
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

export default useResizeLoginForm;
