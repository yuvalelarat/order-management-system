import { Container, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import PaymentCard from "../components/payments/PaymentCard";
import PaymentQuantity from "../components/payments/PaymentQuantity";
import PaymentSum from "../components/payments/PaymentSum";
import PaymentFormDialog from "../components/payments/PaymentFormDialog";
import { PaymentProvider, usePayment } from "../contexts/PaymentContext";
import { styles } from "../styles";

function PaymentContent() {
  const { eventId } = useParams();
  const { event, setEvent, ticketCount, setTicketCount } = usePayment();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { PaymentPageDiv } = styles;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/events/event/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [eventId, setEvent]);

  const ContainerStyle = (theme) => ({
    py: 4,
    backgroundColor: theme.palette.mode === "dark" ? "grey.800" : "grey.100",
    boxShadow: 3,
    borderRadius: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  });

  if (loading) {
    return (
      <>
        <Container>
          <Box my={4}>
            <Typography variant="h5">Loading...</Typography>
          </Box>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Container>
          <Box my={4}>
            <Typography variant="h5">{error}</Typography>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <div style={PaymentPageDiv}>
        <Container sx={ContainerStyle(theme)}>
          <div style={{ alignSelf: "flex-end" }}>
            <PaymentCard event={event} />
          </div>
          <PaymentQuantity
            event={event}
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
          />
          <PaymentSum ticketCount={ticketCount} event={event} />
          <PaymentFormDialog/>
        </Container>
      </div>
    </>
  );
}

function PaymentPage() {
  return (
    <PaymentProvider>
      <PaymentContent />
    </PaymentProvider>
  );
}

export default PaymentPage;