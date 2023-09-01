import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const [Fee, setConsultationFee] = useState(500);
  const [repeatPeriod, setRepeatPeriod] = useState("everyWeek");
  const [Week, setSelectedWeek] = useState(0);
  const [Day, setSelectedDay] = useState();
  const [StartTime, setSelectedStartTime] = useState(null);
  const [EndTime, setSelectedEndTime] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = () => {

    const formattedStartTime = StartTime && StartTime.format('HH:mm');
    const formattedEndTime = EndTime && EndTime.format('HH:mm');

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDayName = daysOfWeek[Day];

    console.log("Booking:", {
      Fee,
      repeatPeriod,
      Week,
      Day: selectedDayName,
      StartTime: formattedStartTime,
      EndTime: formattedEndTime
    });
  };

  const handleAddTimeSlot = () => {
    const formattedStartTime = StartTime && StartTime.format('HH:mm');
    const formattedEndTime = EndTime && EndTime.format('HH:mm');

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDayName = daysOfWeek[Day];

    if (selectedDayName && StartTime && EndTime) {
      const timeSlotText = `${selectedDayName} - ${formattedStartTime} to ${formattedEndTime}`;
      setSelectedTimeSlot(timeSlotText);
    }
  };

  const handleRemoveTimeSlot = () => {
    setSelectedTimeSlot(null);
  };

  const weeksOfMonth = ["1st", "2nd", "3rd", "4th"];

  return (
    <div>
      <p className="text-2xl">Made by Souvick Chakraborty</p>
      <Button variant="outlined" onClick={handleOpen}>
        Open dialog
      </Button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Book Doctor Appointment</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        {selectedTimeSlot && <p>{selectedTimeSlot}</p>}
        <DialogContent dividers>
          <TextField
            style={{ margin: "10px 0" }}
            id="outlined-basic"
            label="Consultation Fee"
            variant="outlined"
            fullWidth
            value={Fee}
            onChange={(e) => setConsultationFee(e.target.value)}
          />

          <TextField
            style={{ margin: "10px 0" }}
            id="outlined-select-repeat"
            select
            label="Repeat Period"
            value={repeatPeriod}
            onChange={(e) => setRepeatPeriod(e.target.value)}
            fullWidth
          >
            <MenuItem value="everyWeek">Every Week</MenuItem>
            <MenuItem value="everyFourWeek">Every Four Week</MenuItem>
          </TextField>

          {repeatPeriod === "everyFourWeek" && (
            <TextField
              style={{ margin: "10px 0" }}
              id="outlined-select-week"
              select
              label="Select Week"
              value={Week}
              onChange={(e) => setSelectedWeek(e.target.value)}
              fullWidth
            >
              {weeksOfMonth.map((week, index) => (
                <MenuItem key={index} value={index}>
                  {week} week
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            style={{ margin: "10px 0" }}
            id="outlined-select-day"
            select
            label="Select Day"
            value={Day}
            onChange={(e) => setSelectedDay(e.target.value)}
            fullWidth
          >
            <MenuItem value={0}>Sunday</MenuItem>
            <MenuItem value={1}>Monday</MenuItem>
            <MenuItem value={2}>Tuesday</MenuItem>
            <MenuItem value={3}>Wednesday</MenuItem>
            <MenuItem value={4}>Thursday</MenuItem>
            <MenuItem value={5}>Friday</MenuItem>
            <MenuItem value={6}>Saterday</MenuItem>
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={StartTime}
              onChange={(time) => setSelectedStartTime(time)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              value={EndTime}
              onChange={(time) => setSelectedEndTime(time)}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleAddTimeSlot} fullWidth>
            Add Time Slot
          </Button>

          <Button variant="outlined" onClick={handleBooking} fullWidth>
            Book Appointment
          </Button>
          {selectedTimeSlot && (
            <Button variant="outlined" onClick={handleRemoveTimeSlot} fullWidth>
              Remove Time Slot
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default IndexPage;
