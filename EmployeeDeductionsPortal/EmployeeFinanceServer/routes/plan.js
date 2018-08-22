var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://niraj:niraj@ds251819.mlab.com:51819/employeefinance',['plan']);

// Get all plans
router.get('/plans', function(req, res, next){
    db.plan.find(function(err, plans){
        if(err){
            res.send(err);
        }
        res.json(plans);
    });
});

// Get plan by planId
router.get('/plan/:pid', function(req, res, next){
    db.plan.find({_id: mongojs.ObjectId(req.params.pid)}, function(err, plan){
        if(err){
            res.send(err);
        }
        res.json(plan);
    });
});

module.exports = router;