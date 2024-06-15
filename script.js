// Variables and DOM references
var final_password_div = document.getElementById('final-pass');
var copy_btn = document.getElementById('copy-btn');
var popup = document.getElementById('popup');
var display_len_box = document.getElementById('len-box');
var slider = document.getElementById('slider');
var upper = document.getElementById('upper');
var lower = document.getElementById('lower');
var number = document.getElementById('number');
var symbol = document.getElementById('symbol');
var strength_clr = document.getElementById('str-clr');
var final_btn = document.getElementById('gen-btn');

final_btn.addEventListener('click',generate);
// Copy to clipboard functionality
copy_btn.addEventListener('click', copy_to_clipboard);

function copy_to_clipboard(ev) {
    let password = final_password_div.textContent;
    navigator.clipboard.writeText(password)
        .then(() => {
            // Display popup
            showPopup();
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
}

// Copy popup display
function showPopup() {
    popup.classList.remove("hidden");
    setTimeout(function () {
        popup.classList.add("hidden");
    }, 3000);
}

// Length slider and display
var password_length = 10; // Initial password length
slider.addEventListener('input', function () {
    password_length = slider.value;
    display_len_box.textContent = password_length;
    var color_percentage = (password_length / 20) * 100;
    slider.style.backgroundImage = `linear-gradient(to right,#BB16F4 0%,#BB16F4 ${color_percentage}%, transparent ${color_percentage}%,transparent 100%)`;
});

// Generate password function
function generate() {
    var includeUpper = upper.checked;
    var includeLower = lower.checked;
    var includeNumbers = number.checked;
    var includeSymbol = symbol.checked;

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '01234567890123456789';
    const symbolChars = '!@#$%^&*()-_+=[]{}|;:,.<>?';

    let characters = '';
    let password = '';

    if (includeLower) characters += lowercaseChars;
    if (includeUpper) characters += uppercaseChars;
    if (includeNumbers) characters += numberChars;
    if (includeSymbol) characters += symbolChars;

    if (characters === '') {
        window.alert('No character types selected!');
        return;
    }

    final_password_div.classList.remove("opacity-50");
    copy_btn.disabled = false;

    for (let i = 0; i < password_length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    final_password_div.textContent = password;

    strength_clr.className = strength(includeLower, includeUpper, includeNumbers, includeSymbol);
}

// Function to determine password strength
function strength(includeLower, includeUpper, includeNumbers, includeSymbol) {
    let categories = 0;

    if (includeLower) categories++;
    if (includeUpper) categories++;
    if (includeNumbers) categories++;
    if (includeSymbol) categories++;

    let weak = `rounded-[50%] bg-red-500 shadow-[0_0_12px_3px_#EF4444] h-6 w-6`;
    let medium = `rounded-[50%] bg-yellow-400 shadow-[0_0_12px_3px_#FACC14] h-6 w-6`;
    let strong = `rounded-[50%] bg-green-400 shadow-[0_0_12px_3px_#21C55D] h-6 w-6`;

    if (categories <= 2) {
        return weak;
    } else if (categories == 3) {
        if (password_length <= 4) return weak;
        else return medium;
    } else {
        if (password_length <= 4) return weak;
        else if (password_length <= 8) return medium;
        else return strong;
    }
}
