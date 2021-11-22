function loadDoc(num, searchValue) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //   console.log(JSON.parse(xhttp.response));

      const jsonData = JSON.parse(xhttp.response);
      console.log(jsonData);

      const images = jsonData.photos.map((photo) => {
        return photo.src.large2x;
      });

      for (let i = 0; i < 10; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
               <img srcset="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData.photos[i].src.tiny});'></div>
                      <p>${jsonData.photos[i].photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' srcset="images/plus.svg"/>
                      <img class='heart' srcset='images/heart.svg'/>
                      <img class='checkmark' srcset='images/checkmark.svg'/>
                  </div>
                  </div>
                  
                `;
        columnOne.appendChild(contentColumns);
      }

      for (let i = 10; i < 20; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
                <img srcset="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData.photos[i].src.tiny});'></div>
                      <p>${jsonData.photos[i].photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' srcset="images/plus.svg"/>
                      <img class='heart' srcset='images/heart.svg'/>
                      <img class='checkmark' srcset='images/checkmark.svg'/>
                  </div>
                </div>
                  
              `;
        columnTwo.appendChild(contentColumns);
      }

      for (let i = 20; i < 30; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
                <img srcset="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData.photos[i].src.tiny});'></div>
                      <p>${jsonData.photos[i].photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' srcset="images/plus.svg"/>
                      <img class='heart' srcset='images/heart.svg'/>
                      <img class='checkmark' srcset='images/checkmark.svg'/>
                      
                  </div>
                  
               </div>
               
              `;
        columnThree.appendChild(contentColumns);
      }

      for (let i = 30; i < 40; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
                <img class='main-image' srcset="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData.photos[i].src.tiny});'></div>
                      <p class='author'>${jsonData.photos[i].photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' srcset="images/plus.svg"/>
                      <img class='heart' srcset='images/heart.svg'/>
                      <img class='checkmark' srcset='images/checkmark.svg'/>
                  </div>
                  
               </div>
               
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
  colSelector.forEach((col) => {
    for (let i = 0; i < col.children.length; ++i) {
      col.children[i].innerHTML = ``;
    }
  });

  colSelector.forEach((col) => {
    for (let i = 0; i < col.children.length; ++i) {
      if (col.children[i].innerHTML === ``) {
        col.children[i].style = "display: none";
      }
    }
  });
}

function toggleConditional() {
  if (toggle.checked === true) {
    scrollTop = document.documentElement.scrollTop;

    console.log(scrollTop);
    for (let col of colSelector) {
      col.classList.add("columns-overflow");
      col.classList.remove("columns");
      setTimeout(() => {
        col.scrollTop = scrollTop - 606;
      }, 1);
    }

    columnContainer.classList.add("column-container-overflow");
    columnContainer.classList.remove("column-container");
  } else {
    console.log(scrollTop);

    setTimeout(() => {
      document.body.parentElement.scrollTop = scrollTop;
    }, 1);
    console.log(scrollTop);
    for (let col of colSelector) {
      col.classList.remove("columns-overflow");
      col.classList.add("columns");
    }

    columnContainer.classList.add("column-container");
    columnContainer.classList.remove("column-container-overflow");
  }
}
