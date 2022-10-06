const searchInput = document.getElementById("search-input");
const searchBoxbtn = document.getElementById("searchBox-btn");

searchBoxbtn.addEventListener("click", () => {
    if (searchInput.value !== "") {
        sessionStorage.setItem("searchvalue", searchInput.value);
        window.location.href = "courses.html";
    }


});
searchInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        searchBoxbtn.click();
    }
});

const categoryBtns = document.querySelectorAll(".category-Btns");

categoryBtns.forEach(btn => {
    btn.addEventListener("click", (button) => {
        button.preventDefault();
        const category = btn.getAttribute("data-category")
        sessionStorage.setItem("category", category)
        sessionStorage.setItem("btnName", btn.innerText)
        window.location.href = "courses.html";

    })
});

