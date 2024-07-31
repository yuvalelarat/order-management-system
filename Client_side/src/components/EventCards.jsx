import { Container, Grid } from "@mui/material";
import { styles } from "../styles";
import EventCard from "./EventCard";
import PropTypes from "prop-types";

EventCards.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Treat ObjectId as string
      name: PropTypes.string.isRequired,
      location: PropTypes.arrayOf(PropTypes.number).isRequired, // Assuming location is an array of numbers [lat, long]
      date: PropTypes.string.isRequired, // Treat date as ISO string
      duration: PropTypes.number.isRequired,
      Cost: PropTypes.number.isRequired,
      emptyTickets: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      image: PropTypes.string.isRequired, // Corrected field name from 'im' to 'image'
      description: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired, // Added 'city' as it is present in the data
    })
  ).isRequired,
};

function EventCards({ events }) {
  return (
    <>
      <Container sx={styles.cardGrid} maxWidth={false}>
        <Grid container spacing={4} p={2} justifyContent="center">
          {events.map((event) => (
            <EventCard key={event.name} event={event} /> //change to id
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default EventCards;
