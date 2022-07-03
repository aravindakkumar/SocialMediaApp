import React, { useContext,useState } from 'react'
import {TextField,Container, Button, CircularProgress} from '@mui/material';
import {gql, useMutation } from '@apollo/client'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/auth';

const Register = () => {

  const navigate = useNavigate()
  const context = useContext(AuthContext)
  let initial = {
      username : '',
      email : '',
      password : '',
      confirmPassword : ''
    }
    const [values, setValues] = useState(initial)

    const handleChange = (e)=> {
      e.preventDefault()
      const {name, value} = e.target
      // console.log(name)
      setValues({...values, [name]: value})

    
    }
    

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
      update(_, {data : {register : userData}}){
        console.log(userData)
        context.login(userData)
        navigate('/')
      },
            
      variables : values
    })

    const handleSubmit = (e)=> {
      e.preventDefault()
      // console.log(values)
      if(values.confirmPassword && values.password && values.email && values.username){
      addUser()      
      }
      
      }
      
   

  return (
    <>

    
    <div className='login'>
    {
      loading ? <CircularProgress /> :
    
        <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <TextField style={{margin: "10px 0", borderRadius: "20px"}}
          required fullWidth onC
          id="1"
          label="Username"
          type="text"
          name='username'
          value={values.username}
          onChange={handleChange}
        />

         <TextField style={{margin: "10px 0", borderRadius: "20px"}}
          required fullWidth
          id="2"
          label="Email"
          type="email"  
          name='email'
          value={values.email}  
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

          <TextField style={{margin: "10px 0", borderRadius: "20px"}}
          required fullWidth
          id="4"
          label="Confirm Password"
          type="password" 
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <Button fullWidth style={{margin: "10px 0", borderRadius: "20px"}} variant='contained' color="secondary" type='submit'>Submit</Button>

      </form>
    }
       
      </div>
    </>
  )
}
const REGISTER_USER = gql`
mutation register(
  $username : String!
  $email : String!
  $password : String!
  $confirmPassword : String!
){
  register(
    registerInput : {
      username : $username
      email : $email
      password : $password
      confirmPassword : $confirmPassword

    }
  ){
    id
    email
    username
    createdAt
    token
  }
}
`

export default Register
