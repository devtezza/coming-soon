window.addEventListener("load", () => setTimeout(callModalOnLoading, 5000));

// window.addEventListener("load", () => alert('haha'));


const email = document.querySelector('input[type="email"]');
const submitBtn = document.querySelector('input[type="button"]');
const message = document.querySelector('#message');

    email.addEventListener('keydown', toggleSubmitBtn);

    email.addEventListener('focus', clearMessage);

    email.addEventListener('blur', clearMessage);

    submitBtn.addEventListener('click', verifyEmail);

// Verify is a valid e-mail address
function verifyEmail() {   
    if (validator.isEmail(email.value)) {        
        if(message.classList.contains('error-message'))
            message.classList.remove('error-message');
        message.classList.add('success-message');
        email.value = '';
        email.placeholder = 'Success!'; 
    } else {        
        if(message.classList.contains('success-message'))
            message.classList.remove('success-message');
        message.classList.add('error-message');
    }       
}

// Clear success message and error message
function clearMessage() {
    if (message.classList.contains('success-message')) {
        message.classList.remove('success-message');
    } else if (message.classList.contains('error-message')) {
        message.classList.remove('error-message');
    }

    if(email.placeholder === 'Success!') {
        email.placeholder = 'Enter your e-mail adress here ...';
    }
}

// Toggle submit button states between disabled/enabled
function toggleSubmitBtn() {
    console.log('hello');
    console.log(email.value.length);
    if (email.value.length <= 5) {
        if(submitBtn.classList.contains('submit-btn-enabled')) {
            submitBtn.classList.remove('submit-btn-enabled');
        }
        submitBtn.classList.add('submit-btn-disabled');
    } else {
        if(submitBtn.classList.contains('submit-btn-disabled')) {
            submitBtn.classList.remove('submit-btn-disabled');
        }
        submitBtn.classList.add('submit-btn-enabled');
    } 
}

const innerToggler = document.querySelector('#inner-toggler');
const outerToggler = document.querySelector('#outer-toggler');

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

// Set Counter status to initial (status = 0) and update button status
let counterStatus = 0;

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


// Manage Counter button status between Disabled / Enabled Start / Enabled Stop 
function btnStatus() {    
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
    const tlOpen = new TimelineMax({});
    const tlClose = new TimelineMax({});

//Open Modal Screen on loading, if user doesn't click modal toggler
function callModalOnLoading() {
       
    if(!modal.classList.contains('active')) {
        toggleModal()
    } else {
        return;
    }    
}


// Toggle Modal Screen between opened/closed    
function toggleModal() { 
    if(modal.classList.contains('active')) {
        
        modal.classList.remove('active');

        // Unlock scroll when modal is closed
        document.body.classList.remove('lock-scroll');        

        tlClose
        .fromTo(overlay, {autoAlpha: 1}, {autoAlpha: 0, duration: .3, ease: "power2.in"})
        .fromTo(modal, {zIndex: 5}, {zIndex: 0, duration: .1, ease: "power2.in"})
        .fromTo(modal, {y: -600}, {y: 0, duration: .3, delay: 0.3, ease: "power2.in"})
        .fromTo(modal, {autoAlpha: 1}, {autoAlpha: 0, duration: .3})
        
    } else {        
        modal.classList.add('active');

        // lock scroll when modal is opened      
        document.body.classList.add('lock-scroll');

        tlOpen        
        .fromTo(overlay, {autoAlpha: 0}, {autoAlpha: 1, duration: .1})
        .fromTo(modal, {autoAlpha: 0}, {autoAlpha: 1, duration: .1})
        .fromTo(modal, {y: 0}, {y: -600, duration: .3, ease: "power2.in"})
        .fromTo(modal, {zIndex: 0}, {zIndex: 5, duration: .3, ease: "power3.in"});       
    } 
}

modalBtn.addEventListener('click', verifyStatus);

// Verify if counter is running
function verifyStatus() {    
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

            // Verifiy if counter is running (status = 2) to prevent overwriting status. If it's not running, set status to 1 and update button status
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

// Activate Countdown
function runCountdown() {
    if(timerID) {

        calcInterval();
    }
    else {
        console.log('error');
        return;
    }
}

// Calculate the interval (milliseconds) between current date / selected date
function calcInterval() {
    const launchDate = new Date(`${dateOutput}, ${timeOutput}`).getTime();
    const now = new Date().getTime();   

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

// Convert the interval from milliseconds to days/hours/minutes/seconds
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
        numberSeconds.innerHTML = timeSeconds;
        gsap.fromTo(numberSeconds, {scale: 0}, {scale: 1, duration: .8, ease: "circ.inOut"});
    } else {
        numberSeconds.innerHTML = timeSeconds
    }   
}

// Verify the values that are displayed in the counter if they changed and if they need to be animated
function verifyValues (currentValue, lastValue) {
    if (currentValue !== lastValue) {
        return true;
    } else {
        return false;
    }
}

// Verify if modal fields contain valid date and time
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

// Update the Counter message 
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