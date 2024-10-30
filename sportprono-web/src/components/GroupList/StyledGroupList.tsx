import { Box, Paper, Grid2, styled, Button } from "@mui/material";

export const StyledGroupContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5px',
    flexGrow: '1',
    marginTop: '50px',
}));

export const StyledBox = styled(Box)(() => ({
    minWidth: '1200px',

    '&.group-content': {
        margin: '15px 0px',
    },
    '&.searchBox': {
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    '&.paginate': {
        padding: '5px',
    }
}));

export const StyledGrid2 = styled(Grid2)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const StyledPaper = styled(Paper)(() => ({
    border: '2px solid',
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
    '&:input': {
        height: '25px',
    },
    padding: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    width: '300px',
}));

export const StyledButton = styled(Button)(() => ({
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
}));