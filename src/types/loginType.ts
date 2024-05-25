export interface loginFormType{
     email: string,
    password: string, 
    verification: string,
}
export interface rulesLoginType{
    email: ({
        required: boolean;
        message: string;
        trigger: string;
        type?: undefined;
    } | {
        type: string;
        message: string;
        trigger: string[];
        required?: undefined;
    })[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
    })[];
    verification: ({
        required: boolean;
        message: string;
        trigger: string;
        validator?: undefined;
    } | {
        validator: (_rule: object, value: string, callback: Function) => void;
        trigger: string;
        required?: undefined;
        message?: undefined;
    })[]
}

export interface validatorMessageType{
     username?:string,
    usernameRequire?: string,
    welcome?: string,
    management?:string,
    register?: string,
    email?: string,
    emailRequire?: string,
    password?: string,
    passwordRequire?: string,
    submit?:string,
    cancel?: string,
}