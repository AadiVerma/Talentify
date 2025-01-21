import mongoose from "mongoose";
const Schema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // phoneno:{
    //     type:String,
    //     required:true
    // },
    profilephoto:{
        type:String,
        required:false,
    },
    role:{
        type:String,
        required:false,
        default:"hirer",
        enum:['job-seeker','admin','hirer'],
    },
    jobseeker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JobSeeker',
        required:false 
    },
    status:{
        type:String,
        required:false,
        default:"rejected",
        enum:['rejected','hired','pending']
    }
})
export default mongoose.model('User',Schema);