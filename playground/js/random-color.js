
        const colorDisplay = document.getElementById('color_display');
        const hexHere = document.querySelector('.hex_here');

        // Function to generate a random hex color
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Update background color on page load
        document.body.style.backgroundColor = hexHere.textContent;
        colorDisplay.style.backgroundColor = hexHere.textContent;

        // Update hex value on click
        colorDisplay.addEventListener('click', () => {
            const randomColor = getRandomColor();
            document.body.style.backgroundColor = randomColor;
            colorDisplay.style.backgroundColor = randomColor;
            hexHere.textContent = randomColor;
        });

