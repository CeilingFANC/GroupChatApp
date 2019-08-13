import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles(theme => ({

    textField: {
        marginLeft:'5%',
        marginRight: '5%',
        width:'90%',
    },

  }));

export default function ChatInput(props){
    const classes = useStyles();
    return <div>
            <TextField
                id="outlined-bare"
                className={classes.textField}
                defaultValue=""
                margin="normal"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <KeyboardReturn />
                    </InputAdornment>
                    ),
                }}
                onKeyDown={props.handleKeyPress}
            />
        </div> 
    ;
}