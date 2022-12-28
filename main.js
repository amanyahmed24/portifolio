let landing = document.querySelector(".landing");
let settings = document.querySelector(".setting-box");
let gearBox = document.querySelector(".setting-box .toggle");

//change background 

let backgroundOption = true;
let randomImg;

let imgArr = ["01" , "02" , "03"];
let index = 1;
function randomizeImgs(){
    if(backgroundOption== true){
        randomImg = setInterval(() => {
            landing.style.cssText = `background-image: url("images/${imgArr[index]}.jpg");`
            index++
            if (index==3){
                index=0
                }
        },5000);
    }
}
randomizeImgs();
// setting box
// color option

let opend = false;
gearBox.onclick = function(){
    
        settings.classList.toggle("opend");
        opend = true;
    document.querySelector(".toggle i").classList.toggle("fa-spin");
};
// choose your fav color 
let colorsLi = document.querySelectorAll(".color-options li");

//check if is it local storage color
if(localStorage.color){
    document.documentElement.style.setProperty("--main-color",localStorage.color);
    colorsLi.forEach( (e)=>{
            e.classList.remove("active")
            if(e.dataset.color==localStorage.color){
                e.classList.add("active");
            }
    });
}

colorsLi.forEach(li => {
    li.addEventListener("click" , function(){
        document.documentElement.style.setProperty("--main-color",li.dataset.color);
        localStorage.setItem("color",li.dataset.color);
        colorsLi.forEach( (e)=>{
            e.classList.remove("active")
        });
        li.classList.add("active")
    } 
    )
});

// random background option

let randomBackground = document.querySelectorAll(".setting-box .random-background span");

if(localStorage.randomBackgroundLocal){
    randomBackground.forEach((e)=>{
        e.classList.remove("active")
        if(e.dataset.random === localStorage.randomBackgroundLocal){
            e.classList.add("active")
        }
    } );
    if(localStorage.randomBackgroundLocal=="yes"){
        backgroundOption=true;
        randomizeImgs();
    }else{
        backgroundOption=false;
        clearInterval(randomImg);

    }
};

randomBackground.forEach(span => {
    span.addEventListener("click" , function(){
        
        randomBackground.forEach( (e)=>{
            e.classList.remove("active")
        });
        span.classList.add("active")

        if(span.dataset.random=="yes"){
            backgroundOption = true;
            randomizeImgs();
        }else{
            backgroundOption = false;
            clearInterval(randomImg);
        }
        localStorage.setItem("randomBackgroundLocal" , span.dataset.random);
        
    } 
    )
});

// show bullets option

let showBulletsOption = document.querySelectorAll(".show-bullets span");
let bulletsContainer = document.querySelector(".bullets-nav");

if(localStorage.showbullets){
    showBulletsOption.forEach( (e)=>{
        e.classList.remove("active");
        if(e.dataset.display==localStorage.showbullets){
            e.classList.add("active")
        }
    })
    if(localStorage.showbullets=="yes"){
        bulletsContainer.style,display="block"
    }else{
        bulletsContainer.style.display="none"
    }
}
showBulletsOption.forEach( (span)=>{
    span.addEventListener("click" , ()=>{
        showBulletsOption.forEach( (e)=>{
            e.classList.remove("active")
        })
        span.classList.add("active")
        if(span.dataset.display === "no"){
            bulletsContainer.style.display = "none"
        }else{
            bulletsContainer.style.display = "block"
        }
        localStorage.setItem("showbullets" , span.dataset.display)
    })
})

// reset btn
let resetBtn = document.querySelector(".setting-box .reset");
resetBtn.onclick = function(){
    localStorage.clear();
    window.location.reload();
}
 
//end setting box

//start toggel menue for small screens

let toggelMenue = document.querySelector(".toggel");
let tggelIcon = document.querySelector(".toggel i ");
let menue = document.querySelector(".menue");
toggelMenue.addEventListener("click", ()=>{
    toggelMenue.classList.toggle("active-toggel");
    if(menue.style.display=="block"){
        menue.style.display="none"
    }else{
        menue.style.display="block"
    }
});
    document.addEventListener("click", (e)=> {
        if(e.target!=toggelMenue && e.target!=tggelIcon){
            menue.style.display="none"
            toggelMenue.classList.remove("active-toggel")
        }
    })



// our skills section
//increase progress in scrolling
let skillSection = document.querySelector(".skills");
// console.log(skillSection.offsetTop)

window.onscroll = function(){
    if(window.pageYOffset >= skillSection.offsetTop + skillSection.offsetHeight - window.innerHeight){
        let skills = document.querySelectorAll(".skill-box .skill-progress span");
        skills.forEach( span => {
            span.style.width = span.dataset.progress
        })
    }
};

// our gallery section
let closeBtn = document.createElement("div");
let galleryImgs = document.querySelectorAll(".gallery img");
galleryImgs.forEach( img => {
    img.addEventListener("click" , ()=>{
        //create overlay on body to make opacity
        let popupoverlay = document.createElement("div");
        popupoverlay.className="popup-overlay";
        document.body.appendChild(popupoverlay);

        //create popup img
        let popup = document.createElement("div");
        popup.className="popup";
        
        //create close button
        
        closeBtn.className=("close-btn");
        let closetxt = document.createTextNode("X");
        closeBtn.appendChild(closetxt);
        popup.appendChild(closeBtn);

        //create heading for img
        let heading = document.createElement("h3");
        heading.className = "img-heading";

        if(img.alt){
            headingtxt = document.createTextNode(img.alt);
            heading.appendChild(headingtxt);
            popup.appendChild(heading);
        }

        // create img
        let popimg = document.createElement("img")
        popimg.src = img.src;

        popup.append(popimg);
        document.body.appendChild(popup);
    })
});

 //close popup
 closeBtn.addEventListener("click" , function(){
        closeBtn.textContent=""
        closeBtn.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    
 });

 //bullets navbar
 let bulletsNav = document.querySelectorAll(".bullets-nav .bullet");
 bulletsNav.forEach( (bullet)=> {
    bullet.addEventListener("click" , (e)=> {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:"smooth"
        })
    })
 })
