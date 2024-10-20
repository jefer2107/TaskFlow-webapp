import { CategoryInputCreate } from "../../models/CategoryModel";
import { AbstractValidatorFactory, Validate } from "../AbstractValidatorFactory";

export class CategoryValidator extends AbstractValidatorFactory<CategoryInputCreate>{

    getValidate(): Validate<CategoryInputCreate>[] {
        return [

            {
                field:'name',
                validate: (value:any, addError:(message:string) => void) => {
                    if(!value) addError('O campo name deve ser preenchido')
                }
            }
        ]
    }
}