document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var dt = new Date();
  document.getElementById("datetime").innerHTML = dt.toLocaleDateString('en-US', options);

}, false);
