import { Container } from "@mui/material";

// import Header from "../components/Header";
import EventDetails from "../components/EventDetails";

function EventPage() {
  return (
    <>
      {/* <Header filter={false} /> */}
      <Container sx={{ py: 8 }}>
        <EventDetails />
      </Container>
    </>
  );
}

export default EventPage;
