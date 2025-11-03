import { useEffect, useRef } from "react";

const events = [
  {
    day: "Monday",
    time: "11.00 AM GMT +8",
    title: "Hades II",
  },
  {
    day: "Tuesday",
    time: "11.00 AM GMT +8",
    title: "To be added..",
  },
  {
    day: "Wednesday",
    time: "11.00 AM GMT +8",
    title: "Trails in The Sky SC",
  },
  {
    day: "Thursday",
    time: "11.00 AM GMT +8",
    title: "Chrono Cross",
  },
  {
    day: "Friday",
    time: "11.00 AM GMT +8",
    title: "Umamusume Pretty Derby",
  },
];

export default function Schedules() {
  return (
    <section className="schedules">
      <h2 className="title">Weekly Schedules</h2>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className="event-card active">
            <div className="event-dot" />
            <div className="event-content">
              <span className="event-day">{event.day}</span>
              <span className="event-time">{event.time}</span>
              <h3 className="event-title">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}