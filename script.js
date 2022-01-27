const passPlace = document.querySelector(".pass");
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  var passfather = require("passfather");
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let password = passfather({
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: false, // Disable symbols
    length: Math.ceil(getRandomArbitrary(7, 12)),
  });
  passPlace.innerHTML = "";
  passPlace.innerHTML = password;
});

// код написан при помощи библиотек passfather и browserify
