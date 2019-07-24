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

    const [currentThread, setCurrentThread] = React.useState('');
 
    const fun = thread => setCurrentThread(thread);   
    const [currentUser, setCurrentUser] = React.useState('');
    const changeUser = user => setCurrentUser(user);
    console.log(currentUser);
    const classes = useStyles();

    const arr =[];
    const ls = [{'room':{'name':'first'}},{'room':{'name':'second'}}];
    return <div className="classes.root" style={{padding:'10px'}} >


        <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={9}>
                <AppBar position="static" color="default">
                    <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {currentThread?currentThread:'Void'}
                    </Typography>
                    </Toolbar>
                </AppBar>  
                <Paper className={classes.paper}> 
                    <div style={{position:'relative'}}>
                        <ChatContent user={currentUser} conversations={arr} current={currentThread} />
                    </div>
                    
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
                    <ChatPanel user={currentUser} threads={ls} setCurrent={fun} setUser={changeUser}/>
                </Paper> 
            </Grid>
        </Grid>
    </div>;
    
}

