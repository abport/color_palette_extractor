const imageInput = document.querySelector("#image-input");
const colorPalette = document.querySelector("#color-palette");
imageInput.addEventListener("change", function () {
  const image = new Image();
  image.src = URL.createObjectURL(this.files[0]);
  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const colorMap = {};
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const rgb = `rgb(${r}, ${g}, ${b})`;
      const hex =
        "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      if (!colorMap[rgb]) {
        colorMap[rgb] = {
          rgb,
          hex,
          count: 1,
        };
      } else {
        colorMap[rgb].count += 1;
      }
    }
    const sortedColors = Object.values(colorMap).sort(
      (a, b) => b.count - a.count
    );
    colorPalette.innerHTML = "";
    for (const color of sortedColors) {
      const colorSwatch = document.createElement("div");
      colorSwatch.style.backgroundColor = color.rgb;
      colorSwatch.classList.add("color-swatch");
      colorSwatch.innerHTML = `
              <div>${color.rgb}</div>
              <div>${color.hex}</div>
            `;
      colorPalette.appendChild(colorSwatch);
    }
  };
});
