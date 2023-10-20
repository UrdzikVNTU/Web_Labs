document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(slideIndex) {
        slides[currentSlide].style.display = "none";
        slides[slideIndex].style.display = "block";
        currentSlide = slideIndex;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Початкове відображення першого слайду
    showSlide(0);

    // Автоматична зміна слайдів кожні 5 секунд
    setInterval(nextSlide, 5000);
});


