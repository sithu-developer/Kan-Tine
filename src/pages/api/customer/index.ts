// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CreatedCustomerOptions } from "@/types/customer";
import { calculateEndDate } from "@/util/general";
import { prisma } from "@/util/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "POST") {
        console.log(req.body)
        const { name , major , phone , roomNumber , totalMonths , payDate , payMonth , payYear , hostelId } = req.body as CreatedCustomerOptions;
        const valid = name && (major !== undefined) && phone && roomNumber && totalMonths && payDate && payMonth && payYear && hostelId;
        console.log(valid)
        if(!valid) return res.status(400).send("Bad request");
        const calculatedEndFullDate = calculateEndDate(payDate , payMonth , payYear , totalMonths);
        const endDate = calculatedEndFullDate.getDate();
        const endMonth = calculatedEndFullDate.getMonth() + 1;
        const endYear = calculatedEndFullDate.getFullYear();
        const customer = await prisma.customer.create({ data : { name , phone , roomNumber , major , hostelId }})
        const payAndEndDate = await prisma.payAndEndDate.create({ data : { customerId : customer.id , payDate , payMonth , payYear , endDate , endMonth , endYear , totalMonths }})
        return res.status(200).json({ customer , payAndEndDate })
      }
    res.status(405).send("Invalid method");
}
