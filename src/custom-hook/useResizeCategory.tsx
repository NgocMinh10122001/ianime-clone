import { useEffect } from "react";

const useResizeCategory = () => {
  useEffect(() => {
    // Define a function to resize all elements with the ID "content"
    const resizeAllContentElements = () => {
      // Get all elements with the ID "content"
      const contentElements = document.querySelectorAll('[id^="category"]');
      const titleCate = document.querySelectorAll('[id^="titleCate"]');
      const desCate = document.querySelectorAll('[id^="desCate"]');

      // const title = document.getElementById("title");

      // Loop through each element and set the height
      titleCate.forEach((element) => {
        const contentContainer = document.getElementById("content__container");
        const title = element as HTMLElement;
        if (contentContainer) {
          // Get the current width of the contentContainer
          const containerWidth = contentContainer.clientWidth;
          if (containerWidth < 640) {
            // Calculate the new height based on a 16:9 aspect ratio
            const newTitle = containerWidth * 0.03125;
            // const newTitleSize = containerWidth * 0.0250783699;
            title.style.fontSize = newTitle + "px";

            // title.style.fontSize = newTitleSize + "px";
          } else {
            title.style.fontSize = "20px";
          }
        }
      });
      desCate.forEach((element) => {
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
            des.style.fontSize = "14px";
          }
        }
      });
      contentElements.forEach((element) => {
        // Cast the element to HTMLElement to access the style property
        const content = element as HTMLElement;

        // Get the current width of the contentContainer
        const containerWidth = window.innerWidth;
        if (containerWidth >= 1536) {
          const newHeight = containerWidth * 0.11979166666;
          content.style.height = newHeight + "px";
        } else if (containerWidth >= 1280) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.14453125; // 16:9 aspect ratio

          // Set the height of the content element
          content.style.height = newHeight + "px";
        } else if (containerWidth >= 1024) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.17996870109; // 16:9 aspect ratio

          // Set the height of the content element
          content.style.height = newHeight + "px";
        } else if (containerWidth >= 768) {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.240234375; // 16:9 aspect ratio

          // Set the height of the content element
          content.style.height = newHeight + "px";
        } else if (containerWidth >= 640) {
          // console.log(containerWidth);

          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.2421875; // 16:9 aspect ratio

          // console.log(newHeight);

          // Set the height of the content element
          content.style.height = newHeight + "px";
        } else {
          // Calculate the new height based on a 16:9 aspect ratio
          const newHeight = containerWidth * 0.359375;
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

export default useResizeCategory;
