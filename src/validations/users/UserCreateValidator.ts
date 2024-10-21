import { UserInputAuthenticate, UserInputCreate } from "../../models/UserModel";
import { AbstractValidatorFactory, Validate } from "../AbstractValidatorFactory";

export class UserCreateValidator extends AbstractValidatorFactory<UserInputCreate>{
    getValidate(): Validate<UserInputCreate>[] {
        return [
            {
                field:'name',
                validate: (value:any, addError:(message:string) => void) => {
                    if(!value) addError('O campo nome deve ser preenchido')
                }
            },
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