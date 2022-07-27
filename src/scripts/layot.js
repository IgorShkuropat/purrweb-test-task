let opacityValue = 10;

const dissapearingAnimation = (HTMLElement, intervalName) => {
  opacityValue--;

  HTMLElement.style.opacity = `0.${opacityValue}`;

  if (opacityValue === 0) {
    clearInterval(intervalName);
    HTMLElement.style.display = "none";
    opacityValue = 10;
  }
};

// Блок куки
const cookiesBlock = document.querySelector(".cookies");

cookiesBlock.querySelector(".cookies__button").addEventListener("click", () => {
  const cookieAnimationInterval = setInterval(() => {
    dissapearingAnimation(cookiesBlock, cookieAnimationInterval);
  }, 30);
});

window.addEventListener("load", () => {
  let amount = 0;
  const cookieBlockHeight = cookiesBlock.offsetHeight;

  cookiesBlock.style.display = "flex";
  cookiesBlock.style.bottom = "-" + cookiesBlock.offsetHeight + "px";

  const frame = () => {
    cookiesBlock.style.transform = `translateY(${-amount}px)`;
    amount++;
    if (amount === cookiesBlock.offsetHeight) {
      clearInterval(interval);
    }
  };

  const interval = setInterval(frame, 10);
});

// our mission анимация

const phone = document.querySelector(".our-mission__picture"),
  article = document.querySelector(".our-mission__article"),
  ourMissionBlock = document.querySelector(".our-mission__bottom-container");

const moveArticle = () => {
  let articleTransformValue = +article.style.transform;
  const intervalCallback = () => {
    if (articleTransformValue > 520) {
      clearInterval(interval);
    } else {
      article.style.transform = `translateX(${articleTransformValue}px)`;
      articleTransformValue++;
    }
  };
  const interval = setInterval(intervalCallback, 5);
};

const glowBG = document.querySelector(".our-mission__glow-bg");
const movePhone = () => {
  let bgOpacityValue = 0;
  let phoneTransformValueY = 0;
  let phoneRotateValue = 90;
  const intervalCallback = () => {
    if (phoneTransformValueY !== 535) {
      phoneTransformValueY += 5;
    }
    if (phoneRotateValue !== 0) {
      phoneRotateValue--;
    }

    if (phoneTransformValueY > 534) {
      bgOpacityValue += 0.005;
    }

    if (bgOpacityValue > 0.4) {
      clearInterval(interval);
    }
    glowBG.style.opacity = bgOpacityValue;
    phone.style.transform = `translateX(${phoneTransformValueY}px) rotate(${phoneRotateValue}deg)`;
  };
  const interval = setInterval(intervalCallback, 5);
};

const setMargin = () => {
  let phoneMarginTop = 0;
  const intervalCallback = () => {
    if (phoneMarginTop === 156) {
      clearInterval(interval);
    } else {
      phoneMarginTop++;
      phone.style.marginTop = `${phoneMarginTop}px`;
    }
  };
  const interval = setInterval(intervalCallback, 5);
};

const reducePhoneWidth = () => {
  let phoneWidth = phone.offsetWidth;
  const intervalCallback = () => {
    phoneWidth--;
    phone.style.width = `${phoneWidth}px`;
    if (phoneWidth === 371) {
      clearInterval(interval);
    }
  };
  const interval = setInterval(intervalCallback, 1);
};

const reducePhoneHeight = () => {
  let phoneHeight = phone.offsetHeight;
  const intervalCallback = () => {
    phoneHeight--;
    phone.style.height = `${phoneHeight}px`;
    if (phoneHeight === 745) {
      clearInterval(interval);
    }
  };
  const interval = setInterval(intervalCallback, 1);
};

let isPhoneAnimated = false;

const sectionCallback = (entries) => {
  if(document.body.offsetWidth <= 1450){
    return
  }
  if (!isPhoneAnimated) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const sectionAnimationInterval = setInterval(() => {
          dissapearingAnimation(article, sectionAnimationInterval);
        }, 50);
        moveArticle();
        movePhone();
        reducePhoneWidth();
        reducePhoneHeight();
        setMargin();
      }
    });
    isPhoneAnimated = true;
  }
};

const options = {
  threshold: 0.5,
};

const sectionObserver = new IntersectionObserver(sectionCallback, options);

sectionObserver.observe(ourMissionBlock);

//form

const inputs = Array.from(document.querySelectorAll("input"));
const textarea = document.querySelector("textarea");
const button = document.querySelector("#button");

inputs.push(textarea);

function isValidForm() {
  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  });
}

button.addEventListener("click", isValidForm);
