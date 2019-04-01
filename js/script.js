// mustache template-carousel-cells
var templateCarouselCells = document.getElementById("template-carousel-cells")
  .innerHTML;
Mustache.parse(templateCarouselCells);

var generatedCarouselCells = "";

for (var i = 0; i < carouselCells.length; i++) {
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
  for (let i = 0; i < carouselCells.length; i++) {
    markers[i] = new google.maps.Marker({
      position: carouselCells[i].coords,
      map: map
    });
    markers[i].addListener("click", function() {
      flkty.select(i);
    });
  }
  // changingslide centers a different marker
  flkty.on("change", function(index) {
    smoothPanAndZoom(map, 12, carouselCells[index].coords);
  });

  var smoothPanAndZoom = function(map, zoom, coords) {
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom - 1);
    jumpZoom = Math.max(jumpZoom, 3);

    smoothZoom(map, jumpZoom, function() {
      smoothPan(map, coords, function() {
        smoothZoom(map, zoom);
      });
    });
  };

  var smoothZoom = function(map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);

    // Jeśli steps == 0, czyli startingZoom == zoom
    if (!steps) {
      // Jeśli podano trzeci argument
      if (callback) {
        // Wywołaj funkcję podaną jako trzeci argument.
        callback();
      }
      return;
    }

    var stepChange = -(startingZoom - zoom) / steps;

    var i = 0;
    // Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
    var timer = window.setInterval(function() {
      // Jeśli wykonano odpowiednią liczbę kroków
      if (++i >= steps) {
        // Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
        window.clearInterval(timer);
        // Jeśli podano trzeci argument
        if (callback) {
          // Wykonaj funkcję podaną jako trzeci argument
          callback();
        }
      }
      map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
  };

  var smoothPan = function(map, coords, callback) {
    var mapCenter = map.getCenter();
    coords = new google.maps.LatLng(coords);

    var steps = 12;
    var panStep = {
      lat: (coords.lat() - mapCenter.lat()) / steps,
      lng: (coords.lng() - mapCenter.lng()) / steps
    };

    var i = 0;
    var timer = window.setInterval(function() {
      if (++i >= steps) {
        window.clearInterval(timer);
        if (callback) callback();
      }
      map.panTo({
        lat: mapCenter.lat() + panStep.lat * i,
        lng: mapCenter.lng() + panStep.lng * i
      });
    }, 1000 / 30);
  };
};
