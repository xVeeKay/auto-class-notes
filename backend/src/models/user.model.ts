import mongoose,{Schema,Document,Model} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken?:string;
  resetPasswordExpires?:Date;
  googleId?:string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    googleId:{
        type:String,
    }
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return
    }
    this.password= await bcrypt.hash(this.password,10)
})

userSchema.set('toJSON', {
  transform: (_doc, ret:any) => {
    delete ret.password
    return ret
  },
})
userSchema.set('toJSON', {
  transform: (_doc, ret:any) => {
    delete ret.__v

    return ret
  },
})

userSchema.methods.comparePassword=async function(enteredPassword:string){
    return bcrypt.compare(enteredPassword,this.password)
}

const User:Model<IUser>=mongoose.model<IUser>("User",userSchema)

export default User