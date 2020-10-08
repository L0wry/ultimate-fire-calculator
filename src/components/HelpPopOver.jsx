import React from 'react';
import {
    makeStyles,
    Typography,
    Popover,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        width: 150
    },
    text: {
        color: theme.palette.text.tertiary
    },
    help: {
        color: theme.palette.text.tertiary,
    },
    popover: {
        pointerEvents: 'none',
    },
}));


export default function MouseOverPopover({helpTextToRender}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <HelpOutlineIcon
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                className={classes.help}
            />

            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography color="textSecondary" >
                    {helpTextToRender}
           </Typography>
            </Popover>
        </div>
    );
}