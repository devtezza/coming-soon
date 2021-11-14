
const counterBtn = document.querySelector('.counter-btn');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal-btn');

const numberDays = document.querySelector('.number-days');
const numberHours = document.querySelector('.number-hours');
const numberMinutes = document.querySelector('.number-minutes');
const numberSeconds = document.querySelector('.number-seconds');

console.log( `counterBtn = ${counterBtn} - modal = ${modal} - modalBtn = ${modalBtn}`);

// Open and Close modal by clicking on counterBtn
counterBtn.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle('active');
    counterBtn.classList.toggle('active');
}



modalBtn.addEventListener('click', () => {
    timerID = setInterval(runCountdown, 1000);
});


function runCountdown() {
    if(timerID)
        getDateTime();
    else
        console.log('error');
        return;

}

function getDateTime() {    
    const dateOutput = document.querySelector('.thedate.flatpickr-input').value;
    const timeOutput = document.querySelector('.thetime.flatpickr-input').value;
    console.log(`Date = ${dateOutput} and Time = ${timeOutput}`);
    calcInterval(dateOutput, timeOutput);
}


function calcInterval(dateOutput, timeOutput) {
    const launchDate = new Date(`${dateOutput}, ${timeOutput}`).getTime();
    const now = new Date().getTime();

    if (launchDate <= now) {
        clearInterval(timerID);
        alert('Time has expired');
        return
    }    

    const difference = launchDate - now;
    console.log(`difference = ${difference}`);
    calcTime(difference);
}

function calcTime(difference) {
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    let timeDays = Math.floor(difference / days); 
    let timeHours = Math.floor((difference % days) / hours);
    let timeMinutes = Math.floor((difference % hours) / minutes);
    let timeSeconds = Math.floor((difference % minutes) / seconds);

    let displaytime = timeDays < 10 ? ` |0${timeDays} days ` : ` |${timeDays} days `;
    displaytime += timeHours < 10 ? ` |0${timeHours} hours ` : ` |${timeHours} hours`;
    displaytime += timeMinutes < 10 ? ` |0${timeMinutes} minutes ` : ` |${timeMinutes} minutes `;
    displaytime += timeSeconds < 10 ? ` |0${timeSeconds} seconds |` : ` |${timeSeconds} seconds |`;

    numberDays.innerHTML = timeDays;
    numberHours.innerHTML = timeHours;
    numberMinutes.innerHTML = timeMinutes;
    numberSeconds.innerHTML = timeSeconds;

    console.log(displaytime);
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


console.log(theDate.selectedDates);
console.log(theTime.selectedDates);

