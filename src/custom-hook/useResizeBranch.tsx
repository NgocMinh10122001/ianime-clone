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
      titleBranch.forEach((element) => {
        const title = element as HTMLElement;

        // Get the current width of the contentContainer
        const containerWidth = window.innerWidth;
        if (containerWidth < 640) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newTitle = containerWidth * 0.03125;
          // const newTitleSize = containerWidth * 0.0250783699;
          title.style.fontSize = newTitle + "px";

          // title.style.fontSize = newTitleSize + "px";
        } else {
          title.style.fontSize = "30px";
        }
      });
      desBranch.forEach((element) => {
        const contentContainer = document.getElementById("content__container");
        const des = element as HTMLElement;
        if (contentContainer) {
          // Get the current width of the contentContainer
          const containerWidth = contentContainer.clientWidth;
          if (containerWidth < 640) {
            // Calculate the new height based on a 16:9 aspect ratio
            const newDes = containerWidth * 0.021875;
            // const newTitleSize = containerWidth * 0.0250783699;
            des.style.fontSize = newDes + "px";

            // title.style.fontSize = newTitleSize + "px";
          } else {
            des.style.fontSize = "18px";
          }
        }
      });
      contentElements.forEach((element) => {
        // Cast the element to HTMLElement to access the style property
        const content = element as HTMLElement;

        const contentContainer = document.getElementById("content__container");

        if (contentContainer) {
          // Get the current width of the contentContainer
          const containerWidth = contentContainer.clientWidth;
          if (containerWidth >= 1024) {
            // Calculate the new height based on a 16:9 aspect ratio
            const newHeight = containerWidth * 0.40312093628; // 16:9 aspect ratio

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
            const newHeight = containerWidth * 0.8934169279;
            // const newTitleSize = containerWidth * 0.0250783699;
            content.style.height = newHeight + "px";

            // title.style.fontSize = newTitleSize + "px";
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
