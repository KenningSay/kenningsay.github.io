// gallery-viewer.js
document.addEventListener('DOMContentLoaded', function() {
  const galleryImages = document.querySelectorAll('.gallery img');
  const viewer = document.getElementById('imageViewer');
  const viewerImage = document.getElementById('viewerImage');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const currentIndexSpan = document.getElementById('currentIndex');
  const totalImagesSpan = document.getElementById('totalImages');
  
  let currentImageIndex = 0;
  
  totalImagesSpan.textContent = galleryImages.length;
  
  function openViewer(index) {
    currentImageIndex = index;
    updateViewer();
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function updateViewer() {
    const imageSrc = galleryImages[currentImageIndex].src;
    viewerImage.src = imageSrc;
    currentIndexSpan.textContent = currentImageIndex + 1;
  }
  
  function closeViewer() {
    viewer.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateViewer();
  }
  
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateViewer();
  }
  
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      openViewer(index);
    });
  });
  
  closeBtn.addEventListener('click', closeViewer);
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);
  
  viewer.addEventListener('click', function(e) {
    if (e.target === viewer) {
      closeViewer();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (!viewer.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeViewer();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  });
});
// Индикаторы для мобильной галереи
function initGalleryIndicators() {
  if (window.innerWidth > 768) return;
  
  const gallery = document.querySelector('.gallery');
  const images = document.querySelectorAll('.gallery img');
  const existingIndicators = document.querySelector('.gallery-indicators');
  
  // Удаляем старые индикаторы если есть
  if (existingIndicators) {
    existingIndicators.remove();
  }
  
  // Создаем индикаторы только если их нет и есть изображения
  if (images.length > 0 && !existingIndicators) {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'gallery-indicators';
    
    images.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
      indicatorsContainer.appendChild(indicator);
    });
    
    // Вставляем после галереи
    gallery.parentNode.appendChild(indicatorsContainer);
    
    // Обновляем индикаторы при скролле
    gallery.addEventListener('scroll', updateIndicators);
  }
}

function updateIndicators() {
  const gallery = document.querySelector('.gallery');
  const images = document.querySelectorAll('.gallery img');
  const indicators = document.querySelectorAll('.indicator');
  
  if (images.length === 0 || indicators.length === 0) return;
  
  const scrollLeft = gallery.scrollLeft;
  const imageWidth = images[0].offsetWidth + 16; // + gap
  
  const activeIndex = Math.round(scrollLeft / imageWidth);
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === activeIndex);
  });
}

// Защита от множественного вызова
let isInitialized = false;

function initGallery() {
  if (isInitialized) return;
  isInitialized = true;
  
  initGalleryIndicators();
}

// Инициализируем только один раз при загрузке
document.addEventListener('DOMContentLoaded', initGallery);

// При изменении размера переинициализируем
window.addEventListener('resize', function() {
  isInitialized = false;
  initGallery();
});