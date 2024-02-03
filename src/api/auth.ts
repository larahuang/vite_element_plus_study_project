import service from "@/plugins/axiosServe";
const api = `${import.meta.env.VITE_QUIZ_URL}`;

export const Login = (data:any) => {
    return service({
       method: "post",
        url: api+'/auth/login',
        data,
  });
}
export const Register = (data:any) => {
    return service({
       method: "post",
        url: api+'/auth/register',
        data,
  });
}