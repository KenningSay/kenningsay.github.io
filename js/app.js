// Установка высоты hero секции с учетом viewport
function setHeroHeight() {
  const hero = document.getElementById('hero');
  const header = document.getElementById('header');
  const headerHeight = header.offsetHeight;
  hero.style.minHeight = `calc(100vh - ${headerHeight}px)`;
  hero.style.marginTop = `${headerHeight}px`;
}

// Инициализация при загрузке и изменении размера окна
window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', setHeroHeight);

// Парящий эффект для шапки при скролле
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Плавное появление секций при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.getElementById('header').offsetHeight;
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight - 20,
        behavior: 'smooth'
      });
      
      // Закрытие мобильного меню после клика
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });
});

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  nav.classList.toggle('active');
  
  // Блокировка прокрутки при открытом меню
  if (nav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});

// Закрытие меню при клике вне его области
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 768 && nav.classList.contains('active')) {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});

// Закрытие меню при изменении размера окна
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Прокрутка к началу страницы при загрузке на мобильных устройствах
window.addEventListener('load', function() {
  if (window.innerWidth <= 768) {
    window.scrollTo(0, 0);
  }
});