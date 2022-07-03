import React, {useState} from 'react'
import {gql,useMutation} from '@apollo/client'
import { Card, Typography, CardContent,CardActions, Button , TextField} from '@mui/material'

const PostForm = () => {
    const initaial = {
        body : ""
    }
        const [values, setValues] = useState(initaial)

    const [createPost] = useMutation(CREATE_POST,{
        variables : values,
        update(_, result){
            console.log(result);
            values.body = ''
        }
    })

    const handleChange = (e)=> {
        const {name, value} = e.target
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleSubmit = async(e)=> {
        e.preventDefault()
        createPost()
        window.location = "/"
    }
return (
    <div className="createForm">
       
<Card sx={{ minWidth: 275, borderRadius : "15px" }}>
 <form onSubmit={handleSubmit}>
      <CardContent>        
        <Typography sx={{ color: "black" , marginBottom : "10px"}} color="text.secondary">
          Create a Post 
        </Typography>  
        

        <TextField style={{margin: "10px 0", borderRadius: "20px", color: "white"}}
          noValidate autoComplete='off' autoCapitalize='on'
          required fullWidth 
          multiline
          maxRows={3}
          id="1"
          label="Write Something here..."
          type="text"
          name='body'
          value={values.body}
          onChange={handleChange}
        />
              <Button variant='contained' style={{borderRadius : "10px"}} color='secondary' type="submit" size="medium">Post</Button>

      </CardContent>

     
</form>
</Card>

     </div>
)
}

const CREATE_POST = gql`
    mutation ($body : String!){
        createPost(body : $body){
    id
    body
    createdAt
    likes{
        id 
        username
        createdAt
    }
    likeCount
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

export default PostForm
