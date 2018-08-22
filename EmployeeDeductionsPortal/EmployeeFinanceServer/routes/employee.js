var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://niraj:niraj@ds251819.mlab.com:51819/employeefinance',['employee']);
// var db = mongojs('mongodb://sid:password1234@ds145911.mlab.com:45911/timelog',['users']);

// Get All Employees
router.get('/employees', function(req, res, next){
    db.employee.find(function(err, employees){
        if(err){
            res.send(err);
        }
        res.json(employees);
    });
});

// router.get('/users', function(req, res, next){
//     db.users.find(function(err, users){
//         if(err){
//             res.send(err);
//         }
//         res.json(users);
//     });
// });

// router.post('/user', function(req, res, next){
//     var user = req.body;
//     db.users.findOne({username: user.username, password: user.password}, function(err, emp){
//             if(err){
//                 res.send(err);
//             }
//             if(!emp){
//                 res.json({
//                     "error": "No user Data"
//                 });
                    
//             } else {
//                 res.json(emp);
                
//             }
//         });
// });

// Get Specific Employee
router.get('/employee/:id', function(req, res, next){
    db.employee.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
});

// Save Employee
router.post('/employee', function(req, res, next){
    var employee = req.body;
    if(!employee || !employee.name || !employee.phone || !employee.salary) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.employee.findOne({phone: employee.phone}, function(err, emp){
            if(err){
                res.send(err);
            }
            if(!emp){
                db.employee.save(employee, function(err, emp){
                    if(err){
                        res.send(err);
                    }
                    res.json(emp);
                });
            } else {
                res.status(400);
                res.json({
                    "error": "Duplicate Data"
                });
            }
        });
    }
});

// Delete Employee
router.delete('/employee/:id', function(req, res, next){
    db.employee.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, emp){
        if(err){
            res.send(err);
        }
        res.json(emp);
    });
});

// Update Employee
router.put('/employee/:id', function(req, res, next){
    var emp = req.body;
    var updEmployee = {};
    
    if(emp.name && emp.name!="") {
        updEmployee.name = emp.name;
    }
    
    if(emp.address) {
        updEmployee.address = emp.address;
    }

    if(emp.phone && emp.phone!="") {
        updEmployee.phone = emp.phone;
    }

    if(emp.salary && emp.salary!="") {
        updEmployee.salary = emp.salary;
    }
    
    if(!updEmployee){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.employee.update({_id: mongojs.ObjectId(req.params.id)}, updEmployee, {}, function(err, emp){
            if(err){
                res.send(err);
            }
            res.json(emp);
        });
    }
});


module.exports = router;