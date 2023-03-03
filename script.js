// This line finds the HTML element with the ID "image-input" and saves it in a variable called imageInput.
const imageInput = document.querySelector("#image-input");

// This line finds the HTML element with the ID "color-palette" and saves it in a variable called colorPalette.
const colorPalette = document.querySelector("#color-palette");

// This line creates a new ColorThief object, which is a library that helps extract colors from images.
const colorThief = new ColorThief();

// This line sets up an event listener on the imageInput element, which listens for a "change" event, like when someone selects a file to upload.
imageInput.addEventListener("change", function () {
  // This line creates a new Image object, which is a JavaScript object that represents an image.
  const image = new Image();
  // This line sets the src attribute of the image object to be the URL of the file that was just selected in the imageInput element.
  image.src = URL.createObjectURL(this.files[0]);

  // This line sets up an event listener on the image object, which listens for the image to finish loading.
  image.onload = function () {
    // This line uses the ColorThief library to extract a palette of colors from the image, containing the 20 most prominent colors.
    const palette = colorThief.getPalette(image, 20);
    // This line clears the HTML content of the colorPalette element, so that we can replace it with the new color swatches.
    colorPalette.innerHTML = "";
    // This line loops through each color in the palette, and runs some code for each color.
    palette.forEach(function (color) {
      // This line converts the RGB values of the color to a hexadecimal value, which is a way of representing colors in web design.
      const hex = rgbToHex(color[0], color[1], color[2]);
      // These lines create a new HTML element (div) to represent a color swatch, and sets its background color to the RGB value of the color.
      // It also adds a class name to the element and sets its inner HTML to show the RGB and hexadecimal values of the color.
      const colorSwatch = document.createElement("div");
      colorSwatch.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      colorSwatch.classList.add("color-swatch");
      colorSwatch.innerHTML = `
              <div>rgb(${color[0]}, ${color[1]}, ${color[2]})</div>
              <div>${hex}</div>
            `;
      // This line adds the new color swatch element to the colorPalette element, so that it appears on the page.
      colorPalette.appendChild(colorSwatch);
    });
  };
});

// This is a separate function that takes the RGB values of a color and returns its hexadecimal value.
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(function (x) {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
