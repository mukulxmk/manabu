import User from "../../models/user"
import connectDb from "../../middleware/mongoose"
import CryptoJS from "crypto-js";
var jwt =require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        let user = await User.findOne({ "email": req.body.email });
        let bytes = CryptoJS.AES.decrypt(user.password,'1234');
        let password = bytes.toString(CryptoJS.enc.Utf8);

        if (user) {
            if (req.body.email == user.email && req.body.password == password ) {
                var token =  jwt.sign({email: user.email, name:user.name },'1234',{
                    expiresIn : "2d"});
                res.status(200).json({success: true ,token});
            }else{
                res.status(200).json({ success: false, error: "!Invalid Credentials" });
            }
        }else{
            res.status(200).json({ success: false, error: "!User not Found" });    
        }


    } else {
        res.status(400).json({ error: "this method is not allowed" });
    }
}

export default connectDb(handler); 



// import User from "../../models/user"
// import connectDb from "../../middleware/mongoose"
// // import CryptoJS from "crypto-js";
// // var jwt =require('jsonwebtoken');

// const handler = async (req, res) => {
//     if (req.method == 'POST') {
//        console.log(req.body)
//        let user = await User.findOne({ "email": req.body.email });
//        if(user){
//         if(req.body.email == user.email && req.body.password == user.password){
//             res.status(200).json({ success: true, email:user.email, name: user.name});
    
//            }
//         else{
//             res.status(200).json({ success: true, error:"Invalid Credential"});
//         }

    
//        }
       

//     } else {
//         res.status(400).json({ error: "No user found" });
//     }
// }

// export default connectDb(handler); 