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
function toggle(){
  const lightToggle = document.getElementById("light");
  const darkToggle = document.getElementById("dark");
  const all = document.getElementById("body");
  const navItem = document.getElementsByClassName("c-nav__link");

  const top = document.getElementById("top");
  const about = document.getElementById("about");
  const skills = document.getElementById("skills");
  const works = document.getElementById("works");
  const contact = document.getElementById("contact");

  console.log(navItem);
  if(lightToggle.style.display === "block"){
    darkToggle.style.display = "block";
    lightToggle.style.display ="none";
    all.classList.add("darkmode")
    for (let i = 0; i < navItem.length; i++) {
      navItem[i].classList.add("dark")
    }

    top.style.backgroundColor = "var(--white)";
    about.style.backgroundColor = "var(--lightblack)";
    skills.style.backgroundColor = "var(--black)";
    works.style.backgroundColor = "var(--gray2)";
    contact.style.backgroundColor = "var(--yellow)";
  }
  else{
    lightToggle.style.display = "block";
    darkToggle.style.display = "none";
    all.classList.remove("darkmode")
    for (let i = 0; i < navItem.length; i++) {
      navItem[i].classList.remove("dark");
    }

  }
}


