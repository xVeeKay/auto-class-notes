import mongoose,{Schema,Document,Model, Types} from "mongoose";

export interface IFeedback extends Document{
    category:string,
    subject:string,
    message:string,
    userId:Types.ObjectId
}

const feedbackSchema=new Schema<IFeedback>({
    category:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})



const Feedback:Model<IFeedback>=mongoose.model<IFeedback>("Feedback",feedbackSchema)

export default Feedback