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
    let resultCoffee
    let resultType 
    let resultQuantity
    let resultGrind 
    let resultFrequency 

    for (const option of coffee) {
       resultCoffee === 'capsule' ? disableGrind() : enableGrind();
        // option.checked ? resultCoffee = option.value : null;
        // resultCoffee = coffee?.find(option => option.checked)?.value ?? ''
        resultCoffee = Array.from(coffee)?.find(option => option.checked)?.value ?? '';
    }

    for (const option of type) {
        resultType = Array.from(type)?.find(option => option.checked)?.value ?? ''
    }
    for (const option of quantity) {
        resultQuantity = Array.from(quantity)?.find(option => option.checked)?.value ??''
    }
    for (const option of grindType) {
        resultGrind = Array.from(grindType)?.find(option => option.checked)?.value ?? ''
    }
    for (const option of frequency) {
        resultFrequency = Array.from(frequency)?.find(option => option.checked)?.value ?? ''
    }

    const summaryP = document.getElementById('test');
    const summaryModal = document.getElementById('summary-modal')

    updatePrice(resultQuantity, resultFrequency)

    const summaryTemplate = `
     “I drink coffee ${coffee[0].checked ? 'using' : 'as' } <span class="opt-tkn">${resultCoffee}</span>,
                with a <span class="opt-tkn" id="type">${resultType}</span> type of bean.
                <span class="opt-tkn" id="quantity">${resultQuantity}g</span> ${!coffee[0].checked ? 'ground ala' : ''}
                <span class="opt-tkn" id="grind">${resultGrind}</span>,
                sent to me <span class="opt-tkn" id="frequency">every ${resultFrequency}</span>.”
    
        `

    summaryP.innerHTML = summaryTemplate;
    summaryModal.innerHTML = summaryTemplate;
}

function updatePrice (quantitySelected, freq) {

    const prices = {
        250: { week: 7.20, biWeekly: 9.60, month: 12.90},
        500: { week: 13, biWeekly: 17.5, month: 22},
        1000: { week: 22, biWeekly: 32, month: 42}
    }
    const weekPrice = document.getElementById('week-price')
    const biWeeklyPrice = document.getElementById('2-weeks-price');
    const monthPrice = document.getElementById('month-price');
    const monthlyCostModal = document.getElementById('amt-total')

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const selectedPrice = prices[quantitySelected];
    weekPrice.innerText = dollars.format(selectedPrice.week)
    biWeeklyPrice.innerText = dollars.format(selectedPrice.biWeekly)
    monthPrice.innerText = dollars.format(selectedPrice.month)

    const monthlyPrices = {
        'week': selectedPrice * 4,
        '2 weeks': selectedPrice.biWeekly * 2,
        'month': selectedPrice.month
    }

    monthlyCostModal.innerText = dollars.format(monthlyPrices[freq])

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