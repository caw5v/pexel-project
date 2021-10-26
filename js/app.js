// API key 563492ad6f91700001000001454c20d88af2459abf5037ee55de9795

window.onload = (e) => {
  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.response));
      }
    };
    xhttp.open("GET", "https://api.pexels.com/v1/search?query=people");
    xhttp.setRequestHeader("Authorization", "563492ad6f91700001000001454c20d88af2459abf5037ee55de9795");
    xhttp.send();
  }
  loadDoc();
};
