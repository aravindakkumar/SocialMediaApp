import React , {createContext, useReducer} from 'react'
import jwtDecode from 'jwt-decode'
const initialState = {
    user : null
}

if(localStorage.getItem('jwtToken')){
    const decodedtoken = jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedtoken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')

    }
    else{
        initialState.user = decodedtoken
    }
}

const AuthContext = createContext({
    user : null,
    login : (userData)=> {},
    logout : ()=> {}
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user : action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user : null
            }
        default :
            return state
    }
}

function AuthProvider(props){

    const [state, dispatch] = useReducer(authReducer, initialState)
    const login = (userData)=> {
        localStorage.setItem('jwtToken', userData.token)
        dispatch({type : 'LOGIN',
        payload : userData
    })
    }

    const logout = ()=> {
        dispatch({type : "LOGOUT"})
        localStorage.removeItem('jwtToken')
    }

    return(
        <AuthContext.Provider 
        value={{user : state.user, login, logout}}
        {...props}></AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
