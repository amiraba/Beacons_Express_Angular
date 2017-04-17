var express = require ('express');
var router= express.Router();
var mongojs= require('mongojs');
var db= mongojs('mongodb://amira:amira@ds161950.mlab.com:61950/beacons', ['beacons']);

//Get 
router.get('/beacons', function(req, res, next){
    db.beacons.find(function(err, beacons){
        if (err){
            res.send(err);
        }
        res.json(beacons);
    });
});

//Get single 
router.get('/beacons/:id', function(req, res, next){
    db.beacons.findOne(
        {_id: mongojs.ObjectId(req.params.id)},
        function(err, beacon){
            if (err){
                res.send(err);
            }
            res.json(beacon);
        });
});

//Save 
router.post('/beacon', function(req, res, next){
    //res.setHeader('Content-Type', 'application/json');
    var beacon= req.body;
    if (!beacon.uuid || !beacon.major || !beacon.minor ){
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }else{
        db.beacons.save(beacon, function(err, beacon){
            if (err){
                res.send(err);
            }
            res.json(beacon);
        });
    }
    console.log("POST request...");
});
/*
//Delete task
router.delete('/tasks/:id', function(req, res, next){
    db.tasks.remove(
        {_id: mongojs.ObjectId(req.params.id)},
        function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
        });
});

//Update task
router.put('/tasks/:id', function(req, res, next){
    var task=req.body;
    var updTask={};

    if (task.isDone){
        updTask.isDone=task.isDone;
    }
    if (task.title){
        updTask.title=task.title;
    }
    if (!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    db.tasks.update(
        {_id: mongojs.ObjectId(req.params.id)},
        updTask,
        {},
        function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
        });
});
*/
module.exports = router;