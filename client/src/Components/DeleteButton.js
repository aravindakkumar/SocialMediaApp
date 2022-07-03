import React from "react";
import {gql, useMutation} from '@apollo/client'
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({postId, commentId}) => {
  const mutationss = commentId ? DELETE_COMMENT : DELETE_POST

    const [deletePostorMutation] = useMutation(mutationss, {
       update(_, result){
            console.log(result);
            if(commentId){
              window.location = "/posts/" + postId
            }
            else{
              window.location = "/"
            }
        },
        variables : {
            postId,
            commentId
        }
    })
    // const deletePost = (e)=> {
    //     console.log(postId)
    // }

  return (
    <div>
      <Button style={{position : "relative", left : "50px"}} onClick={()=>deletePostorMutation()} ><DeleteIcon color="error" fontSize="medium" /></Button>
    </div>
  )
}

const DELETE_POST = gql`
    mutation deletePost($postId : String!){
        deletePost(postId : $postId)
    }
`

const DELETE_COMMENT = gql`
    mutation deleteComment($postId : ID!, $commentId : ID!){
      deleteComment(postId : $postId, commentId : $commentId){
        id
        comments{
          id
          username
          createdAt
          body
        }
        commentCount
      }
    }
`

export default DeleteButton
