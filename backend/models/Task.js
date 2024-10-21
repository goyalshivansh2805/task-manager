const {model,Schema} = require('mongoose');

const TaskSchema = new Schema(
    {
        user_id:{
            type:Schema.Types.ObjectId,
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        status:{
            type:String,
            default:"Pending"
        },
        due_date:{
            type:Date,
            required:true
        },
        priority:{
            type:Number,
            default:0
        }

    },{
        timestamps: true 
    }
);

module.exports = model("Task",TaskSchema);