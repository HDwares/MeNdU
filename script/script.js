function openNav() {
    if (window.innerWidth<=600) {
        document.getElementById("mySidenav").style.width = "84%";
    }
    else {
        document.getElementById("mySidenav").style.width = "38%";
    }
} function closeNav(event) {
    if (event.target.className != "burgerMenu") {
        document.getElementById("mySidenav").style.width = "0px";
    }
    closeFlyout(event);
}
// Hides all elements excluding provided className
function hideAll() {
    let frames = document.getElementsByClassName("frame");
    for (let i = 0;
        i < frames.length;
        i++) {
        frames[i].style.display = "none"
    }
    return true;
}
function openPage(evt, pageName) {
    let i, tabcontent, tabLinks;
    hideAll();
    tabLinks = document.getElementsByClassName("tabLinks");
    for (let i = 0;
        i < tabLinks.length;
        i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    } document.getElementById(pageName).style.display = "block";
    document.getElementsByClassName("PageTitle")[0].innerHTML = evt.currentTarget.innerHTML;
    evt.currentTarget.className += " active";
    if (pageName === "MyWork") {
        let thumbnails = document.getElementsByClassName("thumbnail");
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].addEventListener("mousemove", (event) => {
                event.target.style.objectFit = "none";
                event.target.style.objectPosition = event.offsetX / thumbnails[i].width * 100 + "% " + event.offsetY / thumbnails[i].height * 100 + "%";
            });
            thumbnails[i].addEventListener("mouseleave", (event) => {
                event.target.style.objectFit = "cover";
                event.target.style.objectPosition = "0 0";
            });
        }
    }
    else if (pageName === "Contact") {
        createColoredShadow(document.getElementById("hdSymbol"));
        contactTiles = document.querySelectorAll("#Contact .colored-tile");
        for (let i = 0; i < contactTiles.length; i++) {
            createColoredBorder(contactTiles[i]);
        }
    }
} function modalUI(evt) {
    let modal = document.getElementById('modalUI');
    let modalCarousel = document.getElementsByClassName('modal-carousel');
    let modalDesc = document.getElementsByClassName('modal-desc')[0];
    let utility;
    let elName = evt.currentTarget.getAttribute("data-title");
    for (let i = 0; i < utilities.length; i++) {
        if (elName.trim() === utilities[i].name.trim()) {
            utility = utilities[i];
            break;
        }
    }
    let leftArrow = document.querySelector(".fa-angle-left");
    let rightArrow = document.querySelector(".fa-angle-right");
    for (let i = 0; i < utility.imgData.length; i++) {
        modalCarousel[0].innerHTML += `<img class="modal-content" src="` + 'img/' + utility.name.replace(/ /g, "_") + "/" + utility.imgData[i].fileName + `"/>`//+`" style="transform: scale(` + (utility.imgData.length-i)/utility.imgData.length + `)"/>`;
    }
    let modalCntnts = document.getElementsByClassName('modal-content');
    modalCntnts[0].classList.add("infocus");
    modalDesc.innerHTML = utility.imgData[0].description;
    let j = 0;
    let activateKey = (i) => {
        if (j === 0) {
            leftArrow.classList.add("active");
        }
        else {
            leftArrow.classList.remove("active");
        }
        if (j == utility.imgData.length - 1) {
            rightArrow.classList.add("active");
        }
        else {
            rightArrow.classList.remove("active");
        }
    }
    //Image slideshow;
    leftArrow.addEventListener("click", ()=> addFocus(utility, "leftArrow"));
    rightArrow.addEventListener("click", ()=> addFocus(utility, "rightArrow"));
    let modalTitle = document.getElementsByClassName("modalTitle");
    modal.style.display = "block";
    modalTitle[0].innerHTML = evt.currentTarget.parentElement.getElementsByTagName("h2")[0].innerHTML;
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
        modalDesc.innerHTML = "";
        modalCarousel[0].innerHTML = "";
        leftArrow.classList.add("active");
        rightArrow.classList.remove("active");
    };
    window.onkeyup = (e) =>{
        var key = e.which;
        if(key == 13 || key == 39) { // the enter key code or right arrow
          rightArrow.click();
          return false;  
        } else if(key == 37) { // left arrow
          leftArrow.click();
          return false;  
        }
      };
      function addFocus(utility, keyType){
        (keyType==="leftArrow")?j--:(keyType==="rightArrow")?j++:j;
        if (j < 0) { j = 0 }
        else if (j >= utility.imgData.length) { j = utility.imgData.length - 1 }
        if (j < utility.imgData.length && j >= 0) {
            modalCarousel[0].innerHTML = modalCarousel[0].innerHTML.replace(/ infocus/g, "");
            // for (let j=i;j>=0;j--){
            //     modalCntnts[i].style.transform= "scale("+j/i+")";
            // }
            modalCntnts[j].classList.add("infocus");
            modalDesc.innerHTML = utility.imgData[j].description;
        }
        activateKey(j);
    }
}
function crtSybl(lineColor) {
    let c = document.getElementById("linkCanvas");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 19;
    ctx.strokeStyle = lineColor;
    if (lineColor === "rgb(12,12,12)") {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.shadowColor = "none";
    } else {
        ctx.shadowColor = "rgb(140,100,160)";
        ctx.shadowBlur = 90;
    } ctx.moveTo(198, 59);
    ctx.lineTo(157, 317);
    ctx.lineTo(105, 193);
    ctx.lineTo(392, 145);
    ctx.lineTo(350, 40);
    ctx.lineTo(296, 369);
    ctx.moveTo(263, 390);
    ctx.bezierCurveTo(460, 287, 380, 256, 270, 260);
    ctx.stroke();
    return c.toDataURL();
} function createColoredShadow(element) {
    let elementBorder = event.target.style.boxShadow;
    element.addEventListener("mousemove", function (event) {
        event.target.style.boxShadow = "0px 0px 91px rgb(" + event.offsetX + ", " + (event.offsetY - event.offsetX) + ", " + (192 - event.offsetY) + ")";
        event.target.style.border = "10px solid rgb(12,12,12)";
        hdSymbol.src = light;
    });
    element.addEventListener("mouseleave", function (event) {
        event.target.style.boxShadow = "none";
        event.target.style.border = elementBorder;
        hdSymbol.src = dark;
    });
} function createColoredBorder(element) {
    let elementBackground = event.target.style.background;
    element.addEventListener("mousemove", function (event) {
        element.style.background = `linear-gradient(to right, rgb(${346-event.offsetX}, 0, ${event.offsetX}), rgb(${255-event.offsetX}, ${255-event.offsetX}, ${event.offsetX}), rgb(${event.offsetX}, ${255-event.offsetX}, ${event.offsetX}), rgb(${event.offsetX}, ${255-event.offsetX}, ${255-event.offsetX}), rgb(${event.offsetX+61}, ${event.offsetX-255}, ${191-event.offsetX}))`;
    });
    // rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 255), rgb(0, 255, 0), rgb(255, 200, 0)
    element.addEventListener("mouseleave", function (event) {
        element.style.background = elementBackground;
    });
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function crtUtilityTiles() {
    let carousel = document.getElementsByClassName("utilities")[0]
    let thumbnailImg, imgLocation;
    for (let i = 0; i < utilities.length; i++) {
        for (j = 0; j < utilities[i].imgData.length; j++) {
            if (utilities[i].imgData[j].fileName.split(".")[0].replace(/_/g, " ").trim() === utilities[i].name.trim()) {
                thumbnailImg = utilities[i].imgData[j].fileName;
                imgLocation = 'img/' + thumbnailImg.split('.')[0] + '/' + thumbnailImg;
                break;
            }
        }
        carousel.innerHTML += `<div class="utility-tile tile col-3"><img class="thumbnail" data-title="${utilities[i].name}" src="${imgLocation}" onclick="modalUI(event);">
        <i class="moreActions" title="More Actions" onclick="showFlyout(event);">...
            <div class="moreActionsFlyout">
                <a href="">facebook</a>
                <a href="">twitter</a>
                <a href="">linkedIn</a>
            </div>
        </i>
        <h2 onclick="modalUI(event);" title="${utilities[i].name}" data-title="${utilities[i].name}"><span class="primary-txt">${utilities[i].name.split(' ')[0]}</span>${utilities[i].name.replace(utilities[i].name.split(' ')[0], '')}</h2>`;
    }
}
function showFlyout(event) {
    let moreActionIcon = document.getElementsByClassName("moreActions");
    for (let i = 0; i < moreActionIcon.length; i++) {
        moreActionIcon[i].classList.remove("active");
    }
    event.currentTarget.classList.add("active");
}
function closeFlyout(event) {
    let moreActionIcon = document.getElementsByClassName("moreActions");
    if (event.target.className != "moreActions active") {
        for (let i = 0; i < moreActionIcon.length; i++) {
            moreActionIcon[i].classList.remove("active");
        }
    }
}
let pageYOffsetPlus;
const utilities = [
    {
        name: 'Solo', imgData: [
            {
                fileName: "IMG20181104155730.jpg",
                description: "At a only cool place."
            },
            {
                fileName: "Ak 20160909_194226.jpg",
                description: "Cute smile"
            },
            {
                fileName: "Solo.png",
                description: "One of the early loved posters."
            },
            {
                fileName: "u-V3_IvmxSUMdKB0RW.jpg",
                description: "Simple."
            },
            {
                fileName: "2017-02-20-10-06-35-719_1487565566892.jpg",
                description: "After hair ironing..."
            }],
        date: '2016'
    },
    {
        name: 'U Wid Family', imgData: [
            {
                fileName: "IMG-20180805-WA0031.jpg",
                description: `Toy train station`
            },
            {
                fileName: "U_Wid_Family.jpg",
                description: `Eco Park`
            }],
        date: 'March 2018'
    },
    {
        name: 'U Wid Me', imgData: [
            {
                fileName: "IMG20181027163332.jpg",
                description: "Playing hearts..."
            },
            {
                fileName: "IMG20181104155620.jpg",
                description: "Together at same cool place."
            },
            {
                fileName: "U_Wid_Me.jpg",
                description: "Another one..."
            },
            {
                fileName: "IMG20181230110517.jpg",
                description: "It's christmas time..."
            },
            {
                fileName: "IMG20181230110538.jpg",
                description: "Roaming and waiting..."
            },
            {
                fileName: "IMG-20180805-WA0034.jpg",
                description: "Toy train station..."
            },
            {
                fileName: "2018-11-07-17-47-54-048.jpg",
                description: "Few moments together in busy schedule..."
            },
            {
                fileName: "2017-10-03-20-17-25-295_1507049581321.jpg",
                description: "Few moments earlier..."
            }],
        date: 'March 2018'
    }];
document.getElementById("home").style.display = "block";
crtUtilityTiles();
let header = document.querySelector(".header");
setTimeout(() => header.style.marginTop = "0", 1200);
let lightGrey = "rgb(71,71,71)";
let darkGrey = "rgb(17, 17, 17)";
let pgLink = document.getElementById("pgLink");
let hdSymbol = document.getElementById("hdSymbol");
document.getElementsByClassName("container")[0].style.visibility = "visible";
let dark = crtSybl("rgb(12,12,12)");
let light = crtSybl("rgb(200,200,250)");
pgLink.href = dark;
hdSymbol.src = dark;
window.onscroll = () => {
    if (window.pageYOffset > pageYOffsetPlus) {
        header.style.marginTop = "-2.8rem";
    } else {
        header.style.marginTop = "0";
    }
    pageYOffsetPlus = window.pageYOffset;
}
