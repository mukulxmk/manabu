import User from "../../models/user"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
// import CryptoJS from "crypto-js";         
const handler = async (req, res) => {
    if(req.method == 'POST'){
        const {name,email} = req.body;
        // let user = new User(req.body);

        let user = new User({name , email, password: CryptoJS.AES.encrypt(req.body.password,"1234").toString()});
        user.save();

    res.status(200).json({success: "success" });
    }else {
        res.status(400).json({error: "this method is not allowed" });     
    }
  }
 
export default connectDb(handler); 