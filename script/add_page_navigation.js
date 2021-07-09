let add_page = document.querySelector(".new_project"),
    show = document.querySelector(".add_new"),
    hide = document.querySelector(".close_btn");

const toggleAddPage = (mode) => {
    if (mode === "show"){
        add_page.style.visibility = "visible";
        add_page.style.display = "grid";
        add_page.style.animationName = "onShow";
    }
    if (mode === "hide"){
        add_page.style.animationName = "onHide";
        setTimeout(() => {
            add_page.style.visibility = "hidden";
            add_page.style.display = "none";
        }, 1000);
    }
}

show.onclick = () => toggleAddPage("show");
hide.onclick = () => toggleAddPage("hide");