// Mobile menu toggle

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });

    // Close mobile menu if open
    mobileMenu.classList.add("hidden");
  });
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-nav");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-nav");
    }
  });
});
// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkillBars() {
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Intersection Observer for skill bars animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("#skills").forEach((section) => {
  observer.observe(section);
});

// Modal
// opens the modal
document.querySelectorAll('.open-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    modal.classList.remove('modal-none');
    const video = modal.querySelector('video');
    if (video) {
      video.currentTime = 0; // opcional: para empezar desde el inicio
      video.play();
    }
  });
});

// Closes modal and stops videos
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
    modal.classList.add('modal-none');
    stopVideo(modal);
  });
});

// closes modal when clicking outside content
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal.show').forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.classList.add('modal-none');
      stopVideo(modal);
    }
  });
});

// function to stop video
function stopVideo(modal) {
  const video = modal.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}
//Slider for project gallery

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}