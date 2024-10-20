import { ChoreInputCreate } from "../../models/ChoreModel";
import { AbstractValidatorFactory, Validate } from "../AbstractValidatorFactory";

export class ChoreCreateValidator extends AbstractValidatorFactory<ChoreInputCreate>{

    getValidate(): Validate<ChoreInputCreate>[] {
        return [

            {
                field:'title',
                validate: (value:any, addError:(message:string) => void) => {
                    if(!value) addError('O campo title deve ser preenchido')
                }
            },
            {
                field:'description',
                validate: (value:any, addError:(message:string) => void) => {
                    if(!value) addError('O campo descrição deve ser preenchido')
                }
            }
        ]
    }
}