const express = require('express');
const router = express.Router();

const { Employee } = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find()
        .then(employeeDatabase => {
        res.status(200).json({
            message: "Employee fetched successfully!",
            employee: employeeDatabase
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't get Employees!!"
        });
    });
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id).then(employee => {
        if(employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({message: "Employee not found!"});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't get Employee!!"
        });
    });
});

router.post('/', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save().then(result => {
        res.status(201).json({
            message: "Employee added successfully",
            emp: emp
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't save Employee!!"
        });
    });
});

router.put('/:id', (req, res) => {
    // const emp = new Employee({
    //     _id: req.body.id,
    //     name: req.body.name,
    //     position: req.body.position,
    //     office: req.body.office,
    //     salary: req.body.salary
    // });
    Employee.findByIdAndUpdate({ _id: req.params.id},
        {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        })
        .then(result => {
        res.status(200).json({
            message: "Update Successful",
            result: result
        });
        console.log(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Couldn't udpate Employee!!",
            error: error
        });
    });
});

router.delete('/:id', (req, res) => {
    Employee.deleteOne({ _id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Employee deleted!"});
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't delete Employee!!"
        });
    });
});

module.exports = router;