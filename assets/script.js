/* MOBILE MENU */

function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}




/* HERO INDEX */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let slideInterval;

/* SHOW SLIDE */

function showSlide(index){

    slides.forEach((slide, i)=>{

        slide.classList.remove("active");

        dots[i].classList.remove("active");

    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

/* NEXT SLIDE */

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

/* AUTO SLIDE */

function startSlider(){

    slideInterval = setInterval(()=>{

        nextSlide();

    },5000);

}

/* RESET TIMER WHEN CLICK DOT */

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide = index;

        showSlide(currentSlide);

        clearInterval(slideInterval);

        startSlider();

    });

});

/* TOUCH SWIPE MOBILE */

let startX = 0;
let endX = 0;

const slider = document.querySelector(".hero-slider");

slider.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});

slider.addEventListener("touchend",(e)=>{

    endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){

        currentSlide++;

        if(currentSlide >= slides.length){

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }

    else if(endX - startX > 50){

        currentSlide--;

        if(currentSlide < 0){

            currentSlide = slides.length - 1;

        }

        showSlide(currentSlide);

    }

    clearInterval(slideInterval);

    startSlider();

});

/* START */

showSlide(currentSlide);

startSlider();























/* =========================
CATALOG IMAGE FILTER
========================= */

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn=>{

    btn.addEventListener('click',()=>{

        document
        .querySelector('.filter-btn.active')
        .classList.remove('active');

        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card=>{

            if(filter === 'all'){
                card.style.display='block';
            }
            else if(card.classList.contains(filter)){
                card.style.display='block';
            }
            else{
                card.style.display='none';
            }

        });

    });

});

/* =========================
IMAGE VIEWER
========================= */

const viewer = document.getElementById('viewer');
const viewerSlider = document.getElementById('viewerSlider');

/* AUTO GET ALL IMAGES */

const images = [];

document.querySelectorAll('.card img').forEach(img=>{

    images.push(img.src);

});

/* CREATE SLIDES */

images.forEach(src=>{

    viewerSlider.innerHTML += `
    
    <div class="viewer-slide">
        <img src="${src}">
    </div>
    
    `;

});

let currentIndex = 0;

/* OPEN */

function openViewer(src){

    currentIndex = images.indexOf(
        new URL(src, location.href).href
    );

    if(currentIndex < 0){
        currentIndex = 0;
    }

    updateSlider();

    viewer.classList.add('active');

}

/* CLOSE */

function closeViewer(){

    viewer.classList.remove('active');

}

/* UPDATE */

function updateSlider(){

    viewerSlider.style.transform =
    `translateX(-${currentIndex * 100}%)`;

}

/* NEXT */

function nextImage(){

    currentIndex++;

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    updateSlider();

}

/* PREV */

function prevImage(){

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    updateSlider();

}

/* =========================
TOUCH SWIPE
========================= */

let startX = 0;

/* MOBILE */

viewer.addEventListener('touchstart',(e)=>{

    startX = e.touches[0].clientX;

});

viewer.addEventListener('touchend',(e)=>{

    let endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){
        nextImage();
    }

    if(endX - startX > 50){
        prevImage();
    }

});

/* DESKTOP DRAG */

let isDragging = false;

viewer.addEventListener('mousedown',(e)=>{

    isDragging = true;
    startX = e.clientX;

});

viewer.addEventListener('mouseup',(e)=>{

    if(!isDragging) return;

    let endX = e.clientX;

    if(startX - endX > 50){
        nextImage();
    }

    if(endX - startX > 50){
        prevImage();
    }

    isDragging = false;

});

/* KEYBOARD */

document.addEventListener('keydown',(e)=>{

    if(!viewer.classList.contains('active')) return;

    if(e.key === 'ArrowRight'){
        nextImage();
    }

    if(e.key === 'ArrowLeft'){
        prevImage();
    }

    if(e.key === 'Escape'){
        closeViewer();
    }

});

/* CLICK OUTSIDE CLOSE */

viewer.addEventListener('click',(e)=>{

    if(e.target === viewer){
        closeViewer();
    }

});