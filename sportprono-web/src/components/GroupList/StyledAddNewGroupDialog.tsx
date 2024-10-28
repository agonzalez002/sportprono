import { FormLabel, Radio, styled, TextField, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
}));

export const StyledRadio = styled(Radio)(() => ({
    padding: '0px 10px',
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginBottom: '5px',
}));

export const StyledTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    marginTop: '10px',
    '& .MuiInputLabel-root': {
        color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Change la couleur du label
    },
}));