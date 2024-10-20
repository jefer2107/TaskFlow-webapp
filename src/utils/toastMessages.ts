import { toast } from "react-toastify";

export const toastMessages = (type:"success"|"error", message:string) => {
    if(type === "success"){
        toast.success(message, { style: {
            backgroundColor: '#55B938',
            color: 'white',
        }, theme: "colored" });

    }else{
        toast.error(message, { style: {
            backgroundColor: '#D65745',
            color: 'white',
        }, theme: "colored" });
    }
}