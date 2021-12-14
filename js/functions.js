function loadDoc(num, searchValue) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const jsonData = JSON.parse(xhttp.response);

      images = jsonData.photos.map((photo) => {
        return photo.src.large2x;
      });

      console.log(photoArray);

      for (let i = 0; i < images.length; ++i) {
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

        switch (columnNum) {
          case 1:
            columnOne.appendChild(contentColumns);
            photoArray.push(images[i]);
            columnNum++;
            break;
          case 2:
            columnTwo.appendChild(contentColumns);
            photoArray.push(images[i]);
            columnNum++;
            break;
          case 3:
            columnThree.appendChild(contentColumns);
            photoArray.push(images[i]);
            columnNum++;
            break;
          case 4:
            columnFour.appendChild(contentColumns);
            photoArray.push(images[i]);
            columnNum = 1;
            break;
        }
      }

      /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            ATTACHING EVENT LISTENERS TO & INSERTING ACTUAL PHOTOS
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

      const imgObject = document.querySelectorAll("img");

      imgObject.forEach((img) => {
        if (img.classList.length === 0) {
          img.addEventListener("click", () => {
            document.querySelector("#image-preview-outside-container").style = "visibility: visible";

            selectedImage = img.attributes[0].value;

            imageContainer.innerHTML = `
            <img class='preview-image' src='${selectedImage}' alt='photo'/>
            `;

            previewImageSelection = document.querySelector(".preview-image");

            magnifyPreviewImage(previewImageSelection);
            disableScroll();
            console.log(photoArray);
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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                SCROLL TOGGLE FUNCTIONALITY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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
        TO DISABLE SCROLL WHILE PREVIEW IMAGE IS VISIBLE
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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            CYCLING THROUGH PHOTO ARRAY WITH PREVIEW IMAGE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

function imageCycle() {
  photoArray.forEach((photo, index) => {
    if (photo === selectedImage) {
      selectedImage = index;
    }
  });
}

function cycleLeft(target) {
  if (target.classList[1] === "left-arrow") {
    if (selectedImage > 0) {
      selectedImage--;
      imageContainer.innerHTML = `
              <img class='preview-image' src='${photoArray[selectedImage]}' alt='photo'/>
              `;

      previewImageSelection = document.querySelector(".preview-image");

      magnifyPreviewImage(previewImageSelection);
    }
  }
}

function cycleRight(target) {
  if (target.classList[1] === "right-arrow") {
    if (selectedImage < photoArray.length - 1) {
      selectedImage++;
      imageContainer.innerHTML = `
              <img class='preview-image' src='${photoArray[selectedImage]}' alt='photo'/>
              `;

      previewImageSelection = document.querySelector(".preview-image");

      magnifyPreviewImage(previewImageSelection);
    }
  }
}

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                  MAGNIFYING TOOL FOR PREVIEW IMAGE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
function magnifyPreviewImage(element) {
  element.addEventListener("click", (e) => {
    let currentPhotoClass = e.currentTarget.attributes[0].value;
    let currentPhotoSrc = e.currentTarget.attributes[1].value;

    console.log(currentPhotoClass, currentPhotoSrc);

    function magnify(imageClass, zoom) {
      var img,
        glass,
        width,
        height,
        i = 2;

      img = document.querySelector("." + imageClass);
      console.log(img);

      /*create magnifier glass:*/
      glass = document.createElement("div");
      glass.setAttribute("class", "img-magnifier-glass");
      glass.style.display = "flex";
      glass.addEventListener("click", (e) => {
        glass.style.display = "none";
      });

      /*insert magnifier glass:*/
      img.parentElement.insertBefore(glass, img);

      /*set background properties for the magnifier glass:*/
      glass.style.backgroundImage = "url('" + img.src + "')";
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize = img.width * zoom + "px " + img.height * zoom + "px";
      width = glass.offsetWidth / 2;
      height = glass.offsetHeight / 2;

      /*execute a function when someone moves the magnifier glass over the image:*/
      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);

      function moveMagnifier(e) {
        var pos, x, y;

        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();

        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.width - width / zoom) {
          x = img.width - width / zoom;
        }
        if (x < width / zoom) {
          x = width / zoom;
        }
        if (y > img.height - height / zoom) {
          y = img.height - height / zoom;
        }
        if (y < height / zoom) {
          y = height / zoom;
        }

        /*set the position of the magnifier glass:*/
        glass.style.left = x - width + "px";
        glass.style.top = y - height + "px";

        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition = "-" + (x * zoom - width) + "px -" + (y * zoom - height) + "px";
      }
      function getCursorPos(e) {
        var a,
          x = 0,
          y = 0;
        e = e || window.event;

        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();

        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;

        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }
    }
    magnify(currentPhotoClass, 3);
  });
}
