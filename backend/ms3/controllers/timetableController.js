const mongoose = require('mongoose');
const Session = require('../models/session');


exports.create = async function(req, res, next) {
    const session = new Session(req.body);
    try{
        e = session.validateSync();
        if(e){
            res.json(e);
            return;
        }
    }catch{
    }
    n = await session.countSimilar();
    if(n == 0){
        await session.save();
        res.json(session._id);
    }else
        res.json({Dupl: true,number:n});
}
exports.getTimetableByGroup = async(req, res, next)=>{
    data = await Session.aggregate()
        .match({'group_id':req.params.id})
        .lookup({
            from:'classrooms',
            localField:'classroom_id',
            foreignField:'_id',
            as:'classroom'
        })
        .addFields({classroom:{ "$arrayElemAt": [ "$classroom", 0 ]}})
        .addFields({ classroom_name:"$classroom.name"})
        .project({'classroom':0});
    res.send(data);
}
exports.getTimetableByTeacher = async(req, res, next)=>{
    data = await Session.aggregate()
        .match({'teacher_id':req.params.id})
        .lookup({
            from:'classrooms',
            localField:'classroom_id',
            foreignField:'_id',
            as:'classroom'
        })
        .addFields({classroom:{ "$arrayElemAt": [ "$classroom", 0 ]}})
        .addFields({ classroom_name:"$classroom.name"})
        .project({'classroom':0});
    res.send(data);
}

exports.getTimetableByGroupAndTeacherAndClassroom = async(req, res, next)=>{
    if(req.query.classroom_id && !mongoose.Types.ObjectId.isValid(req.query.classroom_id)){
        res.json({'error':true})
        return
    }
    data = await Session.aggregate()
        .match({
            "$and" :[
                req.query.group_id?{'group_id':req.query.group_id}:{},
                req.query.teacher_id?{'teacher_id':req.query.teacher_id}:{},
                req.query.classroom_id?{'classroom_id':new mongoose.Types.ObjectId(req.query.classroom_id)}:{},
            ]
        })
        .lookup({
            from:'classrooms',
            localField:'classroom_id',
            foreignField:'_id',
            as:'classroom'
        })
        .addFields({classroom:{ "$arrayElemAt": [ "$classroom", 0 ]}})
        .addFields({ classroom_name:"$classroom.name"})
        .project({'classroom':0});
    res.send(data);
}
exports.getTimetableByCourse = async(req, res, next)=>{
    data = await Session.find({'course_id':req.params.id});
    res.send(data);
}
exports.update = async(req, res, next)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        session = await Session.findById(req.params.id);
        if(session){
            session._id = req.params.id;
            session.group_id = req.body.group_id;
            session.group_name = req.body.group_name;
            session.course_id = req.body.course_id;
            session.course_name = req.body.course_name;
            session.teacher_id = req.body.teacher_id;
            session.teacher_full_name = req.body.teacher_full_name;
            session.classroom_id = req.body.classroom_id;
            session.type = req.body.type;
            session.day = req.body.day;
            session.start_time = req.body.start_time;
            session.end_time = req.body.end_time;
            try{
                e = session.validateSync();
                if(e){
                    res.json(e);
                    return;
                }
            }catch{
            }
            n = await session.countSimilar(session._id);
            if(n == 0){
                await session.save();
                res.json(session._id);
            }else
                res.json({Dupl: true,number:n});
        }else
            res.json({"error":true});
    }else{
        res.json({"error":true,"valid_id":false});
    }
}
exports.delete = async(req, res, next)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        session = await Session.findById(req.params.id);
        if(session){
            await session.deleteOne();
            res.json({"delete":session._id});
        }else{
            res.json({"error":true});
        }
    }else{
        res.json({"error":true,"valid_id":false});
    }
}
