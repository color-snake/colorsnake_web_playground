
    document.addEventListener("DOMContentLoaded", function() {
        const cSlider = document.getElementById("CMYK_C");
        const mSlider = document.getElementById("CMYK_M");
        const ySlider = document.getElementById("CMYK_Y");
        const kSlider = document.getElementById("CMYK_K");

        const cText = document.getElementById("CMYK_C_Text");
        const mText = document.getElementById("CMYK_M_Text");
        const yText = document.getElementById("CMYK_Y_Text");
        const kText = document.getElementById("CMYK_K_Text");
        const hexText = document.getElementById("CMYK_Hex_Text");

        const section = document.querySelector(".CMYK-Slider-Box");

        function updateBackground() {
            const c = parseInt(cSlider.value);
            const m = parseInt(mSlider.value);
            const y = parseInt(ySlider.value);
            const k = parseInt(kSlider.value);
            const hex = cmykToHex(c, m, y, k);
            section.style.backgroundColor = hex;
            hexText.value = hex;
        }

        function updateInputsFromSlider() {
            cText.value = cSlider.value;
            mText.value = mSlider.value;
            yText.value = ySlider.value;
            kText.value = kSlider.value;
            updateBackground();
        }

        function updateSlidersFromText() {
            cSlider.value = validateInput(cText.value);
            mSlider.value = validateInput(mText.value);
            ySlider.value = validateInput(yText.value);
            kSlider.value = validateInput(kText.value);
            updateBackground();
        }

        function updateCMYKFromHex() {
            const hex = hexText.value;
            const { c, m, y, k } = hexToCMYK(hex);
            cSlider.value = c;
            mSlider.value = m;
            ySlider.value = y;
            kSlider.value = k;
            cText.value = c;
            mText.value = m;
            yText.value = y;
            kText.value = k;
            updateBackground();
        }

        function validateInput(value) {
            let intValue = parseInt(value);
            if (isNaN(intValue)) {
                return 0;
            }
            return Math.min(Math.max(intValue, 0), 100);
        }

        function cmykToHex(c, m, y, k) {
            const r = Math.round(255 * (1 - (c / 100)) * (1 - (k / 100)));
            const g = Math.round(255 * (1 - (m / 100)) * (1 - (k / 100)));
            const b = Math.round(255 * (1 - (y / 100)) * (1 - (k / 100)));
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        function componentToHex(c) {
            const hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }

        function hexToCMYK(hex) {
            hex = hex.replace(/^#/, '');
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            const c = 1 - (r / 255);
            const m = 1 - (g / 255);
            const y = 1 - (b / 255);
            const k = Math.min(c, m, y);
            return {
                c: Math.round(c * 100),
                m: Math.round(m * 100),
                y: Math.round(y * 100),
                k: Math.round(k * 100)
            };
        }

        // Event listeners
        cSlider.addEventListener("input", updateInputsFromSlider);
        mSlider.addEventListener("input", updateInputsFromSlider);
        ySlider.addEventListener("input", updateInputsFromSlider);
        kSlider.addEventListener("input", updateInputsFromSlider);

        cText.addEventListener("input", updateSlidersFromText);
        mText.addEventListener("input", updateSlidersFromText);
        yText.addEventListener("input", updateSlidersFromText);
        kText.addEventListener("input", updateSlidersFromText);

        hexText.addEventListener("input", updateCMYKFromHex);

        updateBackground(); // Initial update
    });

