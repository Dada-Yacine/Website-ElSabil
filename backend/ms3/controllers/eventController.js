const mongoose = require('mongoose');
const Event = require('../models/event');
const fs = require('fs');
var path = require('path');

exports.getAll = async function(req, res, next){
    let events = await Event.find({});
    res.send(events);
}
exports.getEventsByYear = async function(req, res, next){
    let events = await Event.find({years:req.params.id});
    res.send(events);
}
exports.create = async function(req, res, next){
    let event1 = new Event(req.body);
    if(req.file)
        event1.image_name = req.file.filename;
    try{
        e = event1.validateSync();
        if(e){
            res.json(e);
            return;
        }
    }catch{
    }
    n = 0;//await event1.countSimilar();
    if(n == 0){
        event1.save();
        res.json(event1._id);
    }else
        res.json({Dupl: true});
}
exports.update = async function(req, res, next){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        let event1 = await Event.findById(req.params.id);
        if(event1){
            event1.title = req.body.title;
            event1.description = req.body.description;
            if(req.file){
                try{
                    fs.unlinkSync(path.join(__dirname, '../public/images/')+event1.image_name);
                }catch(e){}
                event1.image_name = req.file.filename;
            }
            event1.level = req.body.level;
            event1.years = req.body.years;
            event1.date = req.body.date;
            event1.start_time = req.body.start_time;
            event1.end_time = req.body.end_time;
            try{
                e = event1.validateSync();
                if(e){
                    res.json(e);
                    return;
                }
            }catch{
            }
            n = 0;//await event1.countSimilar();
            if(n == 0){
                await event1.save();
                res.json(event1._id);
            }else
                res.json({Dupl: true});
        }else
            res.json({"error":true});
    }else
        res.json({"error":true,"valid_id":false});
}
exports.delete = async function(req, res, next){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        let event1 = await Event.findById(req.params.id);
        if(event1){
            try{
                fs.unlinkSync(path.join(__dirname, '../public/images/')+event1.image_name);
            }catch(e){}
            await event1.deleteOne();
            res.json(event1._id);
        }else
            res.json({"error":true});
    }else
        res.json({"error":true,"valid_id":false});
}