import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
    return (
      <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {props.interview ? (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
      />
      ) : (<Empty onAdd={props.onAdd} />)}   
      </article>
    )
}