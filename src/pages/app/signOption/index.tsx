import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";

function SignOption() {
  const { data: session } = useSession();
  const router = useRouter();
  
  if(!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    ) 
  }
  else {
    router.push("/app/backoffice/order")
  }
}

export default SignOption;