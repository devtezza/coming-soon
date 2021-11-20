
const innerToggler = document.querySelector('#inner-toggler');
const outerToggler = document.querySelector('#outer-toggler');

console.log(innerToggler);
console.log(outerToggler);

// const outterToggler = document.querySelector('#outter-toggler');
// console.log(`outter = ${outterToggler}`);


const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal-btn');
const overlay = document.querySelector('.overlay');

const numberDays = document.querySelector('.number-days');
const numberHours = document.querySelector('.number-hours');
const numberMinutes = document.querySelector('.number-minutes');
const numberSeconds = document.querySelector('.number-seconds');

const selectTheDate = document.querySelector('.thedate');
const selectTheTime = document.querySelector('.thetime');

const modalTitle = document.querySelector('.modal-title');
const modalMessage = document.querySelector('.modal-message');

// set status to initial (status = 0) and update button status
let counterStatus = 0;

// document.addEventListener('DOMContentLoaded', () => {
//     if(modal.classList.contains('modal-opened')) {
//         modal.classList.remove('modal-opened');
//     }
//     console.log('here');
//     modal.classList.add('modal-closed');
// });

//Open and Close modal by clicking on modalToggler - outer and inner
outerToggler.addEventListener('click', toggleModal);
innerToggler.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);

btnStatus();

const theDate = flatpickr(".thedate", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    minDate: new Date(),
    disableMobile: "true",

    onValueUpdate: () => {
        verifyFields();        
    },
});


const theTime = flatpickr(".thetime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    disableMobile: "true",

    onValueUpdate: () => {
        verifyFields();        
    },
   
    minuteIncrement: 1,
    defaultHour: new Date().getHours(),
    defaultMinute: new Date().getMinutes()
});

dateField = document.querySelector('.thedate.flatpickr-input');
timeField = document.querySelector('.thetime.flatpickr-input');



function btnStatus() {
    // console.log(`modalBtn = ${modalBtn.classList}`);

    console.log(`counterStatus = ${counterStatus}`);
    if (counterStatus === 0) {
        if(modalBtn.classList.contains('modal-btn-danger')) {
            modalBtn.classList.remove('modal-btn-danger');
        }
        if(modalBtn.classList.contains('modal-btn-success')) {
            modalBtn.classList.remove('modal-btn-success');
        }            
        modalBtn.classList.add('modal-btn-disabled');
        modalBtn.innerHTML = 'Start';
        updateMessage();
    }   else if (counterStatus === 1) {
                    if(modalBtn.classList.contains('modal-btn-disabled')) {
                modalBtn.classList.remove('modal-btn-disabled')
            }
            if(modalBtn.classList.contains('modal-btn-danger')) {
                modalBtn.classList.remove('modal-btn-danger')
            }            
            modalBtn.classList.add('modal-btn-success');
            modalBtn.innerHTML = 'Start';
        } else if (counterStatus === 2) {
            modalBtn.classList.remove('modal-btn-success');
            modalBtn.classList.add('modal-btn-danger');
            modalBtn.innerHTML = 'Stop';
            updateMessage();
        }
}

// const tlToggle = new TimelineMax({paused: true, reversed: true});

    const tlOpen = new TimelineMax({});
    const tlClose = new TimelineMax({});

function toggleModal() { 
    if(modal.classList.contains('active')) {
        
        modal.classList.remove('active');

        // unlock scroll when modal is closed
        document.body.classList.remove('lock-scroll');
        

        tlClose
        .fromTo(overlay, {autoAlpha: 1}, {autoAlpha: 0, duration: .5, ease: "power2.in"})
        .fromTo(modal, {zIndex: 5}, {zIndex: 0, duration: .1, ease: "power2.in"})
        .fromTo(modal, {y: -600}, {y: 0, duration: .3, delay: 0.3, ease: "power2.in"})
        .fromTo(modal, {autoAlpha: 1}, {autoAlpha: 0, duration: .3})
        // .fromTo(outerToggler, {autoAlpha: 0,}, {autoAlpha: 1, duration: .1, ease: "power2.in"});
        
    } else {
        
        modal.classList.add('active');
        // lock scroll when modal is open      
        document.body.classList.add('lock-scroll');

        tlOpen
        // .fromTo(outerToggler, {autoAlpha: 1}, {autoAlpha: 0, duration: .1})
        .fromTo(overlay, {autoAlpha: 0}, {autoAlpha: 1, duration: .2})
        .fromTo(modal, {autoAlpha: 0}, {autoAlpha: 1, duration: .1})
        .fromTo(modal, {y: 0}, {y: -600, duration: .5, ease: "power2.in"})
        .fromTo(modal, {zIndex: 0}, {zIndex: 5, duration: .1, ease: "power3.in"});       
    } 
}

