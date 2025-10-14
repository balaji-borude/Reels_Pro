import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  password: string;
  _id?: mongoose.Types.ObjectId; // optional sathi ?use kela ahe
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// pre hook middleware
userSchema.pre("save", async function (next) {
  // if password is modified asel tr (like, update pass, forgotPass)
  // creation chya weli aplyala Hashed karavelagel (edgecases sathi he use kartat )

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// next js Edge wr chalte tyamul --> check kr models pahilyapsaun load ahe ka server wr asel tr
//mongoose.models.User --> if model are alredy presentin the server then use it
// otherwise useThis model --> mongoose.model<user>("User",userSchema);--> at first use
const User = mongoose.models?.User || mongoose.model<User>("User", userSchema);
export default User;
