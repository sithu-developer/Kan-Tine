// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CreatedHostel, DeleteHostelOptions, UpdatedHostel } from "@/types/hostel";
import { prisma } from "@/util/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session || !session.user || !session.user.email) return res.status(401).send("Unauthorized");
    const method = req.method;
    
    if( method === "PUT" ) {
        const { name } = req.body as UpdatedHostel;
        const id = Number(req.query.id);
        const valid = id && name;
        if(!valid) return res.status(400).send("Bad request");
        const exit = await prisma.hostel.findUnique({ where : { id , isArchived : false}});
        if(!exit) return res.status(400).send("Bad request");
        const hostel = await prisma.hostel.update({ where : { id } , data : { name } });
        return res.status(200).json({ hostel });
    } else if( method === "POST" ) {
        const { name } = req.body as CreatedHostel;
        if(!name) return res.status(400).send("Bad request");
        const user = await prisma.user.findUnique({ where : { email : String(session.user.email) , isArchived : false }});
        if(!user) return res.status(401).send("Unauthorized");
        const company = await prisma.company.findFirst({ where : { userId : user.id , isArchived : false }})
        if(!company) return res.status(401).send("unauthorized");
        const hostel = await prisma.hostel.create({ data : { name , companyId : company.id }});
        return res.status(200).json({ hostel })
    } else if( method === "DELETE" ) {
        const idRouter = Number(req.query.id);
        const { id } = req.body as DeleteHostelOptions;
        const valid = id && idRouter;
        if(!valid || idRouter !== id ) return res.status(400).send("Bad request");
        const exit = await prisma.hostel.findUnique({ where : { id }});
        if(!exit) return res.status(400).send("Bad request");
        const hostel = await prisma.hostel.delete({ where : { id }});
        return res.status(200).json({ hostel });
    }

    res.status(405).send("Invalid method");
}
