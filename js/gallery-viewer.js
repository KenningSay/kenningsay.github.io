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