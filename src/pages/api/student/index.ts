// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CreatedStudentOptions , DeletedStudentOptions, UpdatedStudentOptions } from "@/types/student";
import { prisma } from "@/util/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "POST") {
        const { name , major , phone , roomNumber , hostelId } = req.body as CreatedStudentOptions;
        const valid = name && (major !== undefined) && phone && roomNumber && hostelId;
        if(!valid) return res.status(400).send("Bad request");
        const student = await prisma.student.create({ data : { name , phone , roomNumber , major , hostelId }})
        return res.status(200).json({ student })
    } else if(method === "PUT") {
        const { name , major , phone , roomNumber , hostelId } = req.body as UpdatedStudentOptions;
        const id = Number(req.query.id);
        const valid = name && (major !== undefined) && phone && roomNumber && hostelId;
        if(!valid) return res.status(400).send("Bad request");
        const exit = await prisma.student.findUnique({ where : { id , isArchived : false }});
        if(!exit) return res.status(400).send("Bad request");
        const student = await prisma.student.update({ where : { id } , data : { name , major , phone , roomNumber , hostelId }});
        return res.status(200).json({ student });
    } else if(method === "DELETE") {
        const idRouter = Number(req.query.id);
        const { id } = req.body as DeletedStudentOptions;
        const valid = id && idRouter;
        if(!valid || id !== idRouter ) return res.status(400).send("Bad request");
        const exit = await prisma.student.findUnique({ where : { id }});
        if(!exit) return res.status(400).send("Bad request");
        await prisma.payAndEndDate.deleteMany({ where : { studentId : id }});
        const student = await prisma.student.delete({ where : { id }});
        return res.status(200).json({ student })
    }
    res.status(405).send("Invalid method");
}
