import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment';
import "components/Application.scss";
import DayList from "components/DayList";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios({
        method: "GET",
        url: `/api/days`}),
      axios({
        method: "GET",
        url: `/api/appointments`}),
        axios({
          method: "GET",
          url: `/api/interviewers`})
    ])
      .then((all) => {
        setState({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
        
    })
  }, []);
  const schedule = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
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

