// Function to generate a random hex color
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to generate random color pairs
function generateRandomColorPairs(numPairs) {
    const colorPairs = [];
    for (let i = 0; i < numPairs; i++) {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        colorPairs.push([color1, color2]);
    }
    return colorPairs;
}

// Function to create pair div
function createPairDiv(color1, color2) {
    const pairDiv = document.createElement('div');
    pairDiv.classList.add('pair');

    const oneDiv = document.createElement('div');
    oneDiv.classList.add('one');
    oneDiv.style.backgroundColor = color1;

    const twoDiv = document.createElement('div');
    twoDiv.classList.add('two');
    twoDiv.style.backgroundColor = color2;

    pairDiv.appendChild(oneDiv);
    pairDiv.appendChild(twoDiv);

    return pairDiv;
}

// Function to load color pairs
function loadPairs(numPairs) {
    const pairBox = document.querySelector('.Pair_Box');
    pairBox.innerHTML = ''; // Clear previous pairs

    const colorPairs = generateRandomColorPairs(numPairs);
    colorPairs.forEach(pair => {
        const color1 = pair[0];
        const color2 = pair[1];
        const pairDiv = createPairDiv(color1, color2);
        pairBox.appendChild(pairDiv);
    });
}

// Load initial color pairs on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPairs(12);
});

// Attach click event listener to "Load more" button
const loadMoreButton = document.querySelector('.more');
loadMoreButton.addEventListener('click', function() {
    loadPairs(12);
});
