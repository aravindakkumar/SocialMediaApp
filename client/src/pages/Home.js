import React, { useContext } from 'react'
import {useQuery, gql} from '@apollo/client'
import {Grid, CircularProgress } from '@mui/material'
import CustomCard from '../Components/CustomCard'
import {AuthContext} from '../context/auth'
import PostForm from '../Components/PostForm'
const Home = () => {
  const {loading, data } = useQuery(FETCH_POSTS)
  const {user} = useContext(AuthContext)

  return (
    <div className='posts'>
    <h2>Recent Posts</h2>
      <Grid container spacing={2}>        
        
        {
          user && <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PostForm />
            </Grid>
          </>
        }

          {
            loading ? (<CircularProgress />) :
            (
              data.getPosts && data.getPosts.map((post,index) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>

                <CustomCard key={index} post={post} index={index} />

              </Grid>

              ))
            )
          }
        </Grid>
        
       

    </div>
  )
}

const FETCH_POSTS = gql`
  {getPosts{
    id
    body
    createdAt
    username
    likeCount
    likes{
      username
    }
    commentCount
    comments{
      id
      username
      createdAt
      body
    }
  }}
`

export default Home
