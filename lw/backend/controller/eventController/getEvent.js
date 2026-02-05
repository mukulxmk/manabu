import Event from "../../model/event.js";

export default async function getEvent(req, res){
    try {
        var data;
        const existingEvents = await Event.find({ city : req.query.city });
        if(existingEvents.length == 0) {
            const params = new URLSearchParams({
                engine: "google_events",
                q: `Events in ${city}`,
                hl: "en",
                gl: "au",
                api_key: process.env.SERP_API_KEY,
            });

            const response = await fetch(
                `https://serpapi.com/search.json?${params.toString()}`,
                { cache: "no-store" }
            );
            data = await response.json();
            console.log(data);
        }else{ 
            data = await Event.find({ city : req.query.city });
        }

        res.json({
            message: `Data fetched successfully from ` + existingEvents.length == 0 ? "API" : "Database",
            events : existingEvents.length == 0 ? data.events_results : data  
        })
    } catch (err) {
        console.log("Error occurued in fetching from API", err.message);
        res.status(500).error({
            error: err
        })
        
    }
}
