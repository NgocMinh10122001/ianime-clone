import { useEffect } from "react";

const useResizeBranch = () => {
  useEffect(() => {
    // Define a function to resize all elements with the ID "content"
    const resizeAllContentElements = () => {
      // Get all elements with the ID "content"
      const contentElements = document.querySelectorAll('[id^="branch"]');
      const titleBranch = document.querySelectorAll('[id^="titleBranch"]');
      const desBranch = document.querySelectorAll('[id^="desBranch"]');

      // const title = document.getElementById("title");

      // Loop through each element and set the height
      contentElements.forEach((element) => {
        // Cast the element to HTMLElement to access the style property

        const content = element as HTMLElement;
        const containerWidth = window.innerWidth;

        if (containerWidth) {
          // Get the current width of the contentContainer

          if (containerWidth >= 1280) {
            // Calculate the new height based on a 16:9 aspect ratio
            const newHeight = containerWidth * 0.37109375; // 16:9 aspect ratio

            // Set the height of the content element
            content.style.height = newHeight + "px";
          } else if (containerWidth >= 1024) {
            // Calculate the new height based on a 16:9 aspect ratio
            const newHeight = containerWidth * 0.446875; // 16:9 aspect ratio

            // Set the height of the content element
            content.style.height = newHeight + "px";
          } else if (containerWidth >= 768) {
            // Calculate the new height based on a 16:9 aspect ratio
            const newHeight = containerWidth * 0.45596868884; // 16:9 aspect ratio

            // Set the height of the content element
            content.style.height = newHeight + "px";
          } else if (containerWidth >= 640) {
            // console.log(containerWidth);

            // Calculate the new height based on a 16:9 aspect ratio
            const newHeight = containerWidth * 0.78385416666; // 16:9 aspect ratio

            // console.log(newHeight);

            // Set the height of the content element
            content.style.height = newHeight + "px";
          } else {
            // Calculate the new height based on a 16:9 aspect ratio
            const newHeight = containerWidth * 0.78125;
            // const newTitleSize = containerWidth * 0.0250783699;
            content.style.height = newHeight + "px";

            // title.style.fontSize = newTitleSize + "px";
          }
        }
      });
      titleBranch.forEach((element) => {
        const title = element as HTMLElement;

        // Get the current width of the contentContainer
        const containerWidth = window.innerWidth;
        if (containerWidth <= 640) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newTitle = containerWidth * 0.03125;
          // const newTitleSize = containerWidth * 0.0250783699;
          title.style.fontSize = newTitle + "px";

          // title.style.fontSize = newTitleSize + "px";
        } else if (containerWidth <= 1024 && containerWidth > 768) {
          const newTitle = containerWidth * 0.0234375;
          title.style.fontSize = newTitle + "px";
        } else if (containerWidth <= 1280 && containerWidth > 1024) {
          const newTitle = containerWidth * 0.01875;
          title.style.fontSize = newTitle + "px";
        } else {
          title.style.fontSize = "24px";
        }
      });
      desBranch.forEach((element) => {
        const containerWidth = window.innerWidth;
        const des = element as HTMLElement;
        if (containerWidth) {
          // Get the current width of the contentContainer

          if (containerWidth < 640) {
            // Calculate the new height based on a 16:9 aspect ratio
            const newDes = containerWidth * 0.021875;
            // const newTitleSize = containerWidth * 0.0250783699;
            des.style.fontSize = newDes + "px";

            // title.style.fontSize = newTitleSize + "px";
          } else if (containerWidth < 1024 && containerWidth > 768) {
            const newTitle = containerWidth * 0.017578125;
            des.style.fontSize = newTitle + "px";
          } else {
            des.style.fontSize = "18px";
          }
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

export default useResizeBranch;
