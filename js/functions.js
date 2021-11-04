function loadDoc(num, searchValue) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //   console.log(JSON.parse(xhttp.response));

      const jsonData = JSON.parse(xhttp.response);

      const images = jsonData.photos.map((photo) => {
        return photo.src.large2x;
      });

      for (let i = 0; i < 10; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
                <img srcset="${images[i]}" alt='photo'/>
                `;
        columnOne.appendChild(contentColumns);
      }

      for (let i = 10; i < 20; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
              <img srcset="${images[i]}" alt='photo'/>
              `;
        columnTwo.appendChild(contentColumns);
      }

      for (let i = 20; i < 30; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
              <img srcset="${images[i]}" alt='photo'/>
              `;
        columnThree.appendChild(contentColumns);
      }

      for (let i = 30; i < 40; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
              <img srcset="${images[i]}" alt='photo'/>
              `;
        columnFour.appendChild(contentColumns);
      }
    }
  };
  xhttp.open(`GET`, `https://api.pexels.com/v1/search?query=${searchValue}&page=${num}&per_page=40`);
  xhttp.setRequestHeader("Authorization", "563492ad6f91700001000001454c20d88af2459abf5037ee55de9795");
  xhttp.send();
}

function columnReload() {
  columns.forEach((col) => {
    for (let i = 0; i < col.children.length; ++i) {
      col.children[i].innerHTML = ``;
    }
  });

  columns.forEach((col) => {
    for (let i = 0; i < col.children.length; ++i) {
      if (col.children[i].innerHTML === ``) {
        col.children[i].style = "display: none";
      }
    }
  });
}
