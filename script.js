// the fromTo() method
var tween = KUTE.fromTo(
  "#snow1",
  { path: "#snow1" },
  { path: "#snow2" },
  {
    // options
    delay: 2000,
    easing: "easingCubicInOut",
    yoyo: true,
    repeat: 0,
    duration: 50000,
  }
).start();

//Set initial barrage of snow here
for (let i = 0; i < 100; i++) {
  let flake = document.createElement("img");
  flake.setAttribute("src", "flake.svg");
  flake.setAttribute("class", "flake");
  flake.style.position = "absolute";

  let randPos = Math.random() * 101;
  flake.style.left = randPos + "%";

  let randSize = Math.random() * 0.5;
  flake.setAttribute("width", randSize + "%");

  document.body.appendChild(flake);

  drift(flake, 9000, 900);
}

//make the snow continue to fall here
let snowFall = setInterval(function () {
  let flake = document.createElement("img");
  flake.setAttribute("src", "flake.svg");
  flake.setAttribute("class", "flake");
  flake.style.position = "absolute";

  let randPos = Math.random() * 101;
  flake.style.left = randPos + "%";
  flake.style.top = "-2%";

  let randSize = Math.random() * 0.3;
  flake.setAttribute("width", randSize + "%");

  document.body.appendChild(flake);

  drift(flake, 2000, 200);
}, 35); //Set how fast new snowflakes should spawn

function drift(element, speedX, speedY) {
  //variables
  let randomRotation = Math.floor(Math.random() * 150);
  let endRotation = Math.floor(Math.random() * 100);

  let endPositionX = Math.floor(Math.random() * speedX + 500);
  let endPositionY = Math.floor(Math.random() * speedY + 100);

  let keyframes = [
    {
      transform:
        "rotate(" + randomRotation + "deg) translateX(0%) translateY(0%)",
    },
    {
      transform:
        "rotate(" +
        endRotation +
        "deg) translateX(" +
        endPositionX +
        "%) translateY(" +
        endPositionY +
        "%)",
    },
  ];

  let options = {
    duration: 3000,
    iterations: 1,
    fill: "forwards",
    easing: "ease",
  };

  element.animate(keyframes, options);

  let elementeRef = element;

  slowDescent(element);
}

function slowDescent(element) {
  let keyframes = [
    {
      transform:
        "rotate(0deg) translateX(" +
        element.style.translateY +
        ") translateY(" +
        element.style.translateY +
        ")",
    },
    {
      transform: "rotate(100deg) translateX(15000%) translateY(15000%)",
    },
  ];

  let options = {
    duration: 9000,
    delay: 1000,
    iterations: 1,
    fill: "forwards",
    easing: "ease",
  };
  element.animate(keyframes, options);

  landingAnimation(element);
  fadeOut(element);
}

function landingAnimation(element) {
  let keyframes = [
    {
      transform:
        "rotate(0deg) translateX(" +
        element.style.translateY +
        ") translateY(" +
        element.style.translateY +
        ")",
      opacity: 1,
    },
    {
      transform: "rotate(100deg) translateX(150000%) translateY(150000%)",
      opacity: 0,
    },
  ];

  let options = {
    duration: 70000,
    delay: 4000,
    iterations: 1,
    fill: "forwards",
    easing: "ease",
  };
  element.animate(keyframes, options);
}

function fadeOut(element) {
  let keyframes = [
    {
      opacity: 1,
    },
    {
      opacity: 0,
    },
  ];

  let options = {
    duration: 5000,
    delay: 6000,
    iterations: 1,
    fill: "forwards",
    easing: "ease",
  };
  element.animate(keyframes, options);
  setTimeout(function () {
    element.remove();
  }, 13000);
}
