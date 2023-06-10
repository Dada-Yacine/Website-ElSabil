const mongoose = require('mongoose');
const { Schema } = mongoose;

const classroomSchema = new Schema(
    {
        name: {
            type: String,
            required: [true]
        }, 
    },
    {
        versionKey:false, 
        methods: {
            async countSimilar(){
                return await  mongoose.model('classroom').count({
                    $and:[
                        {
                            _id:{$ne:this._id}
                        },
                        {
                            name:this.name
                        }
                    ]
                });
            }
            
        }
    }
);
const classroom = mongoose.model('classroom',classroomSchema);
module.exports = classroom;