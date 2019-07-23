const express = require('express');
const router = express.Router();

const modelEmployee = require('../models/modelEmployee');

router.get('/dashboard', (req, res) => {

    modelEmployee.find().then((data) => {
        let d = {
            main: data
        }
        res.render("dashboard", {
            "data": d
        });

    }).catch((e) => {
        res.json({
            'error': e
        })
    })

})
module.exports = router;