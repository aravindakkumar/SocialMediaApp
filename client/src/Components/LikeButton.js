import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Button } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({user, post : {id, likeCount, likes}}) => {
  const [liked, setLiked] = useState(false)

  const [likePost] = useMutation(LIKE_POST, {
   
    variables : {postId : id}
  })




  useEffect(()=> {
    if(user && likes.find(like=> like.username === user.username)){
      setLiked(true)
    }
    else{
      setLiked(false)
    }
  }, [user, likes])

  const likeButton = user ? (
    liked ? (
       <Button  color='secondary'>
          <FavoriteBorderIcon /> &nbsp;
          {likeCount}
        </Button>
    ) : (
       <Button color="warning">
          <FavoriteBorderIcon />&nbsp;
          {likeCount}
        </Button>
    )
  ) : (
     <Button as={Link} to="/login" color="warning">
          <FavoriteBorderIcon />&nbsp;
          {likeCount}
        </Button>
  )


  return (
    <div>
      <Button as="div" onClick={likePost}>
        {likeButton}     
      </Button>
     

    </div>
  )
}

const LIKE_POST = gql`
  mutation likePost($postId : ID!){
    likePost(postId : $postId){
      id
      likes{
        id
        username
      }
      likeCount
    }
  }
`

export default LikeButton
