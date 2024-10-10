import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import { createEvent } from '../../services/eventServices';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { StyledLink } from '../../globalStyled';
import { ArrowBack } from '@mui/icons-material';
import EventScroreList from '../EventList/event-score-list';


function GroupAdmin() {

    const { authData } = useAuth();
    const { state } = useLocation(); 
    const [ team1, setTeam1 ] = useState<string>('');
    const [ team2, setTeam2 ] = useState<string>('');
    const [ eventDate, setEventDate ] = useState<Dayjs | null>(dayjs())

    if (!authData) {
        return <p>Modal veuillez vous connecter !</p>
    }


    const addEvent = async () => {
        console.log(eventDate?.toISOString())
        if (eventDate) {
            const eventData = {
                team1, 
                team2, 
                'time': eventDate.format("YYYY-MM-DDTHH:mm"),
                'group': state.group.id,
            }
            const newEvent = await createEvent(eventData, authData.token)
            if (newEvent) {
                toast.success('Evenement ajouté avec succés !');
            }
        }
    }

    return (
        <>
            <StyledLink to={`/details/${state.group.id}`}><ArrowBack />back</StyledLink>
            <h1>Admin page for group {state.group.name}</h1>
            <Box>
                <h2>Add an event</h2>
                <TextField label="Team 1" variant="standard" onChange={e => setTeam1(e.target.value)} />
                <TextField label="Team 2" variant="standard" onChange={e => setTeam2(e.target.value)} />

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <MobileDateTimePicker defaultValue={eventDate} onChange={(newValue) => setEventDate(newValue)} />
                </LocalizationProvider>

                <Button variant='contained' color='primary' onClick={addEvent}>Add an event</Button>
            </Box>
            <br />
            <hr></hr>
            <br />
            <Box>
                <EventScroreList events={state.group.events}/>
            </Box>
        </>
    )
}

export default GroupAdmin;