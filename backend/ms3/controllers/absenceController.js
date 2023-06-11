const mongoose = require('mongoose');
const Absence = require('../models/absence');
const Timetable = require('../models/session');
const Session = require('../models/session');

exports.create = async(req, res, next)=>{
    const absence = new Absence(req.body);
    try{
        e = absence.validateSync();
        if(e){
            res.json(e);
            return;
        }
    }catch{
    }
    n = await absence.countSimilar();
    if(n == 0){
        absence.save();
        res.json(absence._id);
    }else
        res.json({Dupl: true});
}
exports.createMulti = async(req, res, next)=>{
    let nb = 0;
    absences = req.body
    for(i in absences){
        let absence = new Absence(absences[i]);
        try{
            e = absence.validateSync();
            if(e){
                continue;
            }
        }catch{
        }
        n = await absence.countSimilar();
        if(n == 0){
            nb += 1;
            await absence.save();
        }
    }
    res.json({"nb":nb});
}
exports.getAbsencesByStudent = async(req, res, next)=>{
    data = await Absence.aggregate()
        .match({'student_id':req.params.id})
        .lookup({
            from:'sessions',
            localField:'session_id',
            foreignField:'_id',
            as:'session'
        })
        .addFields({session:{ "$arrayElemAt": [ "$session", 0 ]}})
        .addFields({ course_name:"$session.course_name"})
        .project({'session':0});
    res.send(data);
}
exports.getAbsencesByTeacher = async(req, res, next)=>{
    data = await Session.aggregate()
        .match({'teacher_id':req.params.id})
        .lookup({from:'absences',localField:'_id',foreignField:'session_id',as:'absences'})
        .addFields({ "absences.course_name":"$course_name"})
        .project({'_id':0,'absences':1})
        .unwind('absences')
        .group({'_id':null,'absences':{'$push':'$absences'}});
    if(data[0])
        res.send(data[0].absences);
    else 
        res.send([]);
}
exports.getAbsencesBySession = async(req, res, next)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        data = await Absence.find({'session_id':req.params.id})
        res.send(data);
    }else
        res.json({"e":true})
}
exports.getAbsencesBySessionAndDate = async(req, res, next)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        data = await Absence.find({'session_id':req.params.id,'date':new Date(req.params.date)})
        res.send(data);
    }else
        res.json({"e":true})
}
exports.getAbsencesByGroup = async(req, res, next)=>{
    data = await Timetable.aggregate()
        .project({'group_id':1})
        .match({'group_id':req.params.id})
        .lookup({from: 'absences', localField: '_id', foreignField: 'session_id', as: 'absences'});
    res.send(data);
}
exports.getAbsencesByGroupAndSessionAndDate = async(req, res, next)=>{
    if(req.query.session_id && !mongoose.Types.ObjectId.isValid(req.query.session_id)){
        res.json({'error':true})
        return
    }
    data = await Session.aggregate()
        .match(req.query.group_id?{'group_id':req.query.group_id}:{})
        .lookup({from:'absences',localField:'_id',foreignField:'session_id',as:'absences'})
        .addFields({ "absences.course_name":"$course_name"})
        .addFields({ "absences.day":"$day"})
        .project({'_id':0,'absences':1})
        .unwind('absences')
        .addFields({ "_id":"$absences._id"})
        .addFields({ "session_id":"$absences.session_id"})
        .addFields({ "student_id":"$absences.student_id"})
        .addFields({ "student_full_name":"$absences.student_full_name"})
        .addFields({ "status":"$absences.status"})
        .addFields({ "date":"$absences.date"})
        .addFields({ "course_name":"$absences.course_name"})
        .addFields({ "day":"$absences.day"})
        .project({'absences':0})
        .match({
            "$and" :[
                req.query.date?{'date':new Date(req.query.date)}:{},
                req.query.session_id?{'session_id':new mongoose.Types.ObjectId(req.query.session_id)}:{},
            ]
        })
    res.send(data);
}
exports.update = async(req, res, next)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        absence = await Absence.findById(req.params.id);
        if(absence){
            absence.session_id = req.body.session_id;
            absence.student_id = req.body.student_id;
            absence.student_full_name = req.body.student_full_name;
            absence.status = req.body.status;
            absence.date = req.body.date;
            try{
                e = await absence.validate();
                if(e){
                    res.json(e);
                    return;
                } 
            }catch{
            }
            n = await absence.countSimilar();
            if(n == 0){
                await absence.save();
                res.json(absence._id);
            }else
                res.json({Dupl: true});
        }else{
            res.json({"error":true});
        }
    }else{
        res.json({"error":true,"valid_id":false});
    }
}
exports.delete = async(req, res, next)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const absence = await Absence.findById(req.params.id);
        if(absence){
            await absence.deleteOne();
            res.json({"delete":absence._id});
        }else{
            res.json({"error":true});
        }
    }
    else{
        res.json({"error":true,"valid_id":false});
    }
   
}