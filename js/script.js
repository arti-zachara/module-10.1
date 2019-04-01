// mustache template-carousel-cells
var templateCarouselCells = document.getElementById("template-carousel-cells")
  .innerHTML;
Mustache.parse(templateCarouselCells);

var generatedCarouselCells = "";

for (var i = 0; i < carouselCells.length; i++) {
  console.log(carouselCells);
  generatedCarouselCells += Mustache.render(
    templateCarouselCells,
    carouselCells[i]
  );
}

// insert generated html code to carousel
var flickityCarousel = document.querySelector(".carousel");

flickityCarousel.insertAdjacentHTML("beforeend", generatedCarouselCells);

// carousel
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

// google maps declaration
window.initMap = function() {
  // The map, centered at first carousel slide location
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: carouselCells[0].coords
  });

  // adding markers
  var markers = [];
  for (var i = 0; i < carouselCells.length; i++) {
    markers[i] = new google.maps.Marker({
      position: carouselCells[i].coords,
      map: map
    });
  }
};
