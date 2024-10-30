
    document.addEventListener("DOMContentLoaded", function() {
        const hSlider = document.getElementById("HSL_H");
        const sSlider = document.getElementById("HSL_S");
        const lSlider = document.getElementById("HSL_L");

        const hText = document.getElementById("HSL_H_Text");
        const sText = document.getElementById("HSL_S_Text");
        const lText = document.getElementById("HSL_L_Text");
        const hexText = document.getElementById("HSL_Hex_Text");

        const section = document.querySelector(".HSL-Slider-Box");

        function updateBackground() {
            const h = Math.round(parseInt(hSlider.value));
            const s = Math.round(parseInt(sSlider.value));
            const l = Math.round(parseInt(lSlider.value));
            const hex = hslToHex(h, s, l);
            section.style.backgroundColor = hex;
            hexText.value = hex;
        }

        function updateInputsFromSlider() {
            hText.value = hSlider.value;
            sText.value = sSlider.value;
            lText.value = lSlider.value;
            updateBackground();
        }

        function updateSlidersFromText() {
            hSlider.value = validateInput(hText.value, 360);
            sSlider.value = validateInput(sText.value, 100);
            lSlider.value = validateInput(lText.value, 100);
            updateBackground();
        }

        function updateHSLFromHex() {
            const hex = hexText.value;
            const { h, s, l } = hexToHSL(hex);
            hSlider.value = h;
            sSlider.value = s;
            lSlider.value = l;
            hText.value = h;
            sText.value = s;
            lText.value = l;
            updateBackground();
        }

        function validateInput(value, max) {
            let floatValue = parseFloat(value);
            if (isNaN(floatValue)) {
                return 0;
            }
            return Math.min(Math.max(floatValue, 0), max);
        }

        function hslToHex(h, s, l) {
            h /= 360;
            s /= 100;
            l /= 100;

            let r, g, b;
            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            const toHex = x => {
                const hex = Math.round(x * 255).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            };

            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }

        function hexToHSL(hex) {
            hex = hex.replace(/^#/, '');
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100)
            };
        }

        // Event listeners
        hSlider.addEventListener("input", updateInputsFromSlider);
        sSlider.addEventListener("input", updateInputsFromSlider);
        lSlider.addEventListener("input", updateInputsFromSlider);

        hText.addEventListener("input", updateSlidersFromText);
        sText.addEventListener("input", updateSlidersFromText);
        lText.addEventListener("input", updateSlidersFromText);

        hexText.addEventListener("focus", function() {
            // Allow editing hex value when the input is focused
            hexText.select();
        });

        hexText.addEventListener("change", updateHSLFromHex);

        updateBackground(); // Initial update
    });
