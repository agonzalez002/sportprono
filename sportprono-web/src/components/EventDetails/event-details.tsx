// @ts-ignore TS6133
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BetType, EventType } from '../../interfaces';
import useFetchEvent from '../../hooks/fetch-event';
import { useAuth } from '../../hooks/useAuth';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import User from '../User/user';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { placeBet } from '../../services/eventServices';
import { ArrowBack } from '@mui/icons-material';
import { StyledLink } from '../../globalStyled';

function EventDetails() {

    // @ts-ignore TS6133
    const { authData } = useAuth();
    const { id } = useParams();
    const [ eventDetails, loading, error ] = useFetchEvent(id, authData.token);
    const [ event, setEvent ] = useState<EventType>();
    const [ evtTime, setEvtTime ] = useState<DateTime>(DateTime.fromISO("2000-01-01T00:00:00"));
    const [ score1, setScore1 ] = useState<string>('');
    const [ score2, setScore2 ] = useState<string>('');

    useEffect(() => {
        if (eventDetails && typeof eventDetails !== 'boolean') {
            setEvent(eventDetails);
            if (eventDetails?.time) {
                const time = DateTime.fromISO(eventDetails.time).setLocale("fr").setZone("Europe/Paris").toUTC();
                setEvtTime(time);
            }
        }
    }, [eventDetails, authData]);

    if (error) {
        return <h1>Error !</h1>;
    };

    if (loading) {
        return <h1>Loading...</h1>;
    };

    const impossibleScore = ['1', '2', '4']

    const saveBet = async () => {
        var goodScore = true
        if (score1 && impossibleScore.indexOf(score1) !== -1) {
            toast.error('This score is not possible for team1');
            goodScore = false
        } else if (score2 && impossibleScore.indexOf(score2) !== -1) {
            toast.error('This score is not possible for team2');
            goodScore = false
        }
        if (event && goodScore) {
            const bet_data = {'event_id': event.id, score1, score2}
            const bet = await placeBet(bet_data, authData.token)
            if (bet) {
                toast.success(bet.message);
            }
            setScore1('');
            setScore2('');
        }        
    }

    return (
        <>
            {
                event && 
                <>
                    <StyledLink to={`/details/${event.group}`}><ArrowBack />back</StyledLink>
                    <p><CalendarTodayIcon />{evtTime.toLocaleString()} <AccessTimeIcon />{evtTime.toFormat('HH:mm')}</p>
                    <h1>{event.team1} VS {event.team2}</h1>
                    <h2>{event.score1} - {event.score2}</h2>
                    <hr></hr>
                    <br />
                    <>

                        <TextField 
                            id="score1" 
                            label="Score Team 1" 
                            variant="standard" 
                            type='number'
                            value={score1}
                            onChange={ e => setScore1(e.target.value) }
                            inputProps={{ min: 0 }}
                        />
                        :
                        <TextField 
                            id="score2"
                            label="Score Team 2"
                            variant="standard"
                            type='number'
                            value={score2}
                            onChange={ e => setScore2(e.target.value) }
                            inputProps={{ min: 0 }}
                        />
                        <Button variant='contained' color='primary' onClick={saveBet} disabled={!score1 || !score2}>Save</Button>
                    </>
                    <hr></hr>
                    <br />
                    {
                        event.bets && event.bets.map((bet: BetType) => {
                            return (
                                <div key={bet.id}>
                                    <User user={bet.user} accessAccount={false} /> : {bet.score1} - {bet.score2}
                                </div>
                            )
                        })
                    }
                </>
            }
        </>
    )
}

export default EventDetails;