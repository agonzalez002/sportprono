import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Grid2, Paper, styled } from "@mui/material";

export const StyledGroupContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "5px",
  flexGrow: "1",
  marginTop: "50px",
}));

export const StyledBox = styled(Box)(() => ({
  minWidth: "1200px",
  display: "flex",
  justifyContent: "center",

  "&.group-content": {
    margin: "15px 0px",
  },
  "&.searchBox": {
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "&.paginate": {
    padding: "5px",
  },
}));

export const StyledGrid2 = styled(Grid2)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "900px",
}));

export const StyledPaper = styled(Paper)(() => ({
  border: "2px solid",
  borderTopLeftRadius: "25px",
  borderTopRightRadius: "25px",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "25px",
  "&:input": {
    height: "25px",
  },
  padding: "2px 10px",
  display: "flex",
  alignItems: "center",
  width: "300px",
}));

export const StyledButton = styled(Button)(() => ({
  borderTopLeftRadius: "25px",
  borderTopRightRadius: "25px",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "25px",
}));

export const StyledUL = styled("ul")(({ theme }) => ({
  position: "absolute",
  top: "40px",
  left: "15px",
  overflowY: "auto",
  maxHeight: "221px",
  width: "80%",
  border: `2px solid ${theme.palette.primary.main}`,
  listStyle: "none",
  padding: "0px",
  margin: "0px",
  backgroundColor: theme.palette.background.default,
  zIndex: "1",

  "& li": {
    padding: "10px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export const GroupListBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const PaginateBox = styled(Box)(() => ({
  marginTop: "20px",
}));

export const StyledNavigateBeforeIcon = styled(NavigateBeforeIcon)(
  ({ theme }) => ({
    padding: "5px",
    marginRight: "10px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.light,
    },
  })
);

export const StyledNavigateNextIcon = styled(NavigateNextIcon)(({ theme }) => ({
  padding: "5px",
  marginLeft: "10px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.primary.light,
  },
}));
