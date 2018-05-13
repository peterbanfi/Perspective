"use strict";
let num = 0;
let num2 = 0;
let xPrev = 0;
let yPrev = 0;
let posArr = [];
let posArrY = [];
let coordinates = {
    'xLeft': 0,
    'xRight': 0,
    'yBottom': 0,
    'yTop': 0
}

function showCoords(event, area) {
    let x = event.clientX;
    let y = event.clientY;
    let coords = "X coord: " + x + ", Y coord: " + y;
    document.getElementById('coords').innerHTML = coords;
    let blue = document.getElementById(area);

    getCoords(x, y);

    /* megnézi, hogy az egér, a kép fölött van-e */
    if (x > coordinates.xLeft && x < coordinates.xRight && y < coordinates.yBottom && y > coordinates.yTop) {
        if (x > xPrev) {
            blue.style.transform = `rotateX(${num2}deg) rotateY(${num}deg)`;
            num++;
            xPrev = x;
        }
        if (x < xPrev) {
            blue.style.transform = `rotateX(${num2}deg) rotateY(${num}deg)`;
            num--;
            xPrev = x;
        }
        if (y > yPrev) {
            blue.style.transform = `rotateX(${num2}deg) rotateY(${num}deg)`;
            num2++;
            yPrev = y;
        }
        if (y < yPrev) {
            blue.style.transform = `rotateX(${num2}deg) rotateY(${num}deg)`;
            num2--;
            yPrev = y;
        }
    }
}

/* Ez a függvény lenullázza az értékeket, így default pozícióba állítva a képeket */
function resetPos(area) {
    let blue = document.getElementById(area);
    blue.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
    num = 0;
    num2 = 0;
    coordinates = {
        'xLeft': 0,
        'xRight': 0,
        'yBottom': 0,
        'yTop': 0
    }
}

/**
 * 
 * @param {1} x - X tengely koorinátái 
 * @param {2} y - Y tengely koordinátái
 * a függvény megkeresi az adott terület legnagyobb, és legkisebb X/Y koordinátáit, és ezzel tölti fel a 
 * coordinates objektumot. Ezáltal, bárhol lehet a képernyőn a mozgatni kívánt terület.
 */
function getCoords(x, y) {
    posArr.push(x);
    posArrY.push(y);
    coordinates.xLeft = Math.min(...posArr);
    coordinates.xRight = Math.max(...posArr);
    coordinates.yBottom = Math.max(...posArrY);
    coordinates.yTop = Math.min(...posArrY);
}


/* 3D box */
let box = document.querySelector('.box');
let radioGroup = document.querySelector('.radio-group');
let currentClass = '';

function changeSide() {
    let checkedRadio = radioGroup.querySelector(':checked');
    let showClass = 'show-' + checkedRadio.value;
    if (currentClass) {
        box.classList.remove(currentClass);
    }
    box.classList.add(showClass);
    currentClass = showClass;
}
// set initial side
changeSide();

radioGroup.addEventListener('change', changeSide);