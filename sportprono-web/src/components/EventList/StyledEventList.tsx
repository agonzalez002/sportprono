import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box, Button, styled } from "@mui/material";

export const EventListContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const EventListHeader = styled(Box)(() => ({
  width: "600px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const EventListing = styled(Box)(({ theme }) => ({
  width: "900px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${theme.palette.primary.main}`,
  borderBottom: "none",
}));

export const Event = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  width: "100%",
  padding: "15px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  p: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px",
    flex: "1",
    span: {
      strong: {
        color: `${theme.palette.primary.main}`,
        fontWeight: "700",
      },
    },
  },
}));

export const OffensiveBonus = styled(LocalOfferIcon)(() => ({
  color: "#FFD700",
  fontSize: "14px",
  margin: "0px 5px",
}));

export const DefensiveBonus = styled(LocalOfferIcon)(() => ({
  color: "#C0C0C0",
  fontSize: "14px",
  margin: "0px 5px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "0px",
  "&.date": {
    flex: "1",
    "&:hover": {
      borderColor: `${theme.palette.primary.main}`,
    },
  },
}));
