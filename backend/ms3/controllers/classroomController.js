const mongoose = require('mongoose');
const Classroom = require('../models/classroom');

exports.getAll = async function(req, res, next){
    classrooms = await Classroom.find({});
    res.send(classrooms);
}
exports.create = async function(req, res, next){
    classroom = new Classroom(req.body);
    try{
        e = classroom.validateSync();
        if(e){
            res.json(e);
            return;
        }
    }catch{
    }
    n = await classroom.countSimilar();
    if(n == 0){
        await classroom.save();
        res.json(classroom._id);
    }else
        res.json({Dupl: true});
}
exports.update = async function(req, res, next){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        classroom = await Classroom.findById(req.params.id);
        if(classroom){
            classroom.name = req.body.name;
            try{
                e = classroom.validateSync();
                if(e){
                    res.json(e);
                    return;
                }
            }catch{
            }
            n = await classroom.countSimilar();
            if(n == 0){
                await classroom.save();
                res.json(classroom._id);
            }else
                res.json({Dupl: true});
        }else
            res.json({"error":true});
    }else
        res.json({"error":true,"valid_id":false});
}
exports.delete = async function(req, res, next){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        classroom = await Classroom.findById(req.params.id);
        if(classroom){
            await classroom.deleteOne();
            res.json(classroom._id);
        }else
            res.json({"error":true});
    }else
        res.json({"error":true,"valid_id":false});
}