// CSV data
const csvData = `one,two
#FFFFFF,#000000
#E3BD3D,#543927
#FF3746,#FF579C
#B2F7AC,#AEF6E5
#4A6652,#87A74D
#A27A73,#EFE6DF
#DBAFA0,#397E83
#E37465,#E1C5AE
#87CEFA,#FE6F5E`;

// Split CSV data into rows
const rows = csvData.split('\n');

// Select Pair_Box section
const pairBox = document.querySelector('.Pair_Box');

// Iterate over each row and create pair divs
rows.forEach((row, index) => {
    if (index === 0) return; // Skip header row

    const colors = row.split(',');
    const color1 = colors[0];
    const color2 = colors[1];

    // Create pair div
    const pairDiv = document.createElement('div');
    pairDiv.classList.add('pair');

    // Create div for color 1
    const oneDiv = document.createElement('div');
    oneDiv.classList.add('one');
    oneDiv.style.backgroundColor = color1;

    // Create div for color 2
    const twoDiv = document.createElement('div');
    twoDiv.classList.add('two');
    twoDiv.style.backgroundColor = color2;

    // Append color divs to pair div
    pairDiv.appendChild(oneDiv);
    pairDiv.appendChild(twoDiv);

    // Append pair div to Pair_Box section
    pairBox.appendChild(pairDiv);
});
