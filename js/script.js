// carousel
var flickityCarousel = document.querySelector(".carousel");
var flkty = new Flickity(flickityCarousel, {
  pageDots: false,
  hash: true
});

//reset button
var resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", function() {
  flkty.select(0);
});

// progress bar
var progressBar = document.querySelector(".progress-bar");
flkty.on("scroll", function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + "%";
});
