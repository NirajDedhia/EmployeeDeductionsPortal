var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://niraj:niraj@ds251819.mlab.com:51819/employeefinance',['emplanmap']);

// Get All plans by empId
router.get('/emplan/:eid', function(req, res, next){
    db.emplanmap.find({eid: req.params.eid}, function(err, emplans){
        if(err){
            res.send(err);
        }
        res.json(emplans);
    });
});

// Add new Plan
router.post('/emplan', function(req, res, next){
    var plans = req.body;
    db.emplanmap.save(plans, function(err, emplans){
        if(err){
            res.send(err);
        }
        res.json(emplans);
    });
});

// Update plans for employee
router.put('/emplan/:id', function(req, res, next){
    db.emplanmap.update({ eid :req.params.id }, 
                        { $set :{"plans":req.body.plans} },
                        function(err, emp){
                        if(err){
                            res.send(err);
                        }
                        res.json(emp);
                    });
});

// Delete All plans for employee
router.delete('/deletePlansForEmployee/:id', function(req, res, next){
    db.emplanmap.remove({ eid:(req.params.id) },
                        function(err, emp){
        if(err){
            res.send(err);
        }
        res.json(emp);
    });
});

// Delete Plan from employee
router.put('/deletePlanForEmployee/:id', function(req, res, next){
    var planReq = req.body;
    db.emplanmap.update({_id: mongojs.ObjectId(req.params.id)}, { $pull :{plans:{pid:planReq.pid} } }, function(err, plan){
        if(err){
            res.send(err);
        }
        res.json(plan);
    });
});

// Add Plan to employee
router.put('/addPlanForEmployee/:id/:pid', function(req, res, next){
    db.emplanmap.update({_id: mongojs.ObjectId(req.params.id)}, { $push :{plans:{pid:req.params.pid} } }, function(err, emp){
        if(err){
            res.send(err);
        }
        res.json(emp);
    });
});

// Add Plan to employee
router.put('/addPlanForEmployee/:id/:pid/:percentage', function(req, res, next){
    db.emplanmap.update({_id: mongojs.ObjectId(req.params.id)}, { $push :{plans:{pid:req.params.pid, percentage:req.params.percentage} } }, function(err, emp){
        if(err){
            res.send(err);
        }
        res.json(emp);
    });
});

// Update percentage for customize plan to employee
router.put('/updatePlanForEmployee/:id/:pid/:percentage', function(req, res, next){
    db.emplanmap.update({_id: mongojs.ObjectId(req.params.id), "plans.pid":req.params.pid }, 
                        { $set :{"plans.$.percentage":req.params.percentage} },
                        function(err, emp){
        if(err){
            res.send(err);
        }
        res.json(emp);
    });
});

module.exports = router;