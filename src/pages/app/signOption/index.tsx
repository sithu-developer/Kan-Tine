import { Box, Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";

function SignOption() {
  const { data: session } = useSession();
  const router = useRouter();



  
  if(!session) {
    return (
      <Box sx={{ display : "flex" , alignItems : "center" , justifyContent : "center", height : "100vh"}}>
        <Button variant="contained" sx={{ width : "150px"}} onClick={() => signIn()} >Sign In</Button>
      </Box>
    ) 
  }
}

export default SignOption;