import { useState } from 'react';
import { EventType, ScoresType } from '../../interfaces';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { saveResults } from '../../services/eventServices';
import { toast } from 'react-toastify';

interface EventProps {
    events: EventType[],
}

function EventScroreList({events}: EventProps) {

    const { authData } = useAuth();
    const [ scores, setScores ] = useState<ScoresType>({});

    if (!authData) {
        return <p>Modal veuillez vous connecter !</p>
    }


    const handleScoreChange = (eventId: number, team: 'score1' | 'score2', value: number) => {
        setScores(prevScores => ({
            ...prevScores,
            [eventId]: {
                ...prevScores[eventId],
                [team]: value
            }
        }));
    }

    const saveScores = async () => {
        const savedScores = await saveResults(scores, authData.token);
        if (savedScores) {
            toast.success(savedScores.message)
        }
    }

    return (
        <>
            <h1>Set event's score</h1>
            { events.map( event => {
                return (
                    <div key={event.id}>
                            {event.team1} 
                            <TextField 
                                id="score1"
                                variant="standard" 
                                type='number'
                                value={event.score1}
                                disabled={!!event.score1}
                                onChange={e => handleScoreChange(event.id, 'score1', Number(e.target.value))}
                                inputProps={{ min: 0 }}
                            />
                            - 
                            <TextField 
                                id="score1"
                                variant="standard" 
                                type='number'
                                value={event.score2}
                                disabled={!!event.score2}
                                onChange={e => handleScoreChange(event.id, 'score2', Number(e.target.value))}
                                inputProps={{ min: 0 }}
                            />
                            {event.team2}
                    </div>
                )
            })}
            <Button variant='contained' color='primary' onClick={saveScores}>Save</Button>
        </>
    )
}

export default EventScroreList;