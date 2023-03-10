import jwt from 'jsonwebtoken';
import FormInputs from "../models/FormInputs";
import User from "../models/UserModel";
import { userService } from "../services/UserService";

const verifyToken = (token: string, input: FormInputs, callback: Function) => {
    jwt.verify(token, process.env.TOKEN_KEY as string, () => {
        userService.loginUser(input, (result: User) => {
            if (input.username === result.username) {
                return callback(result)
            }
            return callback("fail")
        })
    })
}

export default verifyToken