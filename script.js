// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Mobile Navigation Toggle
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Portfolio Filtering
// filterBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         // Remove active class from all buttons
//         filterBtns.forEach(btn => btn.classList.remove('active'));
//         // Add active class to clicked button
//         btn.classList.add('active');

//         const filter = btn.getAttribute('data-filter');

//         portfolioItems.forEach(item => {
//             if (filter === 'all' || item.getAttribute('data-category') === filter) {
//                 item.style.display = 'block';
//             } else {
//                 item.style.display = 'none';
//             }
//         });
//     });
// });
function filterbtnactive() {

    setActiveButton(event?.target || document.querySelector('.filter-btn[data-type="web"]'));

    const extraItems = document.querySelectorAll('.itemA');
    extraItems.forEach(portfolio => portfolio.style.display = 'none');
    
    const baseItems = document.querySelectorAll('.item');
    baseItems.forEach(portfolio => portfolio.style.display = 'block');
  }

  function filterbtn() {
    
    setActiveButton(event?.target || document.querySelector('.filter-btn[data-type="all"]'));
    
    const allItems = document.querySelectorAll('.portfolio');
    allItems.forEach(portfolio => portfolio.style.display = 'block');
  }

  function setActiveButton(clickedBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (clickedBtn) clickedBtn.classList.add('active');
  }

  window.addEventListener('DOMContentLoaded', function () {
    filterbtnactive();
  });

  // Smooth Scrolling
//   function setActiveButton(clickedBtn) {
//     const buttons = document.querySelectorAll('.filter-btn');
//     buttons.forEach(btn => btn.classList.remove('active'));
//     clickedBtn.classList.add('active');
//   }

// Active Section Highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

const observerOptions = {
    threshold: 0.5
};

const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('portfolio-item-visible');
        }
    });
}, observerOptions);

portfolioItems.forEach(item => {
    portfolioObserver.observe(item);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic form validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        removeError(name);
    }

    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        removeError(email);
    }

    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else {
        removeError(message);
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        showSuccessMessage();
        contactForm.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        formGroup.removeChild(errorDiv);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    contactForm.insertAdjacentElement('beforebegin', successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}