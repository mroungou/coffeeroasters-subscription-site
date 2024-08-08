const closeBtn = document.getElementById('close-btn');
const openMenuBtn = document.getElementById('menu');
const mobileNav = document.getElementById('overlay');
const summaryOrder = document.getElementById('order-summary');

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
        if (option.id === 'capsule' && option.checked) {
            disableGrind();
        }else if (option.checked) {
            enabled()
        }
        option.checked ? resultCoffee = option.value : null;
    }

    for (const option of type) {
        option.checked ? resultType = option.value : null;
    }
    for (const option of quantity) {
        option.checked ? resultQuantity = option.value : null;

    }
    for (const option of grindType) {
        option.checked ? resultGrind = option.value : null;
    }
    for (const option of frequency) {
        option.checked ?  resultFrequency = option.value : null;
    }

    const summaryP = document.getElementById('test');
    const summaryModal = document.getElementById('summary-modal')

    updatePrice(resultQuantity, resultFrequency)

    summaryP.innerHTML = `
     “I drink coffee ${coffee[0].checked ? 'using' : 'as' } <span class="opt-tkn">${resultCoffee}</span>,
                with a <span class="opt-tkn" id="type">${resultType}</span> type of bean.
                <span class="opt-tkn" id="quantity">${resultQuantity}g</span> ${!coffee[0].checked ? 'ground ala' : ''}
                <span class="opt-tkn" id="grind">${resultGrind}</span>,
                sent to me <span class="opt-tkn" id="frequency">every ${resultFrequency}</span>.”
    
        `

    summaryModal.innerHTML = `
     “I drink coffee ${coffee[0].checked ? 'using' : 'as' } <span class="opt-tkn">${resultCoffee}</span>,
                with a <span class="opt-tkn" id="type">${resultType}</span> type of bean.
                <span class="opt-tkn" id="quantity">${resultQuantity}g</span> ${!coffee[0].checked ? 'ground ala' : ''}
                <span class="opt-tkn" id="grind">${resultGrind}</span>,
                sent to me <span class="opt-tkn" id="frequency">every ${resultFrequency}</span>.”
    
        `
}

function updatePrice (quantitySelected, freq) {
    const weekPrice = document.getElementById('week-price')
    const biWeeklyPrice = document.getElementById('2-weeks-price');
    const monthPrice = document.getElementById('month-price');
    const monthlyCostModal = document.getElementById('amt-total')
    

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    if (quantitySelected == 250) {
        weekPrice.innerText = `${dollars.format(7.20)}`
        biWeeklyPrice.innerText = `${dollars.format(9.60)}`
        monthPrice.innerText = `${dollars.format(12.90)}`
        if (freq == 'week') {
            monthlyCostModal.innerHTML = `${dollars.format(7.20 * 4)}`
        } else if (freq == '2 weeks') {
            monthlyCostModal.innerHTML = `${dollars.format(9.60 * 2)}`
        } else if (freq == 'month') {
            monthlyCostModal.innerHTML = `${dollars.format(12)}`
        }
    } else if (quantitySelected == 500) {
        weekPrice.innerText = `${dollars.format(13.0)}`
        biWeeklyPrice.innerText = `${dollars.format(17.5)}`
        monthPrice.innerText = `${dollars.format(22.0)}`
        if (freq == 'week') {
            monthlyCostModal.innerHTML = `${dollars.format(13 * 4)}`
        } else if (freq == '2 weeks') {
            monthlyCostModal.innerHTML = `${dollars.format(17.5 * 2)}`
        } else if (freq == 'month') {
            monthlyCostModal.innerHTML = `${dollars.format(22)}`
        }
    } else if (quantitySelected == 1000){ 
        weekPrice.innerText = `${dollars.format(22.0)}`
        biWeeklyPrice.innerText = `${dollars.format(32)}`
        monthPrice.innerText = `${dollars.format(42)}`
        if (freq == 'week') {
            monthlyCostModal.innerHTML = `${dollars.format(22 * 4)}`
        } else if (freq == '2 weeks') {
            monthlyCostModal.innerHTML = `${dollars.format(32 * 2)}`
        } else if (freq == 'month') {
            monthlyCostModal.innerHTML = `${dollars.format(42)}`
        }
    }

}

const disableGrind = () => {
    const grindDiv = document.getElementById('grind');
    
    grindDiv.classList.add('disabled');

    grindType.forEach((option) => {
        option.disabled = true;
    })
}

const enabled = () => {
    const grindDiv = document.getElementById('grind');
    
    grindDiv.classList.remove('disabled');

    grindType.forEach((option) => {
        option.disabled = false;
    })
}

options.forEach((option) => {
  option.addEventListener('change', updateOption)
})

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