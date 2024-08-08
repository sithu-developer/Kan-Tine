import * as React from 'react';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
    
}

const BasicDatePicker = ({} : Props ) => {
    const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={['DatePicker']}>
    //     <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
    //   </DemoContainer>
    // </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
}

export default BasicDatePicker;