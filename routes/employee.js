const express = require('express');
const router = express.Router();
const uuid = require('uuid4');

const modelEmployee = require('../models/modelEmployee');

router.get('/id/:id', (req, res) => {
    res.send("employee");
})

router.get('/register', (req, res) => {
    res.render('employeeRegister');
});

router.post('/register', (req, res) => {

    modelEmployee.findOne({
        employeeID: req.body.employeeID
    }).then((data) => {
        if (data) {
            res.send("user with same employee ID exists");
        } else {
            let newEmployee = {
                'name': req.body.name,
                'designation': req.body.designation,
                'uuid': uuid(),
                'employeeID': req.body.employeeID,
                'dob': new Date(),
                'socialLinks': {
                    "linkedin": 'https://linkedin.com/1234',
                    "facebook": 'https://facebook.com/1234'
                },
                'familyMembers': [{
                    'relation': 'son',
                    'name': 'Arvind'
                }, {
                    'relation': 'wife',
                    'name': 'aarti'
                }],
                'emergencyContacts': {
                    'contact1': 9090909090,
                    'contact2': 8080808090
                }

            }

            //
            new modelEmployee(newEmployee).save().then(() => {
                res.send("registered")
            }).catch((e) => {
                res.json({
                    "error": e
                });
            })

        }
    })
})

router.get('/profile/:employeeID', (req, res) => {
    modelEmployee.findOne({
        employeeID: req.params.employeeID
    }).then((data) => {
        if (data) {
            let d = {
                "main": data
            }
            res.render('employeeProfile', {
                "data": d
            });

        } else {
            res.send("Employee does not exist");
        }

    })

})

router.post('/update/emergencyContacts', (req, res) => {
    modelEmployee.updateOne({
            employeeID: req.body.employeeID
        }, {
            emergencyContacts: {
                contact1: req.body.contact1,
                contact2: req.body.contact2
            }
        })
        .then(() => {
            res.redirect(`/employee/profile/${req.body.employeeID}`);
        }).catch((e) => {
            res.json({
                'error': e
            })
        });
})


module.exports = router;