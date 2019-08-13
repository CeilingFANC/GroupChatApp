import React from 'react';
import ChatPanel from './chatPanel';
import ChatContent from './chatContent';
import AddRoom from './addRoom';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

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

function ChatContainer(props){

    const classes = useStyles();

    const arr =[];
    console.log(props.current);
    return <div className="classes.root" style={{padding:'10px'}} >


        <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={9}>
                <AppBar position="static" color="default">
                    <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {props.current.thread.thread_id?props.current.thread.thread_name:'Echo'}
                    </Typography>
                    </Toolbar>
                </AppBar>  
                <Paper className={classes.paper}> 
                    <div style={{position:'relative'}}>
                        <ChatContent conversations={arr}  />
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
                    <ChatPanel  />
                </Paper> 
                
                {
                    !props.current.user._id?'':
                    <Grid item xs>
                        <AppBar position="static" color="default">
                            <Toolbar>
                            <Typography variant="h6" color="inherit">
                                New Room
                            </Typography>
                            </Toolbar>
                        </AppBar>  
                        <Paper className={classes.paper}>
                            <AddRoom  />
                        </Paper> 
                    </Grid>
                }
            </Grid>
            
        </Grid>
        
    </div>;
    
}


const mapStateToProps = state => {
    return {
      current: state.current,
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);