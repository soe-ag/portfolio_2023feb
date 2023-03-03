let i = 0;
let j = 0;
let text1 = "SOE AUNG";
let text2 = "FRONTEND DEVELOPER";
let speed = 180;

setTimeout(typeWriter, 3000);
function typeWriter() {
  if (i < text1.length) {
    document.getElementById("typeout1").innerHTML += text1.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

setTimeout(typeWriter2, 5000);
function typeWriter2() {
  if (j < text2.length) {
    document.getElementById("typeout2").innerHTML += text2.charAt(j);
    j++;
    setTimeout(typeWriter2, speed);
  }
}

setTimeout(addclass, 6500);
function addclass() {
  document.getElementById("iconleft").classList.add("fromleft");
  document.getElementById("iconright").classList.add("fromright");
  // console.log("sadf");
}



// --for loading screen
let timer;

function loading() {
  timer = setTimeout(showPage, 500);
  console.log(timer);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("wholediv").style.display = "block";
}


// --for dark mode toggle
function toggle1(){
  const lightToggle = document.getElementById("light");
  const darkToggle = document.getElementById("dark");
  // const all = document.getElementById("body");
  const navItem = document.getElementsByClassName("c-nav__link");
  const topAbout = document.getElementById("topAbout");
  const wholediv = document.getElementById("wholediv");

  const body = document.querySelector("body");
  const top = document.getElementById("top");
  const about = document.getElementById("about");
  const skills = document.getElementById("skills");
  const works = document.getElementById("works");
  const contact = document.getElementById("contact");

  // console.log(navItem);
  if(lightToggle.style.display === "block"){
    darkToggle.style.display = "block";
    lightToggle.style.display ="none";
    // all.classList.add("darkmode")
    for (let i = 0; i < navItem.length; i++) {
      navItem[i].classList.add("dark")
    }
    body.style.backgroundImage = "none";
    top.style.backgroundColor = "var(--dark1)";
    about.style.backgroundColor = "var(--dark1)";
    skills.style.backgroundColor = "var(--dark1)";
    works.style.backgroundColor = "var(--dark1)";
    contact.style.backgroundColor = "var(--dark1)";

    topAbout.classList.remove("topABout")
    wholediv.classList.add("dark");
  }
  else{
    lightToggle.style.display = "block";
    darkToggle.style.display = "none";
    // all.classList.remove("darkmode")
    for (let i = 0; i < navItem.length; i++) {
      navItem[i].classList.remove("dark");
    }

    top.style.backgroundColor = "none";
    about.style.backgroundColor = "none";
    skills.style.backgroundColor = "none";
    works.style.backgroundColor = "none";
    contact.style.backgroundColor = "none";

    topAbout.classList.add("topABout");
    
  }
}

function toggle(){
  const lightToggle = document.getElementById("light");
  const darkToggle = document.getElementById("dark");
  const body = document.querySelector("body");
  const font = document.querySelectorAll("div")

  const topAbout = document.getElementById("topAbout");
  const skillsWorks = document.getElementById("skillsWorks");
  const worksContact = document.getElementById("worksContact");

  const arrowNext = document.querySelector("swiper-button-next");
  const arrowPrev = document.querySelector("swiper-button-prev");
  // const bulletActive = document.getElementsByClassName("swiper-pagination-bullet-active");

  if(lightToggle.style.display === "block"){
    darkToggle.style.display = "block";
    lightToggle.style.display = "none";

    for (let i = 0; i < font.length; i++) {
      font[i].style.color = "var(--white)";
    }

    body.style.backgroundImage = "none";
    topAbout.style.backgroundImage = "none";
    skillsWorks.style.backgroundImage = "none";
    worksContact.style.backgroundImage = "none";

    // for (let i = 0; i < bullet.length; i++) {
    //   bullet[i].style.backgroundColor = "var(--white)";
    // }

    // bulletActive.style.backgroundColor = "var(--yellow)";
    arrowNext.style.color = "var(--yellow) !important";
    arrowPrev.style.color = "var(--yellow) !important";

  }
  else{
    lightToggle.style.display = "block";
    darkToggle.style.display = "none";

    for (let i = 0; i < font.length; i++) {
      font[i].style.color = "var(--dark)";
    }

    body.style.backgroundImage ="url(assets/img/pc/blurry-gradient-haikei.png)";
    topAbout.style.backgroundImage = "url(assets/img/pc/stacked-waves-haikei2.svg)";
    skillsWorks.style.backgroundImage = "url(assets/img/pc/blob-haikei.svg)";
    worksContact.style.backgroundImage = "url(assets/img/pc/wave-haikeib.svg)";

    // for (let i = 0; i < bullet.length; i++) {
    //   bullet[i].style.backgroundColor = "var(--dark)";
    // }

    //     bulletActive.style.backgroundColor = "var(--yellow)";

  }

}

