
const redSlider = document.getElementById("RGB_Red");
const greenSlider = document.getElementById("RGB_Green");
const blueSlider = document.getElementById("RGB_Blue");
const redText = document.getElementById("RGB_Red_Text");
const greenText = document.getElementById("RGB_Green_Text");
const blueText = document.getElementById("RGB_Blue_Text");
const hexText = document.getElementById("RGB_Hex_Text");
const rgbBox = document.querySelector(".RGB-Slider-Box");

function updateColor() {
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;

    redText.value = redValue;
    greenText.value = greenValue;
    blueText.value = blueValue;

    const hexColor = `#${(1 << 24 | redValue << 16 | greenValue << 8 | blueValue).toString(16).slice(1)}`;
    hexText.value = hexColor;

    rgbBox.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);

// Initialize color on page load
updateColor();
