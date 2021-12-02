function loadDoc(num, searchValue) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const jsonData = JSON.parse(xhttp.response);

      console.log(jsonData.photos.length);

      let numOfPhotosReturned = jsonData.photos.length;

      const images = jsonData.photos.map((photo) => {
        return photo.src.large2x;
      });

      let distribution = numOfPhotosReturned / columns.length;

      console.log(distribution, images);

      for (let i = 0; i < 10; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
               <img src="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData?.photos[i]?.src?.tiny});'></div>
                      <p>${jsonData?.photos[i]?.photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' src="images/plus.svg"/>
                      <img class='heart' src='images/heart.svg'/>
                      <img class='checkmark' src='images/checkmark.svg'/>
                  </div>
                  </div>
                  
                `;
        columnOne.appendChild(contentColumns);
      }

      for (let i = 10; i < 20; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
                <img src="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData?.photos[i]?.src?.tiny});'></div>
                      <p>${jsonData?.photos[i]?.photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' src="images/plus.svg"/>
                      <img class='heart' src='images/heart.svg'/>
                      <img class='checkmark' src='images/checkmark.svg'/>
                  </div>
                </div>
                  
              `;
        columnTwo.appendChild(contentColumns);
      }

      for (let i = 20; i < 30; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
                <img src="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData?.photos[i]?.src?.tiny});'></div>
                      <p>${jsonData?.photos[i]?.photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' src="images/plus.svg"/>
                      <img class='heart' src='images/heart.svg'/>
                      <img class='checkmark' src='images/checkmark.svg'/>
                      
                  </div>
                  
               </div>
               
              `;
        columnThree.appendChild(contentColumns);
      }

      for (let i = 30; i < 40; ++i) {
        const contentColumns = document.createElement("div");
        contentColumns.classList.add("content-columns");

        contentColumns.innerHTML = `
                <img src="${images[i]}" alt='photo'/>
               <div class='art-info'>
                  <div class='author-container'>
                      <div class='thumbnail' style='background-image:url(${jsonData?.photos[i]?.src?.tiny});'></div>
                      <p class='author'>${jsonData?.photos[i]?.photographer}</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus' src="images/plus.svg"/>
                      <img class='heart' src='images/heart.svg'/>
                      <img class='checkmark' src='images/checkmark.svg'/>
                  </div>
                  
               </div>
               
              `;

        columnFour.appendChild(contentColumns);
      }

      /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            ATTACHING EVENT LISTENERS TO & INSERTING ACTUAL PHOTOS
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

      const imgObject = document.querySelectorAll("img");

      imgObject.forEach((img) => {
        if (img.classList.length === 0) {
          img.addEventListener("click", () => {
            document.querySelector("#image-preview-outside-container").style = "visibility: visible";

            let selectedImage = img.attributes[0].value;

            imageContainer.innerHTML = `
            <img class='preview-image' src='${selectedImage}' alt='photo'/>
            `;

            disableScroll();
            buildPhotoArray();
          });
        }
      });
    }
  };
  xhttp.open(`GET`, `https://api.pexels.com/v1/search?query=${searchValue}&page=${num}&per_page=40`);
  xhttp.setRequestHeader("Authorization", "563492ad6f91700001000001454c20d88af2459abf5037ee55de9795");
  xhttp.send();
}

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        ELIMINATING OLD LIVE DIVS FROM LAYOUT
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
CREATING PHOTO ARRAY TO HORIZONTALLY MOVE THROUGH WITHIN IMAGE PREVIEW
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

function buildPhotoArray() {
  photoArray = [];

  for (let numOfImages = 0; numOfImages < columnOne.children.length; numOfImages++) {
    if (columnOne.childNodes[numOfImages].innerHTML !== "" && columnTwo.childNodes[numOfImages].innerHTML !== "" && columnThree.childNodes[numOfImages].innerHTML !== "" && columnFour.childNodes[numOfImages].innerHTML !== "") {
      photoArray.push(columnOne.children[numOfImages].children[0].attributes[0].value, columnTwo.children[numOfImages].children[0].attributes[0].value, columnThree.children[numOfImages].children[0].attributes[0].value, columnFour.children[numOfImages].children[0].attributes[0].value);
    }
  }
  console.log(photoArray);
}

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                SCROLL TOGGLE FUNCTIONALITY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        TO DISABLE SCROLL WHILE IMAGE PREVIEW IS VISIBLE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false);
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
  window.addEventListener("touchmove", preventDefault, wheelOpt);
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

// function notEnough () {
//   if()
// }
