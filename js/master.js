let mainColor = localStorage.getItem("color_option");
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background-option");

const landingPage = document.querySelector(".landing-page");
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
const randomBG = document.querySelectorAll("#randBg .option-btns span");

if (mainColor != null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");

    if (e.dataset.color === mainColor) {
      e.classList.add("active");
    }
  });
}
// remove active calss from all spans
randomBG.forEach((element) => {
  element.classList.remove("active");
});
if (backgroundLocalItem != null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".option-btns span.yes").classList.add("active");
    randomizeImgs(); // trigger this function as default option
  } else {
    backgroundOption = false;
    document.querySelector(".option-btns .no").classList.add("active");
  }
}

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

const colorLi = document.querySelectorAll(".colors-list li");

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActiveClass(e);
  });
});

// switch random background

randomBG.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActiveClass(e);

    if (e.target.dataset.btn === "true") {
      backgroundOption = true;
      localStorage.setItem("background-option", true);
      randomizeImgs(); // trigger this function as default option
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let rndNum = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        "url('imgs/" + imgsArray[rndNum] + "')";
    }, 2000);
  }
}

const ourSkills = document.querySelector(".skills");

window.onscroll = () => {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let skills = document.querySelectorAll(".skill-box .skill-progress span");

    skills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    const overlay = document.createElement("div");

    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    const popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    const popupImage = document.createElement("img");
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox);

    const imgHeading = document.createElement("h3");
    const imgText = document.createTextNode(img.alt);

    imgHeading.appendChild(imgText);
    popupBox.appendChild(imgHeading);

    const closeBox = document.createElement("span");
    const closeButton = document.createTextNode("X");
    closeBox.className = "close-box";
    closeBox.appendChild(closeButton);

    popupBox.appendChild(closeBox);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-box") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const Bullets = document.querySelectorAll(".nav-bullets .bullet");
const Links = document.querySelectorAll(".links li a");

function jumbToSmoothly(elements) {
  elements.forEach((elm) => {
    elm.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

jumbToSmoothly(Bullets);
jumbToSmoothly(Links);

/* to handel- toggle active class  */
function handleActiveClass(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
}

/* to handel- toggle show/hide bullets  */
const showBulletsBtn = document.querySelectorAll(
  "#showBullets .option-btns span"
);
const bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullets_option");

if (bulletLocalStorage != null) {
  showBulletsBtn.forEach(span =>{
    span.classList.remove("active");
  });

  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector("#showBullets .option-btns .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector("#showBullets .option-btns .no").classList.add("active");
  }
}


showBulletsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActiveClass(e);

    if (e.target.dataset.btn === "true") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
  });
});

document.querySelector(".goTop").onclick = ()=>{
  document.querySelector(".landing-page").scrollIntoView({
    behavior:"smooth"
  })
}