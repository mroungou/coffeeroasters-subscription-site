const closeBtn = document.getElementById('close-btn');
const openMenuBtn = document.getElementById('menu');
const mobileNav = document.getElementById('overlay');
const summaryOrder = document.getElementById('order-summary');
const grindDiv = document.getElementById('grind');

const options = document.querySelectorAll('input[type="radio"]');
const expandBtn = document.getElementsByClassName('expand');

const coffee = document.getElementsByName('how');
const type = document.getElementsByName('type');
const quantity = document.getElementsByName('quantity');
const grindType = document.getElementsByName('grind');
const frequency = document.getElementsByName('frequency');



function updateSummary () {
   
    const resultCoffee = Array.from(coffee).find(option => option.checked)?.value ?? '';
    const resultType = Array.from(type).find(option => option.checked)?.value ?? '';
    const resultQuantity = Array.from(quantity).find(option => option.checked)?.value ?? '';
    const resultGrind = Array.from(grindType).find(option => option.checked)?.value ?? '';
    const resultFrequency = Array.from(frequency).find(option => option.checked)?.value ?? '';
    resultCoffee === 'capsule' ? disableGrind() : enableGrind();

   
    updatePrice(resultQuantity, resultFrequency)

    const summaryTemplate = `
     “I drink coffee ${coffee[0].checked ? 'using' : 'as' } <span class="opt-tkn">${resultCoffee}</span>,
                with a <span class="opt-tkn" id="type">${resultType}</span> type of bean.
                <span class="opt-tkn" id="quantity">${resultQuantity}g</span> ${!coffee[0].checked ? 'ground ala' : ''}
                <span class="opt-tkn" id="grind">${resultGrind}</span>,
                sent to me <span class="opt-tkn" id="frequency">every ${resultFrequency}</span>.”
    
        `


    document.getElementById('test').innerHTML = summaryTemplate;
    document.getElementById('summary-modal').innerHTML = summaryTemplate;
}

function updatePrice(quantitySelected, freq) {
    const prices = {
        250: { week: 7.20, biWeekly: 9.60, month: 12.90 },
        500: { week: 13.0, biWeekly: 17.5, month: 22 },
        1000: { week: 22.0, biWeekly: 32.0, month: 42.0 }
    };

    const selectedPrice = prices[quantitySelected];
    if (!selectedPrice) {
        console.error(`No price found for quantity: ${quantitySelected}`);
        return;
    }

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    document.getElementById('week-price').innerText = dollars.format(selectedPrice.week);
    document.getElementById('2-weeks-price').innerText = dollars.format(selectedPrice.biWeekly);
    document.getElementById('month-price').innerText = dollars.format(selectedPrice.month);

    const monthlyPrices = {
        'week': selectedPrice.week * 4,
        '2 weeks': selectedPrice.biWeekly * 2,
        'month': selectedPrice.month
    };

    document.getElementById('amt-total').innerText = dollars.format(monthlyPrices[freq]);
}

const disableGrind = () => {
    grindDiv.classList.add('disabled');

    grindType.forEach((option) => {
        option.disabled = true;
    })
}

const enableGrind = () => {   
    grindDiv.classList.remove('disabled');

    grindType.forEach((option) => {
        option.disabled = false;
    })
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const debouncedUpdateOption = debounce(updateOption, 150);
options.forEach((option) => {
    option.addEventListener('change', debouncedUpdateOption);
});



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

for (const btn of expandBtn) {
    btn.addEventListener('click', () => {
        if (!btn.parentElement.parentElement.classList.contains('disabled')) {
            btn.parentElement.parentElement.classList.toggle('hiddenToggle');
        } 
    })
}

function closeDialog(event) {
    // If the target dialog is
    if (!event.target.contains(summaryOrder)) return;
    summaryOrder.close();
  }

document.addEventListener('click', closeDialog)


const openModal = () => {
    summaryOrder.showModal()
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