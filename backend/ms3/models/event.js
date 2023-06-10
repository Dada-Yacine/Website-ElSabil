const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: [true]
        }, 
        description: {
            type: String,
            required: [true]
        }, 
        image_name: {
            type: String,
            required: [true]
        }, 
        level: {
            type: String,
            required: [true]
        }, 
        years: {
            type: [String],
            required: [true]
        }, 
        date: {
            type: Date,
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
            countSimilar(){
                return 0; /*await  mongoose.model('event').count({
                    $and:[
                        {
                            _id:{$ne:this._id}
                        },
                        {
                            title:this.title
                        },
                        {
                            date:this.date
                        }
                    ]
                });*/
            }
            
        }
    }
);
const event = mongoose.model('event',eventSchema);
module.exports = event;