function randNumbers() {
  var numbers = [];

  for (var i = 0; i < 20; i += 1) {
    numbers.push(Math.random() * 50);
  }

  return numbers;
}

// setInterval(function() {
//   document.querySelectorAll(".sparkline").forEach(function(svg) {
//     sparkline.sparkline(svg, randNumbers());
//   });
// }, 1000);
