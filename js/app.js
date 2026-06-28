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
          enable: false,
          distance: 150,
          color: '#FF6B00',
          opacity: 0,
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
// Демонстрация печати в блоке преимуществ
document.addEventListener('DOMContentLoaded', function() {
  const printTrigger = document.getElementById('printTrigger');
  const printStatus = document.getElementById('printStatus');
  const printer = document.querySelector('.printer');
  const itemLayers = document.querySelector('.item-layers');
  const demoSection = document.querySelector('.printing-demo-integrated');
  
  let isPrinting = false;
  
  //printTrigger.addEventListener('click', function() {
  //  if (isPrinting) return;
    
  //  startPrinting();
  //});
  
  function startPrinting() {
    isPrinting = true;
    printTrigger.disabled = true;
    printStatus.textContent = "🔄 Печать началась...";
    demoSection.classList.add('printing-active');
    printer.classList.add('printing');
    
    // Очищаем предыдущие слои
    itemLayers.innerHTML = '';
    itemLayers.style.height = '0';
    
    let currentLayer = 0;
    const totalLayers = 25; // Больше слоев для долгой анимации
    const layerHeight = 6; // Высота одного слоя
    
    const printInterval = setInterval(() => {
      if (currentLayer >= totalLayers) {
        clearInterval(printInterval);
        finishPrinting();
        return;
      }
      
      // Создаем слой
      const layer = document.createElement('div');
      layer.className = 'print-layer';
      layer.style.animationDelay = (currentLayer * 0.2) + 's';
      itemLayers.prepend(layer); // Добавляем снизу
      
      // Обновляем высоту
      itemLayers.style.height = (currentLayer * layerHeight) + 'px';
      
      // Обновляем статус
      const progress = Math.round((currentLayer / totalLayers) * 100);
      printStatus.textContent = `🔄 Печатается... ${progress}%`;
      
      currentLayer++;
    }, 300); // Интервал увеличен для более долгой анимации
  }
  
  function finishPrinting() {
    printer.classList.remove('printing');
    document.querySelector('.printed-item').classList.add('print-complete');
    printStatus.textContent = "✅ Печать завершена!";
    printTrigger.innerHTML = '<span class="print-icon">🔄</span> Запустить снова';
    printTrigger.disabled = false;
    
    setTimeout(() => {
      isPrinting = false;
      document.querySelector('.printed-item').classList.remove('print-complete');
      demoSection.classList.remove('printing-active');
    }, 4000);
  }
});


// ================== КАЛЬКУЛЯТОР СТОИМОСТИ ==================

