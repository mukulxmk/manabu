import Card ,{CardProps} from "@/components/card/Card";

async function getEvents(): Promise<CardProps[]> {
  const res = await fetch("http://localhost:5000/event-routes", {
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);
  

  return data.events.map((event: any) => ({
    title: event.title,
    startDateTime: event.start_time,
    venue: event.venue.name,
    images: event.images,
  }));
}

export default async function(){
  const events = await getEvents();
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
      {events.map((event, i) => (
        <Card key={i} {...event}></Card>
      )
      )}
    </div>
  );
};
