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
  // The location of Uluru
  var uluru = { lat: 50.185701, lng: 18.637446 };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: uluru
  });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({ position: uluru, map: map });
};
