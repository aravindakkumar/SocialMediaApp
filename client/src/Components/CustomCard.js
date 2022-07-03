import  React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment'
import { Link } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import LikeButton from './LikeButton';
import {AuthContext} from '../context/auth'
import DeleteButton from './DeleteButton';
import { Avatar } from '@mui/material';

export default function OutlinedCard(props) {
  const {user} = useContext(AuthContext)

    const {post} = props
    const {body, createdAt, id, username, likeCount, commentCount, likes} = post

 
   const randomColor = Math.floor(Math.random()*16777215).toString(16)
  return (
    <div  >
    
      <Card variant="elevation" style={{borderRadius : "20px"}} className='customCard'>
            <CardContent >
            <div className='cardFlexBox'>

            <Typography style={{textDecoration : "none", color: "maroon" , fontSize: "20px" }}  gutterBottom >
                {username} 
              
              <Typography style={{fontSize: "small", marginTop : "5px"}}  gutterBottom>
                {moment(createdAt).fromNow(true)} 
            </Typography>
            </Typography>

            <Avatar style={{backgroundColor: `#${randomColor}`}}>{username.substr(0,1).toUpperCase()}</Avatar>
            </div>     
            
            <Typography variant="body2"  >
                {body.substr(0, 21) } 
                {body.length > 20 && <Link style={{textDecoration : "none"}} to={`/posts/${id}`}>...Read More</Link>}
                
            </Typography>
            </CardContent>

            <CardActions>

            <div className='buttonsCArd'>
                <LikeButton user={user} post={{id,likes, likeCount }} />
                <Link style={{paddingTop: "3px", textDecoration: "none", color:"blue"}}   to={`/posts/${id}`} ><CommentIcon />&nbsp;{commentCount}</Link>
            {user && user.username === username && (<DeleteButton  postId={id}/>)}
            </div>
                
            </CardActions>
      </Card>
    </div>
  );
}
