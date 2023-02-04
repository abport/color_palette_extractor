// Select the input element with id "image-input" and store it in the variable "imageInput"
const imageInput = document.querySelector("#image-input");

// Select the element with id "color-palette" and store it in the variable "colorPalette"
const colorPalette = document.querySelector("#color-palette");

// Add an event listener to the imageInput that listens for a "change" event
imageInput.addEventListener("change", function () {
  // Create a new Image object and store it in the variable "image"
  const image = new Image();

  // Set the source of the image to the file selected in the input
  image.src = URL.createObjectURL(this.files[0]);

  // Add an event listener to the image that listens for it to be loaded
  image.onload = function () {
    // Create a new canvas element and store it in the variable "canvas"
    const canvas = document.createElement("canvas");

    // Set the width of the canvas to the width of the image
    canvas.width = image.width;

    // Set the height of the canvas to the height of the image
    canvas.height = image.height;

    // Get the 2D drawing context of the canvas and store it in the variable "context"
    const context = canvas.getContext("2d");

    // Draw the image on the canvas
    context.drawImage(image, 0, 0);

    // Get the image data from the canvas and store it in the variable "imageData"
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Get the array of pixel data from the imageData and store it in the variable "data"
    const data = imageData.data;

    // Create an object to store the color information and store it in the variable "colorMap"
    const colorMap = {};

    // Loop through each pixel in the "data" array
    for (let i = 0; i < data.length; i += 4) {
      // Get the red, green, blue, and alpha values for the current pixel
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Create a string with the RGB values of the current pixel
      const rgb = `rgb(${r}, ${g}, ${b})`;

      // Create a string with the HEX values of the current pixel
      const hex =
        "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

      // Check if the RGB value is already in the "colorMap" object
      if (!colorMap[rgb]) {
        // If not, add the RGB value as a key in the "colorMap" object with its information
        colorMap[rgb] = {
          rgb,
          hex,
          count: 1,
        };
      } else {
        colorMap[rgb].count += 1; // If the RGB value is already in the "colorMap" object, increment its count by 1
      }
    }
    const sortedColors = Object.values(colorMap).sort(
      (a, b) => b.count - a.count
    );
    // Sort the colorMap object based on the count property in descending order
    colorPalette.innerHTML = "";
    // Empty the colorPalette element to prepare it for the sorted colors
    for (const color of sortedColors) {
      const colorSwatch = document.createElement("div");
      colorSwatch.style.backgroundColor = color.rgb;
      // Set the background color of the colorSwatch element to the RGB value
      colorSwatch.classList.add("color-swatch");
      colorSwatch.innerHTML = `
              <div>${color.rgb}</div>
              <div>${color.hex}</div>
            `;
      // Create two child elements for the colorSwatch to display the RGB and HEX values of the color
      colorPalette.appendChild(colorSwatch);
      // Add the colorSwatch element to the colorPalette
    }
  };
});
