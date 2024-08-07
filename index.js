const closeBtn = document.getElementById('close-btn');
const openMenuBtn = document.getElementById('menu');
const mobileNav = document.getElementById('overlay');
const coffeeOptSM = document.getElementById('coffee');
const typeOptSM = document.getElementById('type');
const quantityOptSM = document.getElementById('quantity');
const grindOptSM = document.getElementById('grind');
const freqOptSM = document.getElementById('frequency');
const coffeeOpt = document.getElementById('coffee-conf');
const typeOpt = document.getElementById('type-conf');
const quantityOpt = document.getElementById('quantity-conf');
const grindOpt = document.getElementById('grind-conf');
const freqOpt = document.getElementById('frequency-conf');

const options = document.querySelectorAll('input[type="radio"]');
const expandBtn = document.getElementsByClassName('expand');

const coffee = document.getElementsByName('how');
const type = document.getElementsByName('type');
const quantity = document.getElementsByName('quantity');
const grindType = document.getElementsByName('grind');
const frequency = document.getElementsByName('frequency');

function updateOption() {
    for (const option of options) {
        if (option.checked) {
            option.parentElement.classList.add('checked');
        } else {
            option.parentElement.classList.remove('checked');
        }
    }

    updateSummary()
}

function updateSummary () {
    for (const option of coffee) {
        if (option.checked) {
            if (option.id === 'capsule') {
                coffeeOptSM.innerText = `using ${option.value}`;
            } else {
                coffeeOptSM.innerText = `as ${option.value}`;
            }
        }
    }

    for (const option of type) {
        if (option.checked) {
            typeOptSM.innerText = option.value;
        }
    }
    for (const option of quantity) {
        if (option.checked) {
            quantityOptSM.innerText = option.value;
        }
    }
    for (const option of grindType) {
        if (option.checked) {
            grindOptSM.innerText = option.value;
        }
    }
    for (const option of frequency) {
        if (option.checked) {
            freqOptSM.innerText = option.value;
        }
    }
}

options.forEach((option) => {
  option.addEventListener('change', updateOption)
})

for (const btn of expandBtn) {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.classList.toggle('hiddenToggle');
    })
}


const openNav = () => {
    mobileNav.style.width = '100%';
    openMenuBtn.style.display = 'none';
    closeBtn.style.display = 'block';
}

const closeNav = () => {
    mobileNav.style.width = '0%';
    openMenuBtn.style.display = 'block';
    closeBtn.style.display = 'none';
}