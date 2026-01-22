// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
// }, { timestamps: true });
// export default mongoose.model('User', UserSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type: String, required : true},
    email : {type: String, required : true, unique:true},
    password : {type: String, required : true},    
},{timestamps:true});
export default mongoose.models.User || mongoose.model("User",userSchema);