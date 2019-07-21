import React from 'react';
import ChatPanel from './chatPanel';
import ChatContent from './chatContent';

//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '10px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ChatContainer(){


    
    const classes = useStyles();

    const arr =[{'author':'a','text':"my name is a"},{'author':'b','text':"my name is b"}];
    const user = {'id':'c','name':'ccc'};
    const ls = [{'room':{'name':'first'}},{'room':{'name':'second'}}];
    return <div className="classes.root" style={{padding:'10px'}} >
        <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={9}>
                <AppBar position="static" color="default">
                    <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Current
                    </Typography>
                    </Toolbar>
                </AppBar>  
                <Paper className={classes.paper}> 
              
                    <ChatContent user={user} conversations={arr}/>
                </Paper>
            </Grid>
            <Grid item xs>
                <AppBar position="static" color="default">
                    <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Conversations
                    </Typography>
                    </Toolbar>
                </AppBar>  
                <Paper className={classes.paper}>
                    <ChatPanel user={user} threads={ls}/>
                </Paper> 
            </Grid>
        </Grid>
    </div>;
    
}

