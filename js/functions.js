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

function toggleConditional() {
  console.log(mouseoverCurrentTarget);
  if ((toggle.checked === true && Math.sign(wheelDeltaY) === 1) || Math.sign(wheelDeltaY) === -1) {
    console.log(scrollTopArray.length);

    if (scrollTopArray.length < 3) {
      scrollTopArray.push(document.querySelector("." + mouseoverCurrentTarget).scrollTop);
    }
    if (scrollTopArray.length === 3) {
      scrollTopArray.shift();
    }

    console.log(scrollTopArray);

    let amountScrolled = scrollTopArray[1] - scrollTopArray[0];

    switch (mouseoverCurrentTarget) {
      case "column-one":
        columnTwo.scrollTop = amountScrolled + columnTwo.scrollTop;
        columnThree.scrollTop = amountScrolled + columnThree.scrollTop;
        columnFour.scrollTop = amountScrolled + columnFour.scrollTop;
        break;

      case "column-two":
        columnOne.scrollTop = amountScrolled + columnOne.scrollTop;
        columnThree.scrollTop = amountScrolled + columnThree.scrollTop;
        columnFour.scrollTop = amountScrolled + columnFour.scrollTop;
        break;

      case "column-three":
        columnOne.scrollTop = amountScrolled + columnOne.scrollTop;
        columnTwo.scrollTop = amountScrolled + columnTwo.scrollTop;
        columnFour.scrollTop = amountScrolled + columnFour.scrollTop;
        break;

      case "column-four":
        console.log("do i work", amountScrolled);
        columnOne.scrollTop = amountScrolled + columnOne.scrollTop;
        columnTwo.scrollTop = amountScrolled + columnTwo.scrollTop;
        columnThree.scrollTop = amountScrolled + columnThree.scrollTop;
        break;
    }
  }
}

function columnsEvent() {
  for (let col of columns) {
    col.addEventListener("wheel", (e) => {
      wheelDeltaY = e.deltaY;

      toggleConditional();
    });
    col.addEventListener("mouseover", (e) => {
      mouseoverCurrentTarget = e.currentTarget.classList[1];

      toggleConditional();
    });
  }
}

// scrollTopArray = [];
// console.log(scrollTopArray);
// console.log(columnOne.scrollTop, columnTwo.scrollTop, columnThree.scrollTop);
// columnFour.removeEventListener("wheel", columnFourEvent, true);
