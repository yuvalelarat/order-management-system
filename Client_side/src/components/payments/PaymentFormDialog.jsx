import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import PaymentPayPalForm from './PaymentPayPalForm.jsx'
import { useTheme } from "@mui/material/styles";
import { styles } from "../../styles.jsx";

export default function PaymentFormDialog() {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const theme = useTheme();

  const { PaymentFormCVVAndDate, PaymentFormDialogContentContainer } = styles;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setMonth("");
    setYear("");
    setOpen(false);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => 1 + i);

  return (
    <div style={{ padding: "1rem 1rem 0px" }}>
      <Fragment>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          המשך לתשלום
        </Button>
        <PaymentPayPalForm
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleClose();
            },
            style:{width: '600px', maxWidth: '90%' , backgroundColor: "#d3d3d3"}
          }}
          
        >
        </PaymentPayPalForm>
      </Fragment>
    </div>
  );
}