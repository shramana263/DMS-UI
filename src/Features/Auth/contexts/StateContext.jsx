import { createContext, useContext, useState } from "react";

const StateContext= createContext({
    user:null,
    token:null,
    refreshToken:null,
    setUser:()=>{},
    setToken:()=>{},
    setRefreshToken:()=>{}
});

export const StateProvider=({children})=>{
    const [user, setUser]=useState({});
    const [token, _setToken]= useState(localStorage.getItem("ACCESS_TOKEN"));
    const [refreshToken, setRefreshToken]= useState(localStorage.getItem('REFRESH_TOKEN'));
    const setToken= (token,refreshToken)=>{

        console.log(token);
            console.log(refreshToken);


        _setToken(token);
        setRefreshToken(refreshToken);
        if(token){
            
            localStorage.setItem("ACCESS_TOKEN",token);
            localStorage.setItem("REFRESH_TOKEN",refreshToken);
        }
        else{
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.setItem("REFRESH_TOKEN",refreshToken);
        }
    };
    // const setRefreshToken=(refreshToken)=>{
        
    //     if(refreshToken){
    //         localStorage.setItem("REFRESH_TOKEN", refreshToken);
    //     }
    // }
    return(
        <StateContext.Provider value={{ 
            user, token, setUser, setToken,setRefreshToken
         }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext=()=>useContext(StateContext)