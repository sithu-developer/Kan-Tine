// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CreatedCustomerOptions, UpdatedCustomerOptions } from "@/types/customer";
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
        const { name , major , phone , roomNumber , hostelId } = req.body as CreatedCustomerOptions;
        const valid = name && (major !== undefined) && phone && roomNumber && hostelId;
        if(!valid) return res.status(400).send("Bad request");
        const customer = await prisma.customer.create({ data : { name , phone , roomNumber , major , hostelId }})
        return res.status(200).json({ customer })
    } else if(method === "PUT") {
        const { name , major , phone , roomNumber , hostelId } = req.body as UpdatedCustomerOptions;
        const id = Number(req.query.id);
        const valid = name && (major !== undefined) && phone && roomNumber && hostelId;
        if(!valid) return res.status(400).send("Bad request");
        const exit = await prisma.customer.findUnique({ where : { id , isArchived : false }});
        if(!exit) return res.status(400).send("Bad request");
        const customer = await prisma.customer.update({ where : { id } , data : { name , major , phone , roomNumber , hostelId }});
        return res.status(200).json({ customer });
    }
    res.status(405).send("Invalid method");
}
