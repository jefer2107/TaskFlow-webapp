import { UserInputAuthenticate } from "../../models/UserModel";
import { AbstractValidatorFactory, Validate } from "../AbstractValidatorFactory";

export class UserAuthenticateValidator extends AbstractValidatorFactory<UserInputAuthenticate>{
    getValidate(): Validate<UserInputAuthenticate>[] {
        return [

            {
                field:'email',
                validate: (value:any, addError:(message:string) => void) => {
                    if(!value) addError('O campo email deve ser preenchido')

                    if(!value.includes("@") || !value.includes(".")) 
                        addError('Formato de email inválido')
                }
            },
            {
                field:'password',
                validate: (value:any, addError:(message:string) => void) => {
                    if(!value) addError('O campo senha deve ser preenchido')

                    if(value.length !== 8) addError('Senha deve ter 8 caracteres')
                }
            }
        ]
    }
}