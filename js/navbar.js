// Mobile responsive nav bar 

const navbar = document.getElementById("nav-bars");
const navlinkContainer = document.querySelector(".navlink-container");
const navicon = document.getElementById("navicon");
const categorylabelresponsive =document.querySelector(".category-label-responsive");
const categorylinks = document.querySelector(".category-links");

//function for navbar 
navbar.addEventListener("click",()=>{
    navlinkContainer.classList.toggle("navlink-responsive");
    navicon.classList.toggle('fa-times')
})

categorylabelresponsive.addEventListener("click",()=>{
    categorylinks.classList.toggle("category-links-responsive");
})