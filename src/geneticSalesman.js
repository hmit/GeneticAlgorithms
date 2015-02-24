var geneticSalesman = function(genes, assessFitness, initiateBloodline, mutate, availableResources){
  var options = {
    numberOfBloodlines: 10,
    offspringPerSurvivor: 50,
  };

  /* -------------------- Complete me! -------------------- */

  // initiating bloodlines
  var bloodlines = [];
  for(var j = 0; j < options.numberOfBloodlines; j++){
    bloodlines.push(initiateBloodline(genes));
  }


  // exhaust resources
  while(availableResources > 0) {
    for(var j = 0; j < bloodlines.length; j++){    
      var survivor = bloodlines[j];
      var survivor_score = assessFitness(bloodlines[j]);
      for(var i = 0; i < options.offspringPerSurvivor; i++){
        var kid = mutate(bloodlines[j]);
        var score = assessFitness(kid);
        if(survivor_score > score){
          survivor_score = score;
          survivor = kid;
        }
      }
      bloodlines[j] = survivor;
    }
    availableResources--;
  }

  var survivor = bloodlines[0];
  var survivor_score = assessFitness(bloodlines[0]);
  for(var i = 0; i < bloodlines.length; i++){
    var score = assessFitness(bloodlines[i]);
    if(survivor_score > score){
      survivor_score = score;
      survivor = bloodlines[i];
    }
  }
  return survivor;
}

var createRoute = function(cities){
  var route = cities.slice();
  for(var i = 0; i < route.length; i++){
    var randomIndex = Math.floor(Math.random() * i);
    route[i] = route[randomIndex];
    route[randomIndex] = cities[i];
  }
  return route;
}

var alterRoute = function(route){
  var new_route = route.slice(); // copy
  var id1 = Math.floor(Math.random() * route.length);
  var id2 = Math.floor(Math.random() * route.length);
  while(id1 == id2){
    id2 = Math.floor(Math.random() * route.length);
  }
  new_route[id1] = new_route[id2];
  new_route[id2] = route[id1];
  return new_route;
}

var calculateDistance = function(route){
  var distances = route.map(function(city, index, route){
    var nextCity = route[index + 1] || route[0];
    var distance = distanceCalculator(city, nextCity);
    return distance;
  });

  return distances.reduce(function(distance1, distance2){
    return distance1 + distance2;
  });
}

