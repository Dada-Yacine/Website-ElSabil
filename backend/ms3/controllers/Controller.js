const absence = require("../models/absence");
const session = require("../models/session");

exports.updateStudentFullName = async function(id,full_name){
    await absence.updateMany({student_id:id},{student_full_name:full_name});
}
exports.deleteAbsenceByStudentId = async function(id){
    await absence.deleteMany({student_id:id});
}
exports.updateTeacherFullName = async function(id,full_name){
    await session.updateMany({teacher_id:id},{teacher_full_name:full_name});
}
exports.deleteSessionByTeacherId = async function(id){
    await session.deleteMany({teacher_id:id});
}


exports.updateGroupName = async function(id,name){
    await session.updateMany({group_id:id},{group_name:name});
}
exports.deleteSessionByGroupId = async function(id){
    await session.deleteMany({group_id:id});
}
exports.updateCourseName = async function(id,name){
    await session.updateMany({course_id:id},{course_name:name});
}
exports.deleteSessionByCourseId = async function(id){
    await session.deleteMany({course_id:id});
}