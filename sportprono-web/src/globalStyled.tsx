import { styled } from "@mui/material";

export const StyledBack = styled("p")(({ theme }) => ({
  position: "absolute",
  top: "20px",
  left: "20px",
  span: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main,
    },
  },
  backgroundColor: theme.palette.background.default,
  margin: "0",
}));
