import React, { useContext, useState } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CircularProgress,Card, CardContent, Typography, CardActions, Button, Grid, TextField } from '@mui/material';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton';

function SinglePost(props) {
const {postId} = useParams()
const { user } = useContext(AuthContext);


const [comment, setComment] = useState('')

const [submitComment] = useMutation(SUBMIT_COMMENT, {
update(){
setComment('')
},
variables : {
postId,
body : comment
}
})

const handleClick = (e)=> {
e.preventDefault()
// console.log(comment)
submitComment()
}

let post = null;

const {loading, data} = useQuery(FETCH_POST_QUERY, {

variables : {postId}
})
if(data){
post = data.getPost
// console.log(data)
}

return(
< >
{loading ? <CircularProgress /> : <>
    <Card className='singlePost' style={{borderRadius: "30px"}}>
<CardContent>
    <Typography  style={{textDecoration : "none", color: "maroon" , fontSize: "20px" }}  gutterBottom>
    {post.username}
    </Typography>
    <Typography style={{fontSize: "small", marginTop : "5px"}}  gutterBottom>
                {moment(post.createdAt).fromNow(true)} 
    </Typography>
    
    <Typography variant="body2">
    {post.body}
    </Typography>
</CardContent>
<CardActions>
    <LikeButton user={user} post={post} />

    {user && user.username === post.username && (<DeleteButton postId={post.id}/>)}

</CardActions>
</Card>

<div className='singlePost'>
{user && <Card style={{ borderRadius: "25px", padding : "10px 20px"}}>
<form >
<p>Post a comment</p>
    <TextField type="text" placeholder='Enter something....' name="body" value={comment} 
        onChange={(e)=> setComment(e.target.value)}  variant="standard" size="small"
    ></TextField>

    <Button variant='outlined' size="small" color="primary" style={{margin : "0 20px"}}  onClick={handleClick}>Submit</Button>
</form>
</Card>}
</div>


<Grid>
{post.comments.map((comment, index)=> (
    <Grid key={index} item xs={12} >
    <Card className="singlePost" style={{borderRadius : "30px"}}>
    <CardContent >
    <div className='random'>
    <Typography style={{textDecoration : "none", color: "maroon" , fontSize: "20px" }}  gutterBottom>
        {comment.username}
    </Typography>

     {user && user.username === comment.username &&(
            <DeleteButton postId={post.id} commentId={comment.id}>Delete</DeleteButton>
        )}

    </div>

    <Typography style={{fontSize: "small", marginTop : "5px"}}  gutterBottom>
                {moment(comment.createdAt).fromNow(true)} 
    </Typography>
    
    <Typography variant="body2">
        {comment.body}
    </Typography>


    </CardContent>

    
     </Card>
       
    </Grid>                
))}


</Grid>    
</>}
</>

)
}

const FETCH_POST_QUERY = gql`
query getPost($postId: ID!) {
getPost(postId: $postId) {
id
body
createdAt
username
likeCount
likes {
username
}
commentCount
comments {
id
username
createdAt
body
}
}
}
`
const SUBMIT_COMMENT = gql`
mutation createComment($postId : String!, $body: String!){
createComment(postId : $postId, body: $body){
    id
    comments{
        id
        body
        createdAt
        username
    }
    commentCount
}
}
`

export default SinglePost;