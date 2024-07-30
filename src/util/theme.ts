import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette : {
        primary : {
            main : "#8a2be2" ,
            light : "#874CCC",
        } ,
        secondary : {
            main : "#10439F" ,
            light : "#8576FF",
        } ,
        error : {
            main : "#d32f2f",
            light : "#ef5350",
            dark : "#c62828",
        } ,
        success : {
            main :"#2e7d32",
            light : "#4caf50" ,
            dark : "#1b5e20" ,
        },
    }
})