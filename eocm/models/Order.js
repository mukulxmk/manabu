// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const OrderSchema = new Schema({
//     userId: {
//         type: String,
//         required: true
//     },
//     products: [
//         {
//             productId: { type: String },
//             quantity: { type: Number, default: 1 }
//         }
//     ],
//     address: {type: String, required:true},
//     amout: {type: Number, required:true},
//     status: {type: String, default:'Pending', required:true},

// }, {timestamps: true});
// export default mongoose.model('Order', OrderSchema);

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: {type: String, required : true},
    products : [{
        productId: {type:String},
        quantity : {type:Number, default:1}
    }],
   address: {type:String,required:true},
   amount: {type:Number, required:true},
   status : {type:String, default: 'Pending' ,required:true} 
    
},{timestamps:true});
export default mongoose.models.Order || mongoose.model("Order",orderSchema);