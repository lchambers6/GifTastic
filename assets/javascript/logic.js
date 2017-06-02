$(document).ready(function() {

  var animals = ["Moose", "Zebra", "Giraffe", "Barn Owl", "Cuttlefish", "Leafy Seadragon", "Sun Bear", "Komondor Dog", "Angora Rabbit", "Red Panda", "Three Toed Sloth", "Emperor Tamarin", "White-faced Saki Monkey", "Tapir", "Hagfish", "Star-nosed Mole", "Proboscis Monkey", "Pink Fairy Armadillo", "Axolotl", "Aye-aye", "Alpaca", "Tarsier", "Dumbo Octopus", "Narwhal", "Sucker-footed Bat", "Pygmy Marmoset", "Blobfish", "Platypus", "African Shoebill", "Yeti Crab"];
  var url = [];
  function renderButtons() {
    $('#animals-view').empty();
    for (i = 0; i < animals.length; i++) {
        $('#animals-view').append('<button class="btn btn-success btn-md animal titleCase" data-name="' + animals[i] + '">' + animals[i] + '</button>');
    }

  }

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = toTitleCase($('#animal-input').val().trim());
    if (newAnimal !== "" && animals.indexOf(newAnimal) < 0) {
      animals.push(newAnimal);
      renderButtons();
    }
  });

  $("#animalGifs").on("click", "img", playGifs);

  function playGifs() {
    var urlIndex = $(this).data('number');
    if ($(this).attr("src") === url[urlIndex].move) {
      $(this).attr("src", url[urlIndex].still);
    } else {
      $(this).attr("src", url[urlIndex].move);
    }
  };


  $("#animals-view").on("click", "button", showanimal);

    function showanimal() {
      var spaceAnimal = $(this).data('name');
      var animal = (spaceAnimal).replace(' ', '+');;
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";
      
      url = [];
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        $('#animalGifs').empty();
        $('#animalGifs').html('<h1>' + spaceAnimal + ' Gifs!</h1>');
        for (i = 0; i < response.data.length; i++) {
          url.push({move:response.data[i].images.fixed_width.url, still: response.data[i].images.fixed_width_still.url});
          $('#animalGifs').append('<div class="col-xs-12 col-md-3"><p>Rating: ' + response.data[i].rating + '</p><img src="' + url[i].still + '" data-number="' + i + '" alt="' + response.Title + '"></div>');
        };
    });
  };

  renderButtons();

  function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

});