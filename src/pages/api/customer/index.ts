// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CreatedCustomerOptions } from "@/types/customer";
import { calculateEndDate } from "@/util/general";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "POST") {
        const { name , major , phone , roomNumber , totalMonths , payDate , payMonth , payYear } = req.body as CreatedCustomerOptions;
        const valid = name && major !== undefined && phone && roomNumber && totalMonths && payDate && payMonth && payYear;
        if(!valid) return res.status(400).send("Bad request");
        const calculatedEndFullDate = calculateEndDate(payDate , payMonth , payYear , totalMonths);
        const endDate = calculatedEndFullDate.getDate();
        const endMonth = calculatedEndFullDate.getMonth() + 1;
        const endYear = calculatedEndFullDate.getFullYear();
        // create customer and payEndDate
        
    }
    res.status(405).send("Invalid method");
}
