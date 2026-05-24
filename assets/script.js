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