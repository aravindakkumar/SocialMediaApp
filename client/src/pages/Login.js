import React, { useContext,useState } from 'react'
import {TextField,Container, Button, CircularProgress} from '@mui/material';
import {gql, useMutation } from '@apollo/client'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/auth';

const Login = () => {

  const context = useContext(AuthContext)
  const navigate = useNavigate()


  let initial = {
      username : '',
      password : ''
    }
    const [values, setValues] = useState(initial)

    const handleChange = (e)=> {
      e.preventDefault()
      const {name, value} = e.target
      // console.log(name)
      setValues({...values, [name]: value})
     
    
    }    

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
      update(_, {data : {login: userData}}){
                console.log(userData)

      context.login(userData)
       navigate('/')
      },
            
      variables : values
    })

    const handleSubmit = (e)=> {
      e.preventDefault()
      if(values.password && values.username){
       loginUser()
      }
     
      
    }

  return (
    <>
    <div className='login'>
    
    
    {
      loading ? <CircularProgress /> :
    
        <form onSubmit={handleSubmit}>
        <h1 >Login</h1>

        <TextField style={{margin: "10px 0", borderRadius: "20px", color: "white"}}

          required fullWidth 
          id="1"
          label="Username"
          type="text"
          name='username'
          value={values.username}
          onChange={handleChange}
        />

          <TextField style={{margin: "10px 0", borderRadius: "20px"}}
          required fullWidth
          id="3"
          label="Password"
            type="password"
            name='password'
            value={values.password}
          onChange={handleChange}
   
        />
        <Button fullWidth style={{margin: "10px 0", borderRadius: "20px"}} variant='contained' color="secondary" type='submit'>Submit</Button>

      </form>
    }
       
      
    </div>
    </>
  )
}
const LOGIN_USER = gql`
mutation login(
  $username : String!
  $password : String!
){
  login(
    username : $username password : $password
  ){
    id
    email
    username
    createdAt
    token
  }
}
`

export default Login
