const mongoose = require('mongoose');
const { Schema } = mongoose;

const absenceSchema = new Schema(
    {
        session_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'session',
            required: [true]
        }, 
        student_id: {
            type: String, 
            required: [true]
        }, 
        student_full_name: {
            type: String, 
            required: [true]
        }, 
        status: {
            type: Number, 
            required: [true]
        }, 
        date: {
            type: Date, 
            required: [true]
        }, 
    },
    {
        versionKey:false, 
        methods: {
            async countSimilar(){
                return await  mongoose.model('absence').count({
                    $and:[
                        {
                            _id:{$ne:this._id}
                        },
                        {
                            session_id:this.session_id
                        },
                        {
                            student_id:this.student_id
                        },
                        {
                            date:this.date
                        }
                    ]
                });
            }
            
        }
    }
);
const absence = mongoose.model('absence',absenceSchema);
module.exports = absence;