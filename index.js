const hamburger = document.querySelector('#menu');
const navLink = document.querySelector('.navigation-contents');

hamburger.addEventListener('click', () => {
  navLink.classList.toggle('hide-height');
});


window.onscroll=function(){
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let elementsOfNavbar = document.getElementById("navbar");
    if(screenWidth >= 992){
        elementsOfNavbar.style.backgroundColor = null;
    if(document.body.scrollTop > 1 || document.documentElement.scrollTop > 1){
        elementsOfNavbar.classList.add("black-background");
    }
    else
    {  
        elementsOfNavbar.classList.remove("black-background");
    }
}

    else{
        
        if(document.body.scrollTop > 1 || document.documentElement.scrollTop > 1){
           
            document.querySelectorAll(".other-medias a svg, #menu svg").forEach(function(svgElement){
                svgElement.style.fill = "white";
                elementsOfNavbar.style.backgroundColor = "black";
            });
       
    }

    else{
        document.querySelectorAll(".other-medias a svg, #menu svg").forEach(function(svgElement){
            svgElement.style.fill = "black";
            elementsOfNavbar.style.backgroundColor = "white";
        });
    }
}
}
function setupTestimonialsCarousel() {
  const testimonialsContainer = document.getElementById('testimonials');
  const testimonialsSlider = document.querySelector('.testimonials-slider');
  let testimonialsItems = document.querySelectorAll('.testimonials-slider-content');
  let testimonialsContentWidth;
  let currentIndex = 0;
  let isUserInteracted = false;
  let startX;
  let distanceToMove = 0;

  function moveTo(direction) {
    testimonialsContentWidth = testimonialsItems[0].offsetWidth;

    if (direction === 'forward') {
      currentIndex = (currentIndex + 1) % testimonialsItems.length;
    } else if (direction === 'backward') {
      currentIndex = (currentIndex - 1 + testimonialsItems.length) % testimonialsItems.length;
    }

    updateCarousel();
  }

  function updateCarousel() {
    const translateValue = -currentIndex * testimonialsContentWidth;

    for (let i = 0; i < testimonialsItems.length; i++) {
      item = testimonialsItems[i];
      item.style.transition = 'transform 0.5s ease';
      item.style.transform = `translateX(${translateValue}px)`;
    }
    distanceToMove = 0;
  }

  function startAutoCycle() {
    setInterval(() => {
      if (!isUserInteracted) {
        moveTo('forward');
      }
    }, 5000);
  }

  testimonialsContainer.addEventListener('mousedown', (e) => {
    isUserInteracted = true;
    startX = e.offsetX - testimonialsSlider.offsetLeft;
    testimonialsSlider.style.cursor = 'grabbing';
  });

  testimonialsContainer.addEventListener('mouseup', (e) => {
    testimonialsSlider.style.cursor = 'grab';
    isUserInteracted = false;
    if (distanceToMove > 50) {
      moveTo('backward');
    } else if (distanceToMove < -50 ) {
      moveTo('forward');
    }
  });

  testimonialsContainer.addEventListener('mouseleave', (e) => {
    isUserInteracted = false;
  });

  testimonialsContainer.addEventListener('mouseenter', (e) => {
    testimonialsSlider.style.cursor = 'grab';
  });

  testimonialsContainer.addEventListener('mousemove', (e) => {
    if (!isUserInteracted) return;
    e.preventDefault();
    x = e.offsetX;
    distanceToMove = x - startX;
    const translateValue = -currentIndex * testimonialsContentWidth + distanceToMove;
    testimonialsSlider.style.transition = 'none';
  });

  startAutoCycle();
}
  
  // Call the function to set up the carousel
  setupTestimonialsCarousel();
