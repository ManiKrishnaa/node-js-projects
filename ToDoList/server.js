var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [];

app.get('/', function (req, res) {
    res.render("index", {
        tasks: tasks,
    });
});

app.post('/addtask', function (req, res) {
    const id = tasks.length + 1;
    const task = req.body.task;
    tasks.push({
        taskid: id,
        taskname: task
    });
    res.redirect("/");
});

app.get('/deletetask/:taskid', function (req, res) {
    var requestedTaskId = req.params.taskid;
    const indexToDelete = tasks.findIndex(task => task.taskid == requestedTaskId);

    if (indexToDelete !== -1) {
        tasks.splice(indexToDelete, 1);
        res.redirect("/");
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
