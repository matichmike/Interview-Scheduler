import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // update Spots is using the id to find the day to update among the list of days in state.days and is updating day.spots for that day (-1 for booking, +1 for cancellation)
  
  function updateSpots(appointment_id, value) {
    let daysVar = state.days;
    for (let day of daysVar) {
      if (day.appointments.includes(appointment_id)) {
        day.spots = day.spots + value;
      }
    }
    return daysVar;
  }

  //book Interview function adds the interview to DB and decreases the # of available spots by 1, number of spots stays the same if the interview is being edited
  function bookInterview(id, interview) {
    const spotUpdateValue = state.appointments[id].interview ? 0: -1;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
     .put(`http://localhost:8001/api/appointments/${id}`, appointment)
     .then(res => {
      setState({
        ...state,
        appointments, days: updateSpots(id, spotUpdateValue)
      })
     })
  };

  //cancel Interview function removes the interview from DB and increases the # of available spots by 1
  function cancelInterview(id) {
    const spotUpdateValue = 1;
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
     .delete(`http://localhost:8001/api/appointments/${id}`)
     .then(res => {
      setState({
        ...state,
        appointments, days: updateSpots(id, spotUpdateValue)
      })
     })
  };

  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
      .then((all) => {
        setState({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
        
    })
  }, []);

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}