modalBtn.addEventListener('click', verifyStatus);

function verifyStatus() {
    // Verifies if counter is running
    if(counterStatus === 2) {
        clearInterval(timerID);

        numberDays.innerHTML = '00';
        numberHours.innerHTML = '00';
        numberMinutes.innerHTML = '00';
        numberSeconds.innerHTML = '00';

        counterStatus = 0;
        console.log('Counter Stopped');

        theDate._input.removeAttribute('disabled');
        theTime._input.removeAttribute('disabled');

        verifyFields();

        return;
    }

    if (counterStatus === 0) {
       console.log(`Status = ${counterStatus}`);

    }  
    
    if ( (dateField.value && timeField.value) != undefined && (dateField.value && timeField.value) != null && (dateField.value && timeField.value) !== '')  {

            // Verifies is counter is running (status = 2) to prevent to overwrite status. If not running, set status to 1 and update button status
            if(! counterStatus === 2) {
                counterStatus = 1;
                console.log(`counterStatus has been set to 1: ${counterStatus}`);
                btnStatus();
            }             

            dateOutput = dateField.value;
            timeOutput = timeField.value;            

            timerID = setInterval(runCountdown, 1000);
        } 
}

function runCountdown() {
    if(timerID) {

        calcInterval();
    }
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
    
    const difference = launchDate - now;    
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

    timeDays = timeDays < 10? `0${timeDays}` : `${timeDays}`;
    timeHours = timeHours < 10 ? `0${timeHours}` : `${timeHours}`;
    timeMinutes = timeMinutes < 10 ? `0${timeMinutes}` : `${timeMinutes}`;
    timeSeconds = timeSeconds < 10 ? `0${timeSeconds}` : `${timeSeconds}`;

    // after counter is running and its content has been applied, set status to 2 and update button status 
    counterStatus = 2;
    btnStatus();

    theDate._input.setAttribute('disabled', 'disabled');
    theTime._input.setAttribute('disabled', 'disabled');    

    let displaytime = `| ${timeDays} days |${timeHours} hours |${timeMinutes} minutes ${timeSeconds} seconds |`;    
    
    

    // Check if values have changed. If they have, then animate them on display
    if (verifyValues(numberDays.innerHTML, timeDays)) {
        
        numberDays.innerHTML = timeDays;
        gsap.fromTo(numberDays, {scale: 0}, {scale: 1, duration: .95, ease: "bounce.out"});
    } else {
        numberDays.innerHTML = timeDays;
    }

    if (verifyValues(numberHours.innerHTML, timeHours)) {
        
        numberHours.innerHTML = timeHours;
        gsap.fromTo(numberHours, {scale: 0}, {scale: 1, duration: .9, ease: "bounce.out"});
    } else {
        numberHours.innerHTML = timeHours
    }

    if (verifyValues(numberMinutes.innerHTML, timeMinutes)) {
       
        numberMinutes.innerHTML = timeMinutes;
        gsap.fromTo(numberMinutes, {scale: 0}, {scale: 1, duration: .85, ease: "bounce.out"});
    } else {
        numberMinutes.innerHTML = timeMinutes
    }

    if (verifyValues(numberSeconds.innerHTML, timeSeconds)) {
        // gsap.to(numberSeconds, {scale: 0, duration: .4});
        numberSeconds.innerHTML = timeSeconds;
        gsap.fromTo(numberSeconds, {scale: 0}, {scale: 1, duration: .8, ease: "circle.in"});
    } else {
        numberSeconds.innerHTML = timeSeconds
    }

    

    // numberDays.innerHTML = timeDays;
    // numberHours.innerHTML = timeHours;
    // numberMinutes.innerHTML = timeMinutes;
    // numberSeconds.innerHTML = timeSeconds;

    // console.log(displaytime);
}

function verifyValues (currentValue, lastValue) {
    if (currentValue !== lastValue) {
        return true;
    } else {
        return false;
    }
}


function verifyFields () {
   
    if(counterStatus !== 2) {
        if( timeField.value === '' || dateField.value === '' ) {
            console.log('first condition');
            counterStatus = 0;
            btnStatus();
        } else {
            console.log('second condition');
            counterStatus = 1;
            btnStatus();
        }
    } else 
        return;
}

function updateMessage() {
    
    if(counterStatus == 2) {
        modalTitle.innerHTML = "It's counting!";
        modalMessage.innerHTML = "Hit Stop button if you want to stop and clear."
    }

    else {
        modalTitle.innerHTML = "Let's Begin!";
        modalMessage.innerHTML = "Select the date and the time everyone will be waiting for:"
    }
}

// console.log(gsap);