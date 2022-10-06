// variable declare for slide index
let slideIndex = 0

// array for slides
const slides = document.querySelectorAll(".slide")

// variable for search input box
const searchInput = document.getElementById("search-input");

// variable for search box search button
const searchBoxbtn = document.getElementById("searchBox-btn")

// variable declare for category buttons
// get all the category buttons to an array
const categoryBtns = document.querySelectorAll(".category-Btns");

//variable for Explore more button
const btnExploreMore = document.querySelector('.btn-explore-more');

//variable for get started button
const btnGetStared = document.querySelector('.btn-get-started');



//variable declare for course pop up view window
const viewCourseBtn = document.querySelectorAll(".btn-view-course");
const modalCloseBtn = document.getElementById("close-icon");
const courseView = document.querySelector(".course-view");
const upperContent = document.querySelector(".upper-content")

const courseName = document.getElementById("course-name");
const instructorName = document.getElementById("instructorName");
const courseFee = document.getElementById("courseFee");
const weekAmount = document.getElementById("weekAmount");
const videoAmount = document.getElementById("videoAmount");
const quizAmount = document.getElementById("quizAmount");
const projectAmount = document.getElementById("projectAmount");



// call to function for slide show
showOffers(slideIndex)


// function for get three dot values to show offer when click
function getDotValue(n) {
    slideIndex = n
    showOffers(slideIndex)
}

// Interval for slideIndex increment 
// Set timing to change slide from slide

setInterval(() => {
    slideIndex++
    if (slideIndex > 2) {
        slideIndex = 0
    }
    showOffers(slideIndex)
}, 5000)

// Landing page offers slider function
function showOffers(slideIndex) {

    slides[slideIndex].style.display = 'block';

    if (slideIndex == 0) {
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.display = 'none'
        }
    }
    if (slideIndex == 2) {
        for (let i = 0; i < 2; i++) {
            slides[i].style.display = 'none'
        }
    }
    if (slideIndex == 1) {
        for (let i = 0; i < 3; i++) {
            slides[i].style.display = 'none'
            i = i + 1
        }
    }
}

// when window scroll to current location ,call the function
// function for counter up animation 
window.onscroll = function() {
    if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
        const counters = document.querySelectorAll('.amount-show')

        counters.forEach(counter => {
            function counting() {

                const amount = +counter.getAttribute('data-target')
                const count = +counter.innerText
                const increment = amount / 1000

                if (count < amount) {

                    counter.innerText = Math.ceil(count + increment)
                    setTimeout(counting, 1)
                } else {
                    counter.innerText = amount + "+";
                }
            }
            counting();
        });
    }
}


// function for search box button
// get the value form search box
// and pass it to courses.html page and show search result

searchBoxbtn.addEventListener("click", () => {
    if (searchInput.value !== "") {
        sessionStorage.setItem("searchvalue", searchInput.value);
        window.location.href = "courses.html";
    }
});

// function for enter key for search
searchInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        searchBoxbtn.click();
    }
});


// function for category buttons
// get the values and pass it to courses.html page

categoryBtns.forEach(btn => {
    btn.addEventListener("click", (button) => {
        button.preventDefault();
        const category = btn.getAttribute("data-category")
        sessionStorage.setItem("category", category)
        sessionStorage.setItem("btnName", btn.innerText)
        window.location.href = "courses.html";

    })
});

//calling function for explore more button
btnExploreMore.addEventListener("click", buttonClickFunction);

//calling function for get Started button
btnGetStared.addEventListener("click", buttonClickFunction)

// function for explore more and get started button clicks
function buttonClickFunction() {
    const category = btnExploreMore.getAttribute("data-category");
    sessionStorage.setItem("category", category)
    sessionStorage.setItem("btnName", "All Courses")
    window.location.href = "courses.html";
}


// Function for course popup view 

viewCourseBtn.forEach(button => {
    button.addEventListener("click", () => {

        const courseElements = button.parentNode.childNodes;
        const nameAndPriceElements = courseElements[5].childNodes;

        console.log(courseElements)
        console.log(nameAndPriceElements)

        //change course name to relevant course name
        courseName.innerText = courseElements[3].innerText;

        //change instructor name to relevant name 
        instructorName.innerText = nameAndPriceElements[1].innerText; 
        
        //change courseFee
        courseFee.innerText = nameAndPriceElements[3].innerText;

        //change weeks Amount
        weekAmount.innerText = "0"+ button.parentNode.getAttribute("data-week")

        // change video Amount
        videoAmount.innerText = button.parentNode.getAttribute("data-videos")

        //change quiz amount
        quizAmount.innerText = button.parentNode.getAttribute("data-quiz")

        //change project amount 
        projectAmount.innerText = button.parentNode.getAttribute("data-projects")

        //change color of Course header background
        upperContent.style.background = 'linear-gradient(90deg, '+ button.parentNode.getAttribute("data-color") + ',rgba(255,255,255,1) 100%)'


        courseView.style.display = "block";

    });
})


modalCloseBtn.addEventListener("click", () => {
    courseView.style.display = "none";
})
window.addEventListener("click", (e) => {
    if (e.target == courseView) {
        courseView.style.display = "none";
    }
})