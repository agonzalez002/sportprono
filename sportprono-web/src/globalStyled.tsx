import { styled } from "@mui/material";

export const StyledBack = styled("p")(({ theme }) => ({
  width: "100%",
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
  padding: "20px",
}));
