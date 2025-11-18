// Инициализация частиц с проверкой
function initParticles() {
  if (typeof particlesJS === 'undefined') {
    console.log('Particles.js not available');
    return;
  }
  
  if (!document.getElementById('particles-js')) {
    console.log('Particles container not found');
    return;
  }

  try {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ['#FF6B00', '#FF8C42', '#E55A00', '#FFAA00', '#FFD700']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#FF6B00',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  } catch (error) {
    console.log('Particles initialization error:', error);
  }
}

// Установка высоты hero секции с учетом viewport
function setHeroHeight() {
  const hero = document.getElementById('hero');
  const header = document.getElementById('header');
  
  if (!hero || !header) return;
  
  const headerHeight = header.offsetHeight;
  hero.style.minHeight = `calc(100vh - ${headerHeight}px)`;
  hero.style.marginTop = `${headerHeight}px`;
}

// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  // Инициализация частиц с задержкой
  setTimeout(initParticles, 1000);
  
  // Установка высоты hero
  setHeroHeight();
  
  // Парящий эффект для шапки
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Плавное появление секций
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

  // Мобильное меню
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      
      if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });
    });
  }

  // Плавная прокрутка к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      const header = document.getElementById('header');
      
      if (targetElement && header) {
        const headerHeight = header.offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Ресайз события
window.addEventListener('resize', function() {
  setHeroHeight();
  
  // Закрытие мобильного меню при увеличении экрана
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  if (window.innerWidth > 768 && nav && menuToggle) {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Сообщаем браузеру что страница загружена
window.addEventListener('load', function() {
  console.log('Page fully loaded');
  // Принудительно завершаем загрузку
  if (window.stop) {
    window.stop();
  }
});

// Анимация процесса печати
document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startPrint');
  const resetBtn = document.getElementById('resetPrint');
  const printingModel = document.getElementById('printingModel');
  const printLayer = document.querySelector('.print-layer');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  const currentLayer = document.getElementById('currentLayer');
  const printTime = document.getElementById('printTime');
  
  let isPrinting = false;
  let printInterval;
  let layersCompleted = 0;
  const totalLayers = 100;
  let timeElapsed = 0;
  
  startBtn.addEventListener('click', startPrinting);
  resetBtn.addEventListener('click', resetPrinting);
  
  function startPrinting() {
    if (isPrinting) return;
    
    isPrinting = true;
    printingModel.classList.add('printing');
    startBtn.disabled = true;
    
    // Запускаем анимацию
    let progress = 0;
    layersCompleted = 0;
    timeElapsed = 0;
    
    printInterval = setInterval(() => {
      progress += 1;
      layersCompleted += 1;
      timeElapsed += 1;
      
      // Обновляем визуальные элементы
      printLayer.style.height = progress + '%';
      progressFill.style.width = progress + '%';
      progressText.textContent = progress + '% завершено';
      currentLayer.textContent = layersCompleted + '/' + totalLayers;
      printTime.textContent = formatTime(timeElapsed);
      
      if (progress >= 100) {
        finishPrinting();
      }
    }, 50);
  }
  
  function resetPrinting() {
    clearInterval(printInterval);
    isPrinting = false;
    printingModel.classList.remove('printing');
    startBtn.disabled = false;
    
    printLayer.style.height = '0%';
    progressFill.style.width = '0%';
    progressText.textContent = '0% завершено';
    currentLayer.textContent = '0/' + totalLayers;
    printTime.textContent = '0:00';
  }
  
  function finishPrinting() {
    clearInterval(printInterval);
    isPrinting = false;
    startBtn.disabled = false;
    
    // Добавляем завершающий эффект
    printingModel.style.boxShadow = '0 0 30px rgba(255, 107, 0, 0.5)';
    setTimeout(() => {
      printingModel.style.boxShadow = 'none';
    }, 2000);
  }
  
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
});