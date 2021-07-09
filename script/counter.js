let title = document.querySelector("#project_title"),
    desc = document.querySelector("#project_desc"),
    title_counter = document.querySelector(".title_counter"),
    desc_counter = document.querySelector(".desc_counter");

const count = (elem) => {
    let i = 0;
    for (x of elem.value) {
        i++;
    }
    return i;
}

title.onkeydown = () => title_counter.textContent = `${count(title)}/70`;
desc.onkeydown = () => desc_counter.textContent = `${count(desc)}/150`;
