import { useState } from "react";
import {
  Container,
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const EditEventPage = () => {
  // State for form values (just for visual purposes, not actually submitting data)
  const [eventDetails] = useState({
    eventName: "שם האירוע לדוגמה",
    description:
      "תיאור האירוע לדוגמה. כאן תוכלו לפרט על האירוע ולתאר מה יקרה במהלכו.",
    date: new Date(),
    time: new Date(),
    location: "מיקום האירוע לדוגמה",
    duration: "1 שעה, 30 דקות",
    price: "25",
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 4, direction: "rtl" }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 4 }}>
            עריכת אירוע
          </Typography>
          <Box component="form" noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="eventName"
                  label="שם האירוע"
                  name="eventName"
                  value={eventDetails.eventName}
                  // The onChange handler is removed for purely visual purposes
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  label="תיאור האירוע"
                  name="description"
                  value={eventDetails.description}
                  // The onChange handler is removed for purely visual purposes
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="תאריך"
                  value={eventDetails.date}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="שעה"
                  value={eventDetails.time}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="מיקום"
                  name="location"
                  value={eventDetails.location}
                  // The onChange handler is removed for purely visual purposes
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="duration"
                  label="משך האירוע"
                  name="duration"
                  value={eventDetails.duration}
                  placeholder="שעות, דקות"
                  // The onChange handler is removed for purely visual purposes
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="מחיר"
                  name="price"
                  value={eventDetails.price}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₪</InputAdornment>
                    ),
                  }}
                  // The onChange handler is removed for purely visual purposes
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "48%" }}
                >
                  שמור שינויים
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ width: "48%" }}
                >
                  ביטול
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default EditEventPage;
