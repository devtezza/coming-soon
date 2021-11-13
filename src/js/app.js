
const counterBtn = document.querySelector('.counter-btn');
const modal = document.querySelector('.modal');

console.log('hello');

// Open and Close modal by clicking on counterBtn
counterBtn.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle('active');
    counterBtn.classList.toggle('active');
}


const theDate = flatpickr(".thedate", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
});

const theTime = flatpickr(".thetime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    defaultHour:new Date().getHours(),
    defaultMinute:new Date().getMinutes()
});



