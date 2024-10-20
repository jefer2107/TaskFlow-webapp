export interface Validate<T>{
    field:keyof T;
    validate: (value:any, addError:(message:string) => void) => void;
}

export abstract class AbstractValidatorFactory<T>{
    constructor(){}

    errorMessage(model:T): string[] | null {
        const erros:string[] | null = []
        const validate = this.getValidate()

        validate.forEach((item:Validate<T>) => {
            item.validate(model[item.field], (message:string) => {
                erros.push(message)
            })
        })

        return erros.length === 0? null: erros
    }

    abstract getValidate():Validate<T>[];
}