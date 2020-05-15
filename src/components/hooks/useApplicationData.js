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

  function bookInterview(id, interview) {
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
        appointments
      })
      // .catch(err => {
      //   console.log("Error", err);
      // });
     })
  };

  function cancelInterview(id) {
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
        appointments
      })
      // .catch(err => {
      //   console.log("Error", err);
      // });
     })
  };

  
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

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}