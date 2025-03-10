import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Button, TextField } from "@mui/material";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchEvent from "../../hooks/fetch-event";
import { useAuth } from "../../hooks/useAuth";
import { BetType, EventType } from "../../interfaces";
import { placeBet } from "../../services/eventServices";
import User from "../User/user";

function EventDetails() {
  const { authData } = useAuth();
  const { id } = useParams();
  const [event, setEvent] = useState<EventType>();
  const [evtTime, setEvtTime] = useState<DateTime>(
    DateTime.fromISO("2000-01-01T00:00:00")
  );
  const [isFutureEvent, setIsFutureEvent] = useState<boolean>(false);
  const [timeDiff, setTimeDiff] = useState<string>("");
  const [score1, setScore1] = useState<string>("");
  const [score2, setScore2] = useState<string>("");

  const [eventDetails, loading] = useFetchEvent(id, authData?.token);

  useEffect(() => {
    if (eventDetails && typeof eventDetails !== "boolean") {
      setEvent(eventDetails);
      if (eventDetails?.time) {
        const time = DateTime.fromISO(eventDetails.time)
          .setLocale("fr")
          .setZone("Europe/Paris")
          .toUTC();
        setEvtTime(time);
        setIsFutureEvent(time > DateTime.now());
        setTimeDiff(time.toRelative() ?? "");
      }
    }
  }, [eventDetails, authData]);

  if (!authData) {
    return <p>Modal veuillez vous connecter !</p>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const impossibleScore = ["1", "2", "4"];

  const saveBet = async () => {
    let goodScore = true;
    if (score1 && impossibleScore.indexOf(score1) !== -1) {
      toast.error("Ce score n'est pas possible pour l'équipe 1");
      goodScore = false;
    } else if (score2 && impossibleScore.indexOf(score2) !== -1) {
      toast.error("Ce score n'est pas possible pour l'équipe 2");
      goodScore = false;
    }
    if (event && goodScore) {
      const bet_data = { event_id: event.id, score1, score2 };
      const bet = await placeBet(bet_data, authData.token);
      if (bet) {
        updateBetInEvent(bet.result);
        toast.success(bet.message);
        setScore1("");
        setScore2("");
      }
    }
  };

  const updateBetInEvent = (newBet: BetType) => {
    setEvent((prevEvent) => {
      if (!prevEvent) return prevEvent;

      const updatedBets = prevEvent.bets.map((bet) =>
        bet.id === newBet.id ? newBet : bet
      );

      const betExists = prevEvent.bets.some((bet) => bet.id === newBet.id);
      const newBetsList = betExists ? updatedBets : [...updatedBets, newBet];

      return {
        ...prevEvent,
        bets: newBetsList,
      };
    });
  };

  return (
    <>
      {event && (
        <>
          <p>
            <CalendarTodayIcon />
            {evtTime.toLocaleString()} <AccessTimeIcon />
            {evtTime.toFormat("HH:mm")}
          </p>
          <h1>
            {event.team1} VS {event.team2}
          </h1>
          <h2>
            {event.score1} - {event.score2}
          </h2>
          {isFutureEvent ? (
            <>
              <hr></hr>
              <br />
              <TextField
                id="score1"
                label="Score Team 1"
                variant="standard"
                type="number"
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                inputProps={{ min: 0 }}
              />
              :
              <TextField
                id="score2"
                label="Score Team 2"
                variant="standard"
                type="number"
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                inputProps={{ min: 0 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={saveBet}
                disabled={!score1 || !score2}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <p>Match joué {timeDiff}</p>
            </>
          )}
          <hr></hr>
          <br />
          {isFutureEvent && (
            <h3>
              Il y a déjà {event.num_bets} qui ont indiqué leur pronostique
            </h3>
          )}
          {event.bets &&
            event.bets.map((bet: BetType) => {
              return (
                <div key={bet.id}>
                  <User user={bet.user} accessAccount={false} /> : {bet.score1}{" "}
                  - {bet.score2}
                </div>
              );
            })}
        </>
      )}
    </>
  );
}

export default EventDetails;
