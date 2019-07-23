const express = require("express");
const app = express();
const PORT = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//db connection
mongoose.connect('mongodb://localhost:27017/Billtrim_sagnik', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("MongoDB connected");
    }).catch(() => {
        console.log("MongoDB error");
    });

//template engine and middlewares
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//ROUTES
const routesEmployee = require('./routes/employee');
const routesAdmin = require('./routes/admin');

app.use('/employee', routesEmployee);
app.use('/admin', routesAdmin);

app.get("/", (req, res) => {
    res.render("landing");
});

app.listen(PORT, () => {
    console.log(`Server started @ PORT ${PORT}`);
});