const track = document.getElementById("track"),
  slides = Array.from(track.children),
  nextButton = document.getElementById("next-button"),
  prevButton = document.getElementById("prev-button"),
  dotsNav = document.querySelector(".slider__nav"),
  dots = Array.from(dotsNav.children),
  firstSlide = slides[0].cloneNode(),
  lastSlide = slides[slides.length - 1].cloneNode();

const getSlideWidth = () => {
  return slides[0].offsetWidth;
};

let isAnimationRunning = false;

const moveToSlide = (currentSlide, targetSlide, isLastSlide) => {
  animateSlide(targetSlide, isLastSlide);
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const getCurrentSlide = () => {
  return track.querySelector(".current-slide");
};

const getCurrentDot = () => {
  return dotsNav.querySelector(".current-slide");
};

// animation ==============================================================================================================================================

let pixelAmount = 0;

const blockEvents = () => {
  prevButton.removeEventListener("click", prevButtonAction);
  nextButton.removeEventListener("click", nextButtonAction);
  dotsNav.removeEventListener("click", dotsAction);
};

const unBlockEvents = () => {
  prevButton.addEventListener("click", prevButtonAction);
  nextButton.addEventListener("click", nextButtonAction);
  dotsNav.addEventListener("click", dotsAction);
};

const returnToFirstSlide = () => {
  track.style.left = `0px`;

  track.removeChild(track.lastChild);

  slides[0].classList.add("current-slide");

  pixelAmount = 0;
};
const returnToLastSlde = () => {
  track.removeChild(track.firstChild);

  track.style.left = `-${getSlideWidth() * slides.length - getSlideWidth()}px`;

  slides[slides.length - 1].classList.add("current-slide");

  pixelAmount = getSlideWidth() * (slides.length - 1) * -1;
};

const getSlideIndex = (targetSlide) => {
  let index = 0;

  for (let child of track.children) {
    if (child === targetSlide) {
      return index;
    } else {
      index++;
    }
  }
};

const animateSlide = (targetSlide, isLastSlide) => {
  isAnimationRunning = true;

  const pixelToReach = getSlideIndex(targetSlide) * getSlideWidth();
  blockEvents();

  const timer = setInterval(() => {
    if (-parseInt(track.style.left) >= pixelToReach) {
      // клик на левую кнопку
      pixelAmount += 10;
    } else {
      // клик на правую кнопку
      pixelAmount -= 10;
    }
    track.style.left = `${pixelAmount}px`;
    if (-parseFloat(track.style.left) === pixelToReach) {
      clearInterval(timer);
      unBlockEvents();
      isAnimationRunning = false;
      if (isLastSlide && !isAnimationRunning) {
        if (pixelAmount === 0) {
          returnToLastSlde();
        } else {
          returnToFirstSlide();
        }
      }
    }
  }, 5);
};

// EventListeners =========================================================================================================================================

const prevButtonAction = () => {
  const currentSlide = getCurrentSlide();
  let prevSlide = currentSlide.previousElementSibling;
  const currentDot = getCurrentDot();
  let prevDot = currentDot.previousElementSibling;

  if (!prevSlide) {
    track.style.left = `${getSlideWidth() * -1}px`;

    pixelAmount = getSlideWidth() * -1;

    track.prepend(lastSlide);

    prevSlide = track.children[0];
    prevDot = dots[dots.length - 1];

    moveToSlide(currentSlide, prevSlide, true);
  } else {
    moveToSlide(currentSlide, prevSlide);
  }

  updateDots(currentDot, prevDot);
};

prevButton.addEventListener("click", prevButtonAction);

const nextButtonAction = () => {
  const currentSlide = getCurrentSlide();
  let nextSlide = currentSlide.nextElementSibling;
  const currentDot = getCurrentDot();
  let nextDot = currentDot.nextElementSibling;

  if (!nextSlide) {
    track.append(firstSlide);

    nextSlide = track.children[track.children.length - 1];
    nextDot = dots[0];

    moveToSlide(currentSlide, nextSlide, true);
  } else {
    moveToSlide(currentSlide, nextSlide);
  }

  updateDots(currentDot, nextDot);
};

nextButton.addEventListener("click", nextButtonAction);

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const dotsAction = (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentSlide = getCurrentSlide();
  const currentDot = getCurrentDot();

  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
};

dotsNav.addEventListener("click", dotsAction);
