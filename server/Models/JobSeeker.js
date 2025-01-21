import mongoose from "mongoose";
const jobSeekerSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true,
    },
    experience:{
        type:Number,
        required:true
    },
    // User:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     required:true
    // }

})
export default mongoose.model('JobSeeker', jobSeekerSchema);
