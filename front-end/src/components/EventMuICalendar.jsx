import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const EventMuICalendar = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']} sx={{border:"3px blue solid"}}>
                <DateCalendar
                    sx={{
                        display:"flex",
                        alignItems:"stretch",
                        '& > div': {
                            border:"10px red solid",
                            width:"100%",
                            boxSizing:"border-box"
                        },
                        border:"10px red solid",
                        width:"700px",
                        boxSizing:"border-box"
                    }}
                    referenceDate={dayjs('2022-04-17')}
                    views={['year', 'month', 'day']}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default EventMuICalendar;