const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { fetchProjects, saveFile, fetchFile } = require('./logic');

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || '3000';

app.get("/projects", (req, res) => {
    res.json(fetchProjects());
})

app.post("/add_new", async (req, res) => {
    await saveFile(req);
})


app.post("/search", async (req, res) => {
    res.json(fetchProjects().filter(item => item.title.toLowerCase().includes(req.body.text.toLowerCase())))
})

app.post("/view", async (req, res) => {
    res.json(fetchProjects().filter(item => item.id == req.body.id))
})

app.get("/file/:name", (req, res) => {
    res.download(req.params.name.replace('*', '/'), err => {
        res.send(err);
    });
})
    
app.listen(port, () => console.log(`App listening on PORT: ${port}`));
