// URL of the CSV file
const csvUrl = 'https://gitlab.com/myobsidianvaults/color-snake/-/raw/main/Color%20Lists/Color_Pair.csv';

// Fetch the CSV file
fetch(csvUrl)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the CSV response as text
        return response.text();
    })
    .then(csvData => {
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
    })
    .catch(error => {
        console.error('There was a problem fetching the CSV file:', error);
    });
