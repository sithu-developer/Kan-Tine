import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette : {
        primary : {
            main : "#03346E" ,
            // #424874
        } ,
        secondary : {
            main : "#8576FF",
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
    },
    typography : {
        fontFamily : "cursive"
    },
})