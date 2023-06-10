const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema(
    {
        classroom_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classroom',
            required: [true]
        }, 
        group_id: {
            type: String, 
            required: [true]
        }, 
        group_name: {
            type: String, 
            required: [true]
        },
        course_id: {
            type: String, 
            required: [true]
        },
        course_name: {
            type: String, 
            required: [true]
        },
        teacher_id: {
            type: String, 
            required: [true]
        },
        teacher_full_name: {
            type: String, 
            required: [true]
        },
        type: {
            type: String, 
            required: [true]
        },
        day: {
            type: Number, 
            enum: [0,1,2,3,4,5,6],
            required: [true]
        },
        start_time: {
            type: String, 
            required: [true]
        },
        end_time: {
            type: String, 
            required: [true]
        }
    },
    {
        versionKey:false,
        methods: {
            async countSimilar(){
                return await  mongoose.model('session').count({
                    $and:[
                        {
                            _id:{$ne:this._id}
                        },
                        {
                            $or:[
                                {classroom_id:this.classroom_id},
                                {group_id:this.group_id},
                                {teacher_id:this.teacher_id}
                            ]
                        },
                        {
                            day:this.day
                        },
                        {
                            $nor:[
                                {start_time:{$gte:this.end_time}},
                                {end_time:{$lte:this.start_time}}
                            ]
                        }
                    ]
                });
            }
            
        }
    }
);

const session = mongoose.model("session", sessionSchema);

module.exports = session;
