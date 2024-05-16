import React, { useContext, useEffect, useState } from "react";
import TicketService from "../../Api/TicketService";
import { AuthContext } from "../../Context/AuthProvider";
import Ticket, { TicketStatus } from "../../Models/Ticket";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./AdminBoard.css";
import Column from "./Column";

const AdminBoard: React.FC = () => {
  const [newTickets, setNewTickets] = useState<Ticket[]>([]);
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [resolvedTickets, setResolvedTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);

  const fetchTickets = async () => {
    try {
      setLoading(false);
      const ticketsData = await TicketService.getAllTickets();

      setInProgressTickets(
        ticketsData?.filter(
          (ticket) => ticket.ticketStatus === TicketStatus.IN_PROGRESS
        )
      );
      setNewTickets(
        ticketsData?.filter(
          (ticket) => ticket.ticketStatus === TicketStatus.NEW
        )
      );
      setResolvedTickets(
        ticketsData?.filter(
          (ticket) => ticket.ticketStatus === TicketStatus.RESOLVED
        )
      );
    } catch (error) {
      setError("Error fetching tickets. Please try again later.");
      setLoading(false);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    console.log("Drag result:", result);
    const { destination, source, draggableId } = result;
    console.log("Drag result:", result);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Remove from current list and put in a temp
    if (source.droppableId !== destination.droppableId) {
      let draggedTicket: Ticket | undefined;

      console.log("source droppable Id", source.droppableId);
      console.log("destination droppable Id", destination.droppableId);

      switch (source.droppableId) {
        case "1":
          const newTicket = newTickets.find(
            (ticket) => ticket.ticketId === draggableId
          );
          if (newTicket) {
            draggedTicket = newTicket;
            setNewTickets(
              newTickets.filter((ticket) => ticket.ticketId !== draggableId)
            );
          }
          break;
        case "2":
          const inProgressTicket = inProgressTickets.find(
            (ticket) => ticket.ticketId === draggableId
          );
          if (inProgressTicket) {
            draggedTicket = inProgressTicket;
            setInProgressTickets(
              inProgressTickets.filter(
                (ticket) => ticket.ticketId !== draggableId
              )
            );
          }
          break;
        case "3":
          const resolvedTicket = resolvedTickets.find(
            (ticket) => ticket.ticketId === draggableId
          );
          if (resolvedTicket) {
            draggedTicket = resolvedTicket;
            setResolvedTickets(
              resolvedTickets.filter(
                (ticket) => ticket.ticketId !== draggableId
              )
            );
          }
          break;
        default:
          return;
      }

      // Adding to appropriate list
      let updatedTicket: Ticket | undefined;
      if (draggedTicket) {
        switch (destination.droppableId) {
          case "1":
            updatedTicket = await TicketService.updateTicketStatus(
              draggedTicket.ticketId,
              TicketStatus.NEW
            );
            setNewTickets([{ ...updatedTicket }, ...newTickets]);
            break;
          case "2":
            updatedTicket = await TicketService.updateTicketStatus(
              draggedTicket.ticketId,
              TicketStatus.IN_PROGRESS
            );

            setInProgressTickets([{ ...updatedTicket }, ...inProgressTickets]);
            break;
          case "3":
            updatedTicket = await TicketService.updateTicketStatus(
              draggedTicket.ticketId,
              TicketStatus.RESOLVED
            );
            setResolvedTickets([{ ...updatedTicket }, ...resolvedTickets]);
            break;
          default:
            return;
        }
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="AdminBoard">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className="droppable">
          <Column tickets={newTickets} title="New" droppableId={"1"} />
        </div>
        <div className="droppable">
          <Column
            tickets={inProgressTickets}
            title="In Progress"
            droppableId={"2"}
          />
        </div>
        <div className="droppable">
          <Column
            tickets={resolvedTickets}
            title="Resolved"
            droppableId={"3"}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default AdminBoard;
