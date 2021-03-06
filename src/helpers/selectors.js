export function getAppointmentsForDay(state, day) {
  const daysSorted = state.days.filter((dayItem) => { 
    return dayItem.name.toLowerCase() === day.toLowerCase()
    })
  if (daysSorted.length === 0) {
    return [];
  }
  const appointmentsSorted = daysSorted[0].appointments.map((app) => {
    return state.appointments[app]
  })
  return appointmentsSorted;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const newInterviewObject = {
    student: interview.student
  };
  newInterviewObject.interviewer = state.interviewers[interview.interviewer];
  return newInterviewObject;
}

export function getInterviewersForDay(state, day) {
  const daysSorted = state.days.filter((dayItem) => { 
    return dayItem.name === day
    })
  if (daysSorted.length === 0) {
    return [];
  }
  const interviewersSorted = daysSorted[0].interviewers.map((app) => {
    return state.interviewers[app]
  })
  return interviewersSorted;
}