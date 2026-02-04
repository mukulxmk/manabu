import mongoose, { Model } from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    date: {
        type: Date
    },
    time: {
        type: Date
    },
    venue: { type: String },
    address: { type: String },
    city: { type: String },
    description : { type: String },
    category: { type: String },
    tags: { type: String },
    images: [{
        type: { type :String},
        src: String
    }],
    source : { type: String},
    orignalEventURL : { type: String },
    lastScrapedTime : { type : Date },
    active: { type: Boolean }

}, { timestamps : true });

export default mongoose.Model("Event", eventSchema);