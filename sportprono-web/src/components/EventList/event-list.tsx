import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  DefensiveBonus,
  Event,
  EventListContainer,
  EventListHeader,
  EventListing,
  OffensiveBonus,
  StyledButton,
} from "./StyledEventList";

const mockEvents = [
  {
    id: 1,
    team1: "Stade Français",
    team2: "La Rochelle",
    score1: 17,
    score2: 22,
    date: "2025-03-01",
    team1_bonus: true,
    team2_bonus: false,
  },
  {
    id: 2,
    team1: "Union Bordeaux Bègles",
    team2: "Toulon",
    score1: 27,
    score2: 20,
    date: "2025-03-01",
    team1_bonus: true,
    team2_bonus: false,
  },
  {
    id: 3,
    team1: "Montpellier",
    team2: "Castres",
    score1: 21,
    score2: 17,
    date: "2025-03-01",
    team1_bonus: false,
    team2_bonus: true,
  },
];

interface EventList {
  id: number;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: string;
  team1_bonus: boolean;
  team2_bonus: boolean;
}

function EventList() {
  const [selectedDate, setSelectedDate] = useState("2025-03-01");
  const [events, setEvents] = useState<EventList[]>([]);
  const [availableDates, setAvailableDates] = useState([
    "2025-02-29",
    "2025-03-01",
    "2025-03-02",
  ]);

  useEffect(() => {
    const filteredEvents = mockEvents.filter(
      (event) => event.date === selectedDate
    );
    setEvents(filteredEvents);
  }, [selectedDate]);

  const goToPreviousDate = () => {
    const currentIndex = availableDates.indexOf(selectedDate);
    if (currentIndex > 0) setSelectedDate(availableDates[currentIndex - 1]);
  };

  const goToNextDate = () => {
    const currentIndex = availableDates.indexOf(selectedDate);
    if (currentIndex < availableDates.length - 1)
      setSelectedDate(availableDates[currentIndex + 1]);
  };

  return (
    <EventListContainer>
      {/* Header */}
      <EventListHeader>
        <StyledButton onClick={goToPreviousDate} variant="contained">
          <KeyboardDoubleArrowLeftIcon />
        </StyledButton>
        {availableDates.map((date, index) => (
          <StyledButton
            className="date"
            key={index}
            variant={date === selectedDate ? "contained" : "outlined"}
            onClick={() => setSelectedDate(date)}
          >
            {new Date(date).toLocaleDateString("fr-FR")}
          </StyledButton>
        ))}
        <StyledButton onClick={goToNextDate} variant="contained">
          <KeyboardDoubleArrowRightIcon />
        </StyledButton>
      </EventListHeader>

      {events.length === 0 ? (
        <Typography variant="h6">Aucun événement pour cette date.</Typography>
      ) : (
        <EventListing>
          {events.map((event) => (
            <Event key={event.id}>
              <Typography>
                {event.team1}
                {event.score1 > event.score2 && event.team1_bonus && (
                  <OffensiveBonus />
                )}
                {event.score1 < event.score2 && event.team1_bonus && (
                  <DefensiveBonus />
                )}
              </Typography>
              <Typography className="score">
                {event.score1 > event.score2 ? (
                  <span>
                    <strong>{event.score1}</strong> - {event.score2}
                  </span>
                ) : (
                  <span>
                    {event.score1} - <strong>{event.score2}</strong>
                  </span>
                )}
              </Typography>
              <Typography>
                {event.score1 > event.score2 && event.team2_bonus && (
                  <DefensiveBonus />
                )}
                {event.score1 < event.score2 && event.team2_bonus && (
                  <OffensiveBonus />
                )}
                {event.team2}
              </Typography>
            </Event>
          ))}
        </EventListing>
      )}
    </EventListContainer>
  );
}

export default EventList;
