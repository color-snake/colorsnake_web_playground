// Function to generate a random hex color
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to generate a random 5-color palette
function generateRandomPalette() {
    const palette = [];
    for (let i = 0; i < 5; i++) {
        palette.push(getRandomColor());
    }
    return palette;
}

// Function to create palette div
function createPaletteDiv(colors) {
    const paletteDiv = document.createElement('div');
    paletteDiv.classList.add('palette');

    for (let i = 0; i < 5; i++) {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color');
        colorDiv.style.backgroundColor = colors[i];
        paletteDiv.appendChild(colorDiv);
    }

    return paletteDiv;
}

// Function to load palettes
function loadPalettes(numPalettes) {
    const paletteBox = document.querySelector('.Palette_Box');
    paletteBox.innerHTML = ''; // Clear previous palettes

    for (let i = 0; i < numPalettes; i++) {
        const colors = generateRandomPalette();
        const paletteDiv = createPaletteDiv(colors);
        paletteBox.appendChild(paletteDiv);
    }
}

// Load initial palettes on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPalettes(12);
});

// Attach click event listener to "Load more" button
const loadMoreButton = document.querySelector('.more');
loadMoreButton.addEventListener('click', function() {
    loadPalettes(12);
});
