let hr = document.getElementById("hour");
let min = document.getElementById("minutes");
let sec = document.getElementById("seconds");
let ampm = document.getElementById("ampm");

function updateClock(){
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let amPm = "AM";

    if(h>12){
        h=h-12;
        amPm="PM";
    }


    h = (h < 10) ? "0" + h : h; // add zero in front of single digit hours
    m = (m < 10) ? "0" + m : m; // add zero in front of single digit minutes 
    s = (s < 10) ? "0" + s : s; // add zero in front of single digit seconds
    
    hr.innerText=h;
    min.innerText=m;
    sec.innerText=s;
    ampm.innerText=amPm;

    setTimeout(() => {
        updateClock()
    }, 1000);
}

updateClock();