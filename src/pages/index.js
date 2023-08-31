import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const [consultationFee, setConsultationFee] = useState('');
  const [repeatPeriod, setRepeatPeriod] = useState('everyWeek');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(4);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = () => {
    // Handle the booking logic here using the selected data
    // You can perform actions like sending the data to a server, etc.
    console.log('Booking:', {
      consultationFee,
      repeatPeriod,
      selectedWeek,
      selectedDay,
      selectedDate,
      selectedStartTime,
      selectedEndTime,
    });
  };

  const weeksOfMonth = ['1st', '2nd', '3rd', '4th'];

  return (
    <div>
      <p className="text-2xl">Made by Souvick Chakraborty</p>
      <Button variant="outlined" onClick={handleOpen}>
        Open dialog
      </Button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Book Doctor's Appointment</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            className="my-2"
            id="outlined-basic"
            label="Consultation Fee"
            variant="outlined"
            fullWidth
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
          />

          <TextField
            className="my-2"
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

          {repeatPeriod === 'everyFourWeek' && (
            <TextField
              className="my-2"
              id="outlined-select-week"
              select
              label="Select Week"
              value={selectedWeek}
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
            className="my-2"
            id="outlined-select-day"
            select
            label="Select Day"
            value={selectedDay}
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
            {/* Add more days */}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={selectedStartTime}
              onChange={(time) => setSelectedStartTime(time)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              value={selectedEndTime}
              onChange={(time) => setSelectedEndTime(time)}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleBooking} fullWidth>
            Book Appointment
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default IndexPage;