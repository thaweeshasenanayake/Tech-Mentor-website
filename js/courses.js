// Filter button varibales declare

const filterButton = document.querySelector("#btnFilter");

filterButton.addEventListener("click", filterShow); // add function to filter button

// Filter side bar 
const filterClass = document.getElementById("filter-container").classList

// Variables declare for course search option 
const courses = document.querySelectorAll(".course");   // get courses to an array
const searchBoxbtn = document.getElementById("searchBox-btn");  
const searchInput = document.getElementById("search-input");
const whatYouSearch = document.getElementById("what-you-search")

//variables declare of filter side bar 
const filterSearchBtn = document.getElementById("btn-search");
const minPrice = document.getElementById("min");
const maxPrice = document.getElementById("max");
const weekCheckBox = document.querySelectorAll(".week-checkbox") // check boxes of weeks


// variable declare for category buttons
// get all the category buttons to an array
const categoryBtns = document.querySelectorAll(".category-Btns");

//variable declare for course pop up view window

const viewCourseBtn = document.querySelectorAll(".btn-view-course"); // view course button
const modalCloseBtn = document.getElementById("close-icon");    // close button of model
const courseView = document.querySelector(".course-view");      // modal window
const upperContent = document.querySelector(".upper-content")

const courseName = document.getElementById("course-name");
const instructorName = document.getElementById("instructorName");
const courseFee = document.getElementById("courseFee");
const weekAmount = document.getElementById("weekAmount");
const videoAmount = document.getElementById("videoAmount");
const quizAmount = document.getElementById("quizAmount");
const projectAmount = document.getElementById("projectAmount");

//variable for visible course , which is on-time display courses 
let visibleCourses = document.querySelectorAll(".course");

// variable for search value, that stores what we are search
let searchValue = "";

// variables for , course which are 'display : none'
let countOfNone = 0

let countNone = 0



// function for filter show hide
function filterShow() {
    filterClass.toggle('filter-container-active');
    document.getElementById("courses-container").classList.toggle('courses-container-active')
}


// If user search from main page(index.html), that search value getting method 
if (sessionStorage.getItem("searchvalue") !== "" && sessionStorage.getItem("searchvalue") !== null) {

    searchInput.value = sessionStorage.getItem("searchvalue");
    whatYouSearch.innerText = searchInput.value;
    searchValue = searchInput.value.toLowerCase().trim();
    searchCourse(searchValue);
    sessionStorage.setItem("searchvalue", "");
    searchValue = ""
}

// function for search box button click 
searchBoxbtn.addEventListener("click", () => {
    if (searchValue == "") {
        searchValue = searchInput.value.toLowerCase().trim();
        whatYouSearch.innerText = searchInput.value;
        searchCourse(searchValue);
        searchValue = ""
        if (searchInput.value == "") {
            whatYouSearch.innerText = "All Courses"
        }
    }
});

// function for enter key for search
searchInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        searchBoxbtn.click();
    }
});


if (searchInput.value == "") {
    for (let i = 0; i < courses.length; i++) {
        courses[i].style.display == "flex"
    }
    whatYouSearch.innerText = "All Courses"
}


// function for get the search value and show the result
function searchCourse(searchvalue) {
    visibleCourses = [];
    console.log(searchvalue)


    courses.forEach(item => {
        if (searchvalue == "all") {
            item.style.display = "flex"
            visibleCourses.push(item)
        } else {
            if (item.classList.contains(searchvalue)) {
                item.style.display = "flex"
                visibleCourses.push(item)
            } else if (searchvalue == "") {
                item.style.display = "flex"
                visibleCourses.push(item)
            } else {
                item.style.display = "none"
                if (item.style.display == "none") {
                    countOfNone = countOfNone + 1
                }
            }
        }
    });
    noResultFound();


}

// function for , if there no result to show
function noResultFound() {
    if (countOfNone == courses.length) {
        document.querySelector(".no-result").style.display = "flex"
        document.querySelector(".btn-filter").style.visibility = "hidden"
        document.querySelector(".filter-container").style.visibility = "hidden"
    } else {
        document.querySelector(".no-result").style.display = "none"
        document.querySelector(".btn-filter").style.visibility = "visible"
        document.querySelector(".filter-container").style.visibility = "visible"
    }
    countOfNone = 0
}


// function for Category buttons
categoryBtns.forEach(btn => {
    btn.addEventListener("click", (button) => {
        button.preventDefault();
        const category = btn.getAttribute("data-category");
        searchCourse(category);

        whatYouSearch.innerText = btn.innerText;

    });
});

// If user click home page category buttons , that passes the value to search function
if (sessionStorage.getItem("category") !== "" && sessionStorage.getItem("category") !== null) {
    searchCourse(sessionStorage.getItem("category"));
    whatYouSearch.innerText = sessionStorage.getItem("btnName");
    sessionStorage.setItem("category", "");
}

//Function for Filter option
// First check visible courses 

filterSearchBtn.addEventListener("click", () => {

    visibleCourses.forEach(course => {

        let price = course.getAttribute("data-price");
        let weekofCourse = course.getAttribute("data-week")

        if (price >= +minPrice.value && price <= +maxPrice.value ) {

            course.style.display = "flex"

            for (let i = 0; i < weekCheckBox.length; i++) {
                if (weekCheckBox[i].checked && weekCheckBox[i].value == weekofCourse) {
                    course.style.display = "flex"
                    break;
                } else if (weekCheckBox[i].checked && weekCheckBox[i].value !== weekofCourse) {
                    course.style.display = "none"

                }

            }

        } else if (minPrice.value == "" && maxPrice.value == "") {
            course.style.display = "flex"
            for (let i = 0; i < weekCheckBox.length; i++) {
                if (weekCheckBox[i].checked && weekCheckBox[i].value == weekofCourse) {
                    course.style.display = "flex"
                    break;
                } else if (weekCheckBox[i].checked && weekCheckBox[i].value !== weekofCourse) {
                    course.style.display = "none"

                }
            }

        } else {
            course.style.display = "none"

        }
    });
});



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