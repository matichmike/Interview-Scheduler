import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name && interviewer) {
      
    
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(error => {
      transition(ERROR_SAVE, true);
    })
  }
}

  function deleting() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(error => {
      transition(ERROR_DELETE, true);
    })
  }

    return (
      <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        return transition(CREATE);
      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          //onDelete={deleting}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
  />
)}
      {mode === SAVING && (
        <Status 
        message={"Saving..."}
  />
)}
      {mode === DELETING && (
        <Status 
        message={"Deleting..."}
  />
)}
{mode === CONFIRM && (
<Confirm
message="Would you like to delete the apointment?"
onCancel={() => back()}
onConfirm={deleting}
/>
)}
{mode === EDIT && (
  <Form
  name={props.interview.student}
  interviewer={props.interview.interviewer.id}
  interviewers={props.interviewers}
  onSave={save}
  onCancel={() => back()}
  />
)}
{mode === ERROR_SAVE && (
  <Error message="Saving Error" onClose={() => back()} />
)}

{mode === ERROR_DELETE && (
  <Error message="Deleting Error" onClose={() => back()} />
)}
      </article>
    )
}