import mongoose, { Model } from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    date: {
        start_Date : Date,
        when: String
    },
    venue: { 
        name: String,
        rating: Number,
        reviews: Number,
        link: String
     },
    address: [{ type: String }],
    city: { type: String },
    link: { type: String },
    description : { type: String },
    event_location_map: {
        image: String,
        link: String,
    },
    ticket_info : {
        source: String,
        link: String,
        link_type: String
    },
    image: {
        src: String
    },
    source : { type: String},
    orignalEventURL : { type: String },
    lastScrapedTime : { type : Date },
    category: { type: String },
    tags: { type: String },
    active: { 
        type: Boolean,
        default: true
    }

}, { timestamps : true });

export default Event = mongoose.model("Event", eventSchema);