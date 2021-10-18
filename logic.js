const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const file_data = JSON.parse(fs.readFileSync('./db.json'));

let data = [];
const fetchProjects = () => {
    data = [];
    for (let i in file_data)
        data.push(file_data[i])
        
    return data;
}

const upload = (file, id, attach) => {
    let new_path = `./uploads/${id}`;

    if(!fs.existsSync(new_path)) fs.mkdirSync(new_path);

    file.mv(new_path + `/${attach}.${file.name.split(".")[1]}`, err => {
        if (err) console.log(err);
    })

    return `${new_path}/${attach}.${file.name.split(".")[1]}`;
}

const saveFile = async req => {
    let id = uuidv4();
    let thesis = upload(req.files.thesis, id, "thesis");
    let zip = upload(req.files.project_zip, id, "project_file");
    let title = req.body.title;
    let desc = req.body.desc;
    let authors = req.body.authors;

    data.push({id, title, desc, authors, thesis, zip});

    fs.writeFileSync('./db.json', JSON.stringify(data));

    return Promise.resolve();
}

const fetchFile = req => {
    console.log(req.query)
    return fs.createReadStream(req.query.name);
}

module.exports = {
    fetchProjects,
    saveFile,
    fetchFile
}