function initCalculator() {
    const calcBtn = document.getElementById('calcBtn');
    const calcModal = document.getElementById('calcModal');
    const calcClose = document.getElementById('calcClose');
    
    if (!calcBtn || !calcModal) {
        console.log("Элементы калькулятора не найдены, повторная попытка...");
        setTimeout(initCalculator, 100);
        return;
    }
    
    console.log("Калькулятор инициализирован!");

    // Открыть калькулятор
    calcBtn.addEventListener('click', function() {
        console.log("Кнопка калькулятора нажата!");
        calcModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Закрыть калькулятор
    calcClose.addEventListener('click', closeCalculator);

    // Закрытие по клику вне окна
    calcModal.addEventListener('click', function(e) {
        if (e.target === calcModal) {
            closeCalculator();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && calcModal.style.display === 'flex') {
            closeCalculator();
        }
    });

    // === ОДНА ФУНКЦИЯ closeCalculator ===
    function closeCalculator() {
        // Плавное скрытие
        calcModal.style.opacity = '0';
        setTimeout(() => {
            calcModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            calcModal.style.opacity = '1'; // Возвращаем opacity
        }, 300);
    }
    // === КОНЕЦ ФУНКЦИИ ===

    // Расчет стоимости
    function calculateCost() {
        const volume = parseFloat(document.getElementById('volume').value) || 0;
        const material = parseFloat(document.getElementById('material').value);
        const urgency = parseFloat(document.getElementById('urgency').value);
        
        // Базовая цена за материал (руб/см³)
        const basePrices = {
            1.0: 7,   // PLA
            1.2: 8,   // PETG
            1.5: 12,  // ABS
            2.0: 15,  // Flexible
            2.2: 45   // Resin
        };
        
        const basePrice = basePrices[material] || 7;
        const cost = volume * basePrice * urgency;
        
        // Минимальная стоимость 300 руб
        document.getElementById('result').textContent = Math.max(300, Math.round(cost));
    }

    // Обработчик загрузки файла
    document.getElementById('file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const fileName = document.getElementById('fileName');
        
        if (file) {
            fileName.textContent = file.name;
            fileName.style.color = 'var(--orange)';
        } else {
            fileName.textContent = 'Файл не выбран';
            fileName.style.color = 'var(--text-light)';
        }
    });

    // Обновляем стоимость при изменении ВСЕХ полей
    document.getElementById('volume').addEventListener('input', calculateCost);
    document.getElementById('material').addEventListener('change', calculateCost);
    document.getElementById('urgency').addEventListener('change', calculateCost);

// Кнопка отправки
document.querySelector('.calc-submit-btn').addEventListener('click', async function() {
    const volume = document.getElementById('volume').value;
    const description = document.getElementById('description').value;
    const name = document.getElementById('name').value;
    const color = document.getElementById('color').value;
    const phone = document.getElementById('phone').value;
    const material = document.getElementById('material');
    const materialText = material.options[material.selectedIndex].text;
    const urgency = document.getElementById('urgency');
    const urgencyText = urgency.options[urgency.selectedIndex].text;
    const file = document.getElementById('file').files[0];
    const cost = document.getElementById('result').textContent;
    
    if (!volume || volume < 1) {
        alert('Пожалуйста, укажите объем модели');
        return;
    }
    
    if (!description.trim()) {
        alert('Пожалуйста, опишите вашу модель');
        return;
    }
    
    if (!name.trim()) {
        alert('Пожалуйста, укажите ваше имя');
        return;
    }
    
    if (!phone.trim()) {
        alert('Пожалуйста, укажите номер телефона для связи');
        return;
    }
    
    // === НАСТРОЙКИ TELEGRAM ===
    const BOT_TOKEN = '8531384313:AAGY8zl8Z_67coFf57pemwBlaPfEGtOa41s';
    const CHAT_ID = '369327655';
    const CHAT_ID2 = '270480113';
    // ==========================
    
    // Показываем загрузку
    const submitBtn = document.querySelector('.calc-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '📨 Отправляем...';
    submitBtn.disabled = true;
    
    try {
        // Функция для определения эмодзи по цвету
        function getColorEmoji(hexColor) {
            const colorMap = {
                '#FF0000': '🔴', '#00FF00': '🟢', '#0000FF': '🔵',
                '#FFFF00': '🟡', '#FF00FF': '🟣', '#00FFFF': '🦋',
                '#FFFFFF': '⚪', '#000000': '⚫', '#FF6B00': '🟠'
            };
            
            if (colorMap[hexColor.toUpperCase()]) {
                return colorMap[hexColor.toUpperCase()];
            }
            return '🎨';
        }
        
        const colorEmoji = getColorEmoji(color);
        
        // Формируем сообщение для Telegram
        const message = `🎯 *НОВАЯ ЗАЯВКА НА 3D ПЕЧАТЬ*

👤 *Имя:* ${name}
📐 *Объем:* ${volume} см³
📝 *Описание:* ${description}
${colorEmoji} *Цвет:* \`${color}\`
📞 *Телефон:* ${phone}
📦 *Материал:* ${materialText}
⏱️ *Срочность:* ${urgencyText}
💰 *Стоимость:* ${cost} ₽

📅 *Время заявки:* ${new Date().toLocaleString('ru-RU')}

⚡ *СРОЧНО ПЕРЕЗВОНИТЬ КЛИЕНТУ!*`;

        // Отправляем в первый чат
        await sendToTelegram(CHAT_ID, message, file);
        
        // Отправляем во второй чат
        await sendToTelegram(CHAT_ID2, message, file);
        
        // Сообщение для пользователя
        let userMessage = `✅ Заявка отправлена!\n\n`;
        userMessage += `📐 Объем: ${volume} см³\n`;
        userMessage += `📝 Описание: ${description}\n`;
        userMessage += `${colorEmoji} Цвет: ${color}\n`;
        userMessage += `👤 Имя: ${name}\n`;
        userMessage += `📞 Телефон: ${phone}\n`;
        userMessage += `📦 Материал: ${materialText}\n`;
        userMessage += `⏱️ Срочность: ${urgencyText}\n`;
        userMessage += `💰 Стоимость: ${cost} ₽\n`;
        
        if (file) {
            userMessage += `📎 Файл: ${file.name} отправлен\n`;
        }
        
        userMessage += `\n📱 Уведомления отправлены в Telegram!\n`;
        userMessage += `Свяжемся с вами в течение 1 часа!`;
        
        alert(userMessage);
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('✅ Заявка принята! Если не получили уведомление, свяжитесь с нами напрямую.\n\n📞 +7 (999) 123-45-67');
    } finally {
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Очистка формы
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('file').value = '';
        document.getElementById('fileName').textContent = 'Файл не выбран';
        document.getElementById('fileName').style.color = 'var(--text-light)';
        
        closeCalculator();
    }
});

// Функция для отправки в Telegram
async function sendToTelegram(chatId, message, file) {
    const BOT_TOKEN = '8531384313:AAGY8zl8Z_67coFf57pemwBlaPfEGtOa41s';
    
    // Если есть файл - отправляем файл с подписью
    if (file) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('caption', message);
        formData.append('parse_mode', 'Markdown');
        
        // Определяем тип контента (фото или документ)
        if (file.type.startsWith('image/')) {
            formData.append('photo', file);
            var sendURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
        } else {
            formData.append('document', file);
            var sendURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
        }
        
        const response = await fetch(sendURL, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (!data.ok) {
            throw new Error('Ошибка отправки файла в чат ' + chatId + ': ' + data.description);
        }
    } else {
        // Если файла нет - отправляем только сообщение
        const encodedMessage = encodeURIComponent(message);
        const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodedMessage}&parse_mode=Markdown`;
        
        const response = await fetch(telegramURL);
        const data = await response.json();
        
        if (!data.ok) {
            throw new Error('Ошибка Telegram API для чата ' + chatId + ': ' + data.description);
        }
    }
}

// Инициализация стоимости при загрузке
calculateCost();
}

// ================== ВЫЗОВ ФУНКЦИИ ==================
// Добавьте эти строки в конец файла:

// Инициализация калькулятора после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    initCalculator(); // ← ВАЖНО: вызвать функцию
});

// Резервная инициализация
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    // Если калькулятор еще не инициализирован, пробуем еще раз
    if (!document.getElementById('calcBtn')) {
        console.log("Калькулятор не найден после полной загрузки");
        setTimeout(initCalculator, 500);
    }
});
// JS для плавного появления
document.addEventListener('DOMContentLoaded', function() {
  // Находим все текстовые элементы
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, .btn, .material-item, .feature p, .feature h3, .process-step p, .process-step h3, .subtitle, .about-intro, .about-footer, .contact-info p, .section-title, .printer-icon, .calc-field label, .calc-result h3, .field-hint, .examples span, .file-name, .calc-note');

  textElements.forEach((el, i) => {
    // Прячем элемент и немного сдвигаем вниз
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    // Анимируем с небольшой задержкой
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 30 * i); // Увеличиваем задержку для каждого следующего элемента
  });
});