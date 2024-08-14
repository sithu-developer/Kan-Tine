import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface Props {
  dateValue : Dayjs | null
  setDateValue : (value : Dayjs | null) => void
}

const BasicDatePicker = ({ setDateValue , dateValue } : Props ) => {
    

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={dateValue} onChange={(newValue) => setDateValue(newValue)} label="Start Date" />
    </LocalizationProvider>
  );
}

export default BasicDatePicker;