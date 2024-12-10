import axiosClient from "../../../axios-client"


export function authLogin(payload){
    return axiosClient.post("/auth/login",payload)
    .then(({data})=>{
        console.log(data);
        return data
    })
    .catch((error)=>{
        throw error
    })
}

export function authLogout(){
    return axiosClient.post("/auth/logout")
    .then(()=>{

    })
    .catch((error)=>{
        throw error
    })
}

export function authRegister(payload){
    console.log("posted")
    return axiosClient.post("/register",payload)
    .then(({data})=>{
        return data
    })
    .catch((error)=>{
        throw error
    })
}
