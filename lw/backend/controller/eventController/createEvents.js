import Event from '../../model/event.js';

export default async function createEvents(req, res){
    try {
        let events = [];

        //  Search for existing
        const existingEvents = await Event.find({ city: req.query.city });
        console.log(existingEvents);
        
        if(existingEvents.length  !== 0) return res.json({message : `Events already exist for this ${req.query.city} in DB`});

        const params = new URLSearchParams({
            engine: "google_events",
            q: `Events in ${req.query.city}`,
            hl: "en",
            gl: "au",
            api_key: process.env.SERP_API_KEY,
        });

        const response = await fetch(
            `https://serpapi.com/search.json?${params.toString()}`,
            { cache: "no-store" }
        );
        const data = await response.json();

        data.events_results.map((event, i) => {
            const currEvent = {
                title: event?.title,
                date : event?.date,
                address : event?.address,
                city: req.query.city,
                description: event?.description,
                link: event?.link,
                source: event?.event_location_map?.serpapi_link,
                orignalEventURL : event?.link,
                event_location_map: event?.event_location_map,
                ticket_info: event?.ticket_info,
                venue :event?.venue,
                thumbnail :event?.thumbnail,
                image: event?.image
            }
            events.push(currEvent);
        })

        if(events.length == 0 ) return res.status(422).json({error: "Failed to fetch and create resource."})

        const createEvents = await Event.insertMany(events).then((res) => console.log(res)
        );
        

        res.status(201).json({
            message: `Events for city ${req.query.city} created successfully.` ,
            count: events.length,
            savedData : events,
            s: createEvents
        })

    } catch (err) {

        console.log("In creating new events", err);
        res.status(500).json({
            error: err.message,
            detials: err
        })
        
        
    }
}