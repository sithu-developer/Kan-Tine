import { Box, Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";

function SignOption() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session && session.user && session.user.email) { 
        router.push("/app/backoffice/expire");
    }
  } , [session]);

  
  if(!session) {
    return (
      <Box sx={{ display : "flex" , alignItems : "center" , justifyContent : "center", height : "100vh"}}>
        <Button variant="contained" sx={{ width : "150px"}} onClick={() => signIn()} >Sign In</Button>
      </Box>
    ) 
  }
}

export default SignOption;