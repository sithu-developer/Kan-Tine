// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/util/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const session = await getServerSession(req , res , authOptions );
    if(!session || !session.user) return res.status(401).send("unauthorized");

    const user = await prisma.user.findUnique({ where : { email : String(session.user.email) }});
    
    if(!user) {
        const user = await prisma.user.create({data : { email : String(session.user.email) }});
        const company = await prisma.company.create({ data : { name : "Kan Tine" , userId : user.id } });

        return res.status(200).json({ user , companies : company  });
    } else {
        const company = await prisma.company.findFirst({ where : { userId : user.id , isArchived : false }});

        return res.status(200).json({ user , company });
    }
    
}
