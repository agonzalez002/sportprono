import AddIcon from "@mui/icons-material/Add";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchGroup from "../../hooks/fetch-group";
import { useAuth } from "../../hooks/useAuth";
import { GroupFullType, MemberType } from "../../interfaces";
import { joinGroup, leaveGroup } from "../../services/groupServices";
import EventList from "../EventList/event-list";
import User from "../User/user";
import {
  GroupHeader,
  StyledGroupDetails,
  StyledSettingsIcon,
  TitleContainer,
} from "./StyledGroupDetails";

function GroupDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authData } = useAuth();
  const [groupDetails, loading] = useFetchGroup(id);
  const [group, setGroup] = useState<GroupFullType | null>(null);
  const [inGroup, setInGroup] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const trophyColor = {
    gold: "#FFD700",
    silver: "#C0C0C0",
    bronze: "#CD7F32",
  };

  useEffect(() => {
    if (groupDetails && typeof groupDetails !== "boolean") {
      if (groupDetails.members) {
        groupDetails.members.sort((a, b) => b.points - a.points);
        const availableTrophies = ["gold", "silver", "bronze"] as const;
        let currentTrophy = 0;
        groupDetails.members.map((m, index) => {
          if (index === 0) {
            m.trophy = availableTrophies[currentTrophy];
          } else {
            if (m.points !== groupDetails.members[index - 1].points) {
              currentTrophy++;
            }
            if (currentTrophy < availableTrophies.length) {
              m.trophy = availableTrophies[currentTrophy];
            }
          }
        });

        if (authData?.user) {
          setInGroup(
            !!groupDetails.members.find(
              (member: MemberType) => member.user.id === authData.user.id
            )
          );
          setIsAdmin(
            !!groupDetails.members.find(
              (member: MemberType) => member.user.id === authData.user.id
            )?.admin
          );
        }
      }
      setGroup(groupDetails);
    }
  }, [groupDetails, authData]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const join = async () => {
    if (!authData) {
      toast.warning("Tu dois être connecté pour rejoindre un groupe !");
      return;
    }

    if (group) {
      const joined = await joinGroup(
        { user: authData.user.id, group: group.id },
        authData.token
      );
      if (joined) {
        if (joined.type === "warning") {
          toast.warning(joined.message);
        } else {
          toast.success(joined.message);
        }
      }
    }
  };

  const leave = async () => {
    if (!authData) {
      toast.warning("Tu dois être connecté pour quitter un groupe !");
      return;
    }

    if (group) {
      const leaved = await leaveGroup(
        { user: authData.user.id, group: group.id },
        authData.token
      );
      if (leaved) {
        toast.success(leaved.message);
      }
    }
  };

  const addEvent = async () => {
    navigate(`/group-admin/${group?.id}`, { state: { group } });
  };

  return (
    <StyledGroupDetails>
      {group && (
        <>
          <GroupHeader>
            <TitleContainer>
              <h1>{group?.name}</h1>
              {inGroup ? (
                <>
                  {!isAdmin && (
                    <Button
                      onClick={() => leave()}
                      variant="contained"
                      color="primary"
                    >
                      <LogoutIcon /> Quitter
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={() => join()}
                  variant="contained"
                  color="primary"
                >
                  <AddIcon /> Rejoindre
                </Button>
              )}
              {isAdmin && <StyledSettingsIcon onClick={() => addEvent()} />}
            </TitleContainer>
            <p>Créé par: {group?.creator.toUpperCase()}</p>
          </GroupHeader>

          <EventList />

          <h3>Members :</h3>
          {group.members.map((member) => {
            return (
              <div key={member.user.id}>
                <Badge
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    !!member.trophy && (
                      <EmojiEventsIcon
                        sx={{ color: trophyColor[member.trophy] }}
                      />
                    )
                  }
                >
                  <User user={member.user} accessAccount={false} />
                </Badge>
                <p>{member.points} pts</p>
              </div>
            );
          })}
        </>
      )}
    </StyledGroupDetails>
  );
}

export default GroupDetails;
