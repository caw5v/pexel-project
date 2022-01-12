function loadDoc(num, searchValue) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      jsonData = JSON.parse(xhttp.response);

      images = jsonData.photos.map((photo) => {
        return photo.src.large;
      });

      imagesHd = jsonData.photos.map((photo) => {
        return photo.src.large2x;
      });

      originalResolution = jsonData.photos.map((photo) => {
        return photo.src.original;
      });

      document.querySelector(".hero").style.backgroundImage = `url(images/photos/pexels-ricardo-esquivel-1563256.jpeg)`;

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
            photoArrayHd.push(imagesHd[i]);
            photoArrayOriginal.push(originalResolution[i]);
            columnNum++;
            break;
          case 2:
            columnTwo.appendChild(contentColumns);
            photoArray.push(images[i]);
            photoArrayHd.push(imagesHd[i]);
            photoArrayOriginal.push(originalResolution[i]);
            columnNum++;
            break;
          case 3:
            columnThree.appendChild(contentColumns);
            photoArray.push(images[i]);
            photoArrayHd.push(imagesHd[i]);
            photoArrayOriginal.push(originalResolution[i]);
            columnNum++;
            break;
          case 4:
            columnFour.appendChild(contentColumns);
            photoArray.push(images[i]);
            photoArrayHd.push(imagesHd[i]);
            photoArrayOriginal.push(originalResolution[i]);
            columnNum = 1;
            break;
        }
      }

      console.log("original", photoArrayOriginal, "Hd", photoArrayHd, "normal", photoArray);
      /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            ATTACHING EVENT LISTENERS TO & INSERTING ACTUAL PHOTOS
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

      const imgObject = document.querySelectorAll("img");

      imgObject.forEach((img) => {
        if (img.classList.length === 0) {
          img.addEventListener("click", () => {
            document.querySelector("#image-preview-outside-container").style = "visibility: visible";

            selectedImage = img.attributes[0].value;

            let indexSelectedImage = photoArray.indexOf(selectedImage);

            imagePreviewHeader.innerHTML = `
                <div class='art-info-preview-image'>
                  <div class='author-container-preview-image'>
                      <div class='thumbnail-preview-image' style='background-image:url(${jsonData?.photos[i]?.src?.tiny});'></div>
                      <p>hello</p>
                  </div>
                  <div class='svg-container'>
                      <img class='plus-preview-image' src="images/plus.svg"/>
                      <img class='heart-preview-image' src='images/heart.svg'/>
                      <img class='checkmark-preview-image' src='images/checkmark.svg'/>
                  </div>
                  <button></button>
                  </div>
            `;

            imageContainer.innerHTML = `
            <img class='preview-image' src='${photoArrayHd[indexSelectedImage]}' alt='photo'/>
         
            `;

            previewImageSelection = document.querySelector(".preview-image");

            magnifyPreviewImage(previewImageSelection);
            disableScroll();
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
      console.log(selectedImage, "right here");
    }
  });
}

function cycleLeft(target) {
  if (target.classList[1] === "left-arrow") {
    if (selectedImage > 0) {
      selectedImage--;
      imageContainer.innerHTML = `
              <img class='preview-image' src='${photoArrayHd[selectedImage]}' alt='photo'/>
              `;

      previewImageSelection = document.querySelector(".preview-image");

      magnifyPreviewImage(previewImageSelection);
    }
  }
}

function cycleRight(target) {
  if (target.classList[1] === "right-arrow") {
    if (selectedImage < photoArrayHd.length - 1) {
      selectedImage++;
      imageContainer.innerHTML = `
              <img class='preview-image' src='${photoArrayHd[selectedImage]}' alt='photo'/>
              `;

      previewImageSelection = document.querySelector(".preview-image");

      magnifyPreviewImage(previewImageSelection);
    }
  }
}

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                  MAGNIFYING TOOL FOR PREVIEW IMAGE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

function magnifyPreviewImage(photo) {
  const imageDiv = document.querySelector(".image-container");
  const outerContainer = document.querySelector("#image-preview-inside-container");

  let distanceFromMiddleX = null;
  let distanceFromMiddleY = null;
  let middleY = null;
  let middleX = null;
  let mouseImagePositionX = null;
  let mouseImagePositionY = null;
  let zoomScale = null;
  let clicked = false;

  imageDiv.addEventListener("click", clickedImage, false);

  photo.addEventListener("mouseenter", () => {
    photo.classList.add("hover");
  });

  function clickedImage(e) {
    if (e.currentTarget.children[0].classList[1] === "hover") {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      photo.classList.add("zoom");
      photo.classList.remove("hover");

      mousePositionArray = [];

      mousePositionArray.push(mouseX);
      mousePositionArray.push(mouseY);

      console.log(mousePositionArray);

      middleY = imageDiv.clientHeight / 2;
      middleX = imageDiv.clientWidth / 2;

      mouseImagePositionX = mouseX - imageDiv.getBoundingClientRect().left;
      mouseImagePositionY = mouseY - imageDiv.getBoundingClientRect().top;

      distanceFromMiddleY = middleY - mouseImagePositionY;
      distanceFromMiddleX = middleX - mouseImagePositionX;

      zoomScale = 3;

      photo.style.top = `${distanceFromMiddleY * zoomScale}px`;
      photo.style.left = `${distanceFromMiddleX * zoomScale}px`;
      photo.style.transform = `scale(${zoomScale})`;
      photo.style.transition = ".2s all ease-in-out";

      outerContainer.addEventListener("mousemove", moving, false);

      clicked = true;
    } else {
      photo.style.top = "0";
      photo.style.left = "0";
      photo.style.transform = `scale(1)`;
      photo.style.transition = `.2s all ease-in-out`;

      photo.classList.remove("zoom");
      photo.classList.add("hover");

      outerContainer.removeEventListener("mousemove", moving, false);

      clicked = false;
    }
  }

  function moving(e) {
    if (clicked === true) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const mouseDifferenceX = mousePositionArray[0] - mouseX;
      const mouseDifferenceY = mousePositionArray[1] - mouseY;

      photo.style.transition = "none";
      photo.style.transform = `scale(${zoomScale}) translate(${mouseDifferenceX + "px"}, ${mouseDifferenceY + "px"})`;
    }
  }
}
