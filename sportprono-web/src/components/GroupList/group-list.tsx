import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchGroups } from "../../hooks/fetch-groups";
import { useAuth } from "../../hooks/useAuth";
import { GroupType } from "../../interfaces";
import { getSearchGroups } from "../../services/groupServices";
import GroupItem from "../GroupItem/group-item";
import AddNewGroupDialog from "./AddNewGroupDialog";
import {
  GroupListBox,
  PaginateBox,
  StyledBox,
  StyledButton,
  StyledGrid2,
  StyledGroupContent,
  StyledNavigateBeforeIcon,
  StyledNavigateNextIcon,
  StyledPaper,
  StyledUL,
} from "./StyledGroupList";

function GroupList() {
  const { authData } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, nextPage, previousPage } = useFetchGroups(currentPage);
  const [groupsData, setGroupsData] = useState<GroupType[]>([]);
  const [searchCode, setSearchCode] = useState<string>("");
  const [results, setResults] = useState<GroupType[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(data)) {
      setGroupsData(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchGroups = async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setSearchLoading(true);
      try {
        if (authData) {
          const response = await getSearchGroups(query, authData.token);
          setResults(response);
        }
      } catch (error) {
        console.error("Erreur de recherche :", error);
      } finally {
        setSearchLoading(false);
      }
    };

    const timer = setTimeout(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fetchGroups(searchCode);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchCode, authData]);

  const handleAddNewGroup = () => {
    setOpen(true);
  };

  const handleClick = (id: number) => {
    navigate(`/details/${id}`);
  };

  const onGroupCreated = (newGroup: GroupType) => {
    setOpen(false);
    setGroupsData((prevGroups) => [...prevGroups, newGroup]);
  };

  return (
    <StyledGroupContent>
      <StyledBox className="searchBox">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "420px",
            position: "relative",
          }}
        >
          <StyledPaper>
            <SearchIcon />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Rechercher"
              inputProps={{ "aria-label": "rechercher" }}
              onChange={(e) => setSearchCode(e.target.value)}
            />
          </StyledPaper>
          {results.length > 0 && (
            <StyledUL>
              {results.length > 0
                ? results.map((group) => (
                    <li key={group.id} onClick={() => handleClick(group.id)}>
                      {group.name} (Code: {group.searchCode})
                    </li>
                  ))
                : !searchLoading && searchCode && <p>Aucun résultat trouvé.</p>}
            </StyledUL>
          )}
        </Box>

        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewGroup}
        >
          Créer un groupe
        </StyledButton>
      </StyledBox>

      <StyledBox className="group-content">
        {groupsData.length !== 0 ? (
          <GroupListBox>
            <StyledGrid2
              container
              spacing={3}
              columns={{ xs: 4, sm: 9, md: 12 }}
            >
              {groupsData.map((group: GroupType) => {
                return <GroupItem key={group.name} group={group} />;
              })}
            </StyledGrid2>
            <PaginateBox>
              {previousPage && (
                <StyledNavigateBeforeIcon
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              )}
              {nextPage && (
                <StyledNavigateNextIcon
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              )}
            </PaginateBox>
          </GroupListBox>
        ) : (
          <h2>Vous n'avez ou ne faites partie d'aucun Groupe de jeu</h2>
        )}
      </StyledBox>
      <AddNewGroupDialog
        open={open}
        setOpen={setOpen}
        onGroupCreated={onGroupCreated}
      />
    </StyledGroupContent>
  );
}

export default GroupList;
