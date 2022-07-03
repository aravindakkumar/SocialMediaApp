import userModel from '../../models/users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-errors'
import {validateRegisterInput,validateLoginInput} from '../../utils/validators.js'

const SECRET_KEY = "some very secret key"

export default {
    Mutation : {
        async register(_, {registerInput : {username, email, password, confirmPassword}}, context, info){

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }
            
            const user = await userModel.findOne({username})
            if(user){
                throw new UserInputError("Username is taken",{
                    errors : {
                        username : 'This username is taken'
                    }
                })
            }
            // TODO =: Hash the password and create Auth token

            password = await bcrypt.hash(password, 12)

            const newUser = userModel({
                email,
                username,
                password,
                createdAt : new Date().toISOString()
            })
            const res = await newUser.save()

            const token = jwt.sign({
                id : res._id,
                email : res.email,
                username : res.username
            }, SECRET_KEY, {expiresIn : '1h'})

            return {
                ...res._doc,
                id : res._id,
                token
            }
        },

        async login(_, {username, password}){
            const {errors, valid} = validateLoginInput(username, password);
            if(!valid){
                throw new UserInputError("wrong credentials", {errors})
            }
            
            const user = await userModel.findOne({username})
            if(!user){
                errors.general = "user not found"
                throw new UserInputError("user not found", {errors})
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = "Wrong credentials"
                throw new UserInputError("wrong credentials", {errors})
            }

            const token = jwt.sign({
                id : user._id,
                email : user.email,
                username : user.username
            }, SECRET_KEY, {expiresIn : '1h'})

             return {
                ...user._doc,
                id : user._id,
                token
            }

        },
                       
        
        

        
    }
}
