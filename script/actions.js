const render = arr => {
    const projects = document.querySelector(".projects");
    projects.innerHTML = "";

    arr.map(item => {
        projects.innerHTML += `<div class="card">
                                    <div class="title">${item.title}
                                    </div>
                                    <div class="description">
                                        <p>${item.desc}</p>
                                        <div class="authors">Author(s): ${item.authors}</div>
                                        <div class="view_more" onclick="view(\'${item.id}\')">View More</div>
                                    </div>
                                </div>`
    })
}


window.onload = () => {
    const projects = document.querySelector(".projects");

    fetch("https://localhost:3000/projects").then(res => res.json())
        .then(res => render(res))
}

const search = () => {
    const search_text = document.querySelector("#search_text").value;

    if (search_text === ""){
        location.reload()
    } 

    // console.log(title.value);
    let data =  new FormData();
    data.append('text', search_text);

    fetch("https://localhost:3000/search", {
        method: 'POST',
        body: data
        // headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .then(res => render(res))
        .catch(err => alert(err))
}
const submitForm = () => {
    const title = document.querySelector("#project_title").value,
        desc = document.querySelector("#project_desc").value,
        authors = document.querySelector("#project_authors").value,
        thesis = document.querySelector("#thesis").files[0],
        project_zip = document.querySelector("#project_zip").files[0];

    if (!(title && desc && authors && thesis && project_zip)){
        alert("All fields are Required!")
        return;
    } 

    // console.log(title.value);
    
    const data = {
        title,
        desc,
        authors,
        thesis,
        project_zip
    }
//     let data =  new FormData();
//     data.append('title', title.value);
//     data.append('desc', desc.value);
//     data.append('authors', authors.value);
//     data.append('thesis', thesis);
//     data.append('project_zip', project_zip);

    fetch("https://localhost:3000/add", {
        method: 'POST',
        body: data
//         headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .then(res => alert("File Uploaded!"))
        .catch(err => alert(err))
}

const view = id => {
    view_page = document.querySelector(".view_project"),
    title = document.querySelector(".view_title"),
    desc = document.querySelector(".view_desc"),
    author = document.querySelector(".view_author"),
    d_thesis = document.querySelector(".download_thesis"),
    d_zip = document.querySelector(".download_zip");

    view_page.style.visibility = "visible";
    view_page.style.display = "grid";
    view_page.style.animationName = "onShow";

    let data =  new FormData();
    data.append('id', id);

    fetch("https://localhost:3000/view", {
        method: 'POST',
        body: data
    }).then(res => res.json())
        .then(res => {
            // console.log(res[0])
            title.textContent = res[0].title;
            desc.textContent = res[0].desc;
            author.textContent = `Author(s): ${res[0].authors}`;
            d_thesis.href = `https://localhost:3000/file?name=${res[0].thesis}`;
            d_zip.href = `https://localhost:3000/file?name=${res[0].zip}`;
        })
        .catch(err => alert(err))
        
}

const closeView = () => {
    view_page = document.querySelector(".view_project");

    view_page.style.animationName = "onHide";
    setTimeout(() => {
        view_page.style.visibility = "hidden";
        view_page.style.display = "none";
    }, 1000);
}
