
const counterBtn = document.querySelector('.counter-btn');
const modal = document.querySelector('.modal');

console.log('hello');

// Open and Close modal by clicking on counterBtn
counterBtn.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle('active');
    counterBtn.classList.toggle('active');
}





