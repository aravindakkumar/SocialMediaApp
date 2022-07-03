import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth';
import { Avatar, Button } from '@mui/material';


export default function ButtonAppBar() {
  const {user, logout} = React.useContext(AuthContext)
     const randomColor = Math.floor(Math.random()*16777215).toString(16)

console.log(user)
  return (
    
    <AppBar position="static" color='' style={{borderRadius : "15px", margin : "25px 0"}}>
        <div className='appBar'>
        <div className='left'>
         <Link to=""><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography></Link>  
        </div>   


        <div className='center'>
           <Link style={{textDecoration : "none"}}     to="/"><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span className="headLink">Post 'Em</span>
          </Typography></Link> 
        </div>
       

       <div className="right">
        {user && (
          <>
          <Avatar  style={{margin: "0 5px", backgroundColor : `#${randomColor}`}}>{user.username.substr(0,1).toUpperCase()}</Avatar>
          <Typography style={{margin: "0 5px"}} className='links' variant='h6'>{user.username}</Typography></>
        )}       

        {user && <div style={{margin: "0 10px"}} className='logout'><Button color="primary" variant="outlined" onClick={logout}>Logout</Button> </div>}





        {!user && <>
        
        <Link  style={{textDecoration : "none"}} className="links"  to="/login"><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span className='links'>Login</span>
          </Typography></Link>
          
          
          
          <Link   style={{textDecoration : "none"}} className="links" to="/register"><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span className='links'>Regsiter</span>
          </Typography></Link>
         
        </>}
        </div>

        </div>
       

      </AppBar>
   
  );
}