import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if( data ) {
      router.push("/app/backoffice/expire")
    } else {
      setTimeout(() => {
        router.push("/app/signOption")
      } , 5000)
    }
  } , [ data ])

  return (
    <></>
  );
}
