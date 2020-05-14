import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment';
import "components/Application.scss";
import DayList from "components/DayList";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Yennefer of Vengerberg",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Triss Merigold",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/days`})
      .then((response) => {
        setDays(response.data);
    })
  }, []);
  const schedule = appointments.map((appointment) => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">

  <DayList days={state.days} day={state.day} setDay={setDay} />

</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
      <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}

