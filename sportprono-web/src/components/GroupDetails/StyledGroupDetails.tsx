import SettingsIcon from "@mui/icons-material/Settings";
import { styled } from "@mui/material";

export const StyledGroupDetails = styled("div")(() => ({
  width: "100%",
  padding: "0px 10px",
  boxSizing: "border-box",
  paddingTop: "40px",
}));

export const GroupHeader = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const TitleContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  h1: {
    margin: "0px",
  },
}));

export const StyledSettingsIcon = styled(SettingsIcon)(({ theme }) => ({
  marginLeft: "20px",
  fontSize: "35px",
  color: theme.palette.text.primary,
  opacity: "0.4",
  "&:hover": {
    cursor: "pointer",
    color: theme.palette.primary.main,
    opacity: "1",
  },
}));
