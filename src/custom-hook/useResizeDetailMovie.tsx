import { useEffect } from "react";

const useResizeDetailMovie = () => {
  useEffect(() => {
    // Define a function to resize all elements with the ID "content"
    const resizeAllContentElements = () => {
      // Get all elements with the ID "content"
      const contentElements = document.querySelectorAll(
        '[id^="imageDetailMovie"]'
      );
      // const title = document.getElementById("title");

      // Loop through each element and set the height
      contentElements.forEach((element) => {
        // Cast the element to HTMLElement to access the style property
        const content = element as HTMLElement;

        const containerWidth = window.innerWidth;
        if (containerWidth >= 1024) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.21891191709; // 16:9 aspect ratio

          // Set the height of the content element
          content.style.height = newHeight + "px";
        } else if (containerWidth >= 768) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.326171875; // 16:9 aspect ratio

          // Set the height of the content element
          content.style.height = newHeight + "px";
        } else if (containerWidth >= 640) {
          // console.log(containerWidth);

          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.4296875; // 16:9 aspect ratio
          // console.log(newHeight);

          // Set the height of the content element
          content.style.height = newHeight + "px";
        } else {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.5390625; // 16:9 aspect ratio
          // const newTitleSize = containerWidth * 0.0250783699;
          content.style.height = newHeight + "px";
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

export default useResizeDetailMovie;
