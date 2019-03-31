var flickityCarousel = document.querySelector(".carousel");
var flkty = new Flickity(flickityCarousel, {
  pageDots: false,
  hash: true
});

var resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", function() {
  flkty.select(0);
});
