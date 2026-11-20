const slides = document.querySelectorAll(".slide");
const prevbt = document.getElementById("PrevBt");
const nextbt = document.getElementById("NextBt");
let slidecount = 0;
let slidetime ;



function Shoslide (index) {

slides.forEach((slide , i) => {
if (i == index) {
slide.classList.remove("opacity-0", "z-0")
slide.classList.add("opacity-100", "z-10")

} else {
    slide.classList.remove("opacity-100", "z-10")
slide.classList.add("opacity-0", "z-0")
}

})

};



function nextslide() {
    slidecount = (slidecount + 1) % slides.length
    Shoslide(slidecount)
}

function prevslide () {
slidecount = (slidecount - 1 + slides.length) % slides.length
Shoslide(slidecount)
}

function StartTime() {
    slidetime = setInterval(nextslide , 5000)
}

function resetTime () {

    clearInterval(slidetime);
    StartTime();
    
}

nextbt.addEventListener("click" , () => {
    nextslide();
    resetTime()
})

prevbt.addEventListener("click" , () => {
    prevslide();
    resetTime()
})

StartTime()
