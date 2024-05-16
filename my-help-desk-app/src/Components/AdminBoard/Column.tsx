import React from "react";
import Ticket from "../../Models/Ticket";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import "./Column.css";
import AdminTicketCard from "./AdminTicketCard";

type Props = {
  tickets: Ticket[];
  title: string;
  droppableId: string;
};

const Column: React.FC<Props> = ({ tickets, title, droppableId = "DEFAULT_ID" }) => {
    console.log("Droppable ID:", droppableId); // Add this line for debugging

  return (
    <div className="Column">
      <div className="Column__Title">
        <h3> {title}</h3>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (            
          <div
            className="Column__List"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "white",
            }}
          >
            {tickets.map((ticket, index) => (
                <AdminTicketCard ticket={ticket} index={index} key={ticket.ticketId}/>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
