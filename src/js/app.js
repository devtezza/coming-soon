
const counterBtn = document.querySelector('.counter-btn');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal-btn');

const numberDays = document.querySelector('.number-days');
const numberHours = document.querySelector('.number-hours');
const numberMinutes = document.querySelector('.number-minutes');
const numberSeconds = document.querySelector('.number-seconds');

const selectTheDate = document.querySelector('.thedate');
const selectTheTime = document.querySelector('.thetime');



let counterStatus = 0;

// console.log( `counterBtn = ${counterBtn} - modal = ${modal} - modalBtn = ${modalBtn}`);

// Open and Close modal by clicking on counterBtn
counterBtn.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle('active');
    counterBtn.classList.toggle('active');
}



modalBtn.addEventListener('click', verifyStatus);

function verifyStatus() {
    // Verifies if counter is running
    if(counterStatus === 2) {
        clearInterval(timerID);
        counterStatus = 0;
        console.log('Counter stopped');
        theDate._input.removeAttribute('disabled');
        theTime._input.removeAttribute('disabled');
        return;
    }

    if (counterStatus === 0) {
        // console.log(`Status = ${counterStatus}`);

        dateField = document.querySelector('.thedate.flatpickr-input');
        timeField = document.querySelector('.thetime.flatpickr-input');

        // dateOutput = dateField.value;
        // timeOutput = timeField.value;

    }    if( (dateField.value && timeField.value) != undefined && (dateField.value && timeField.value) != null && (dateField.value && timeField.value) !== '')  {

            counterStatus === 2 ? counterStatus = 2 : counterStatus = 1;

            dateOutput = dateField.value;
            timeOutput = timeField.value;

            // console.log(`Date = ${dateOutput} and Time = ${timeOutput} Status = ${counterStatus}`);

            timerID = setInterval(runCountdown, 1000);
        } 
}

function runCountdown() {
    if(timerID)
        calcInterval();
    else {
        console.log('error');
        return;
    }
}

function calcInterval() {
    const launchDate = new Date(`${dateOutput}, ${timeOutput}`).getTime();
    const now = new Date().getTime();

    // console.log(launchDate);

    if (launchDate < now || isNaN(launchDate) || launchDate === undefined || launchDate === null || launchDate === '') {

        switch (launchDate) {
            case isNaN:
                break;
        }
        console.log('You must select a future time');
        clearInterval(timerID);
        return;
       
        
        
    }  


        // if(counterStatus !== 0) {
        //     clearInterval(timerID);
        //     console.log('Time has expired');
        //     return;
        // }              
    
    const difference = launchDate - now;    
    calcTime(difference);

    // console.log (`launchdate = ${launchDate}`);
    // console.log(`difference = ${difference}`);
    

    
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

    timeDays = timeDays < 10? `0${timeDays}` : `${timeDays}`;
    timeHours = timeHours < 10 ? `0${timeHours}` : `${timeHours}`;
    timeMinutes = timeMinutes < 10 ? `0${timeMinutes}` : `${timeMinutes}`;
    timeSeconds = timeSeconds < 10 ? `0${timeSeconds}` : `${timeSeconds}`;

    counterStatus = 2;
    theDate._input.setAttribute('disabled', 'disabled');
    theTime._input.setAttribute('disabled', 'disabled');
    // selectTheDate.disabled = true;
    // selectTheTime.disabled = true;

    let displaytime = `| ${timeDays} days |${timeHours} hours |${timeMinutes} minutes ${timeSeconds} seconds |`; 
   

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
    minDate: new Date()
});

const theTime = flatpickr(".thetime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    // minTime: new Date(),
    // minTime: new Date().getHours(),
    minuteIncrement: 1,
    defaultHour: new Date().getHours(),
    defaultMinute: new Date().getMinutes()
});


// console.log(theDate.selectedDates);
// console.log(theTime.selectedDates);

