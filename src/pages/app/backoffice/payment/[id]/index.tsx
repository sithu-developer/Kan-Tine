import { Box } from "@mui/material"
import { useRouter } from "next/router"

const PaymentEditPage = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    

    return (
        <Box>
            {id}
        </Box>
    )
}

export default PaymentEditPage;