import axiosClient from "../../../axios-client"



export function fetchAllDocs(){
    return axiosClient.get("/doc/getByUser/${}")
    .then((data)=>{
        return data;
    })
}