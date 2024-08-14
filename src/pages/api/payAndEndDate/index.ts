// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CreatedPayAndEndDateOptions, UpdatedPayAndEndDateOptions } from "@/types/payAndEndDate";
import { prisma } from "@/util/prisma";
import { calculateEndDate } from "@/util/general";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const session = await getServerSession( req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "PUT") {
        const id = Number(req.query.id);
        const { payDate , payMonth , payYear , totalMonths , price , breakFast , lunch , dinner , isPaidUp } = req.body as UpdatedPayAndEndDateOptions;
        const valid = id && payDate && payMonth && payYear && totalMonths && price !== undefined && breakFast !== undefined && lunch !== undefined && dinner !== undefined && isPaidUp !== undefined;
        if(!valid) return res.status(400).send("Bad request");
        const exit = await prisma.payAndEndDate.findUnique({ where : { id , isArchived : false }});
        if(!exit) return res.status(400).send("Bad request");
        const calculatedEndDate = calculateEndDate(payDate , payMonth , payYear , totalMonths);
        const endDate = calculatedEndDate.getDate();
        const endMonth = calculatedEndDate.getMonth() + 1;
        const endYear = calculatedEndDate.getFullYear();
        const payAndEndDate = await prisma.payAndEndDate.update({ where : { id } , data : { payDate , payMonth , payYear , totalMonths , price , breakFast , lunch , dinner , isPaidUp , endDate , endMonth , endYear }});
        return res.status(200).json({ payAndEndDate });
    } else if(method === "POST") {
        const studentId = Number(req.query.studentId);
        const { payDate , payMonth , payYear , totalMonths , price , breakFast , lunch , dinner , isPaidUp } = req.body as CreatedPayAndEndDateOptions;
        const valid = studentId && payDate && payMonth && payYear && totalMonths && price !== undefined && breakFast !== undefined && lunch !== undefined && dinner !== undefined && isPaidUp !== undefined;
        if(!valid) return res.status(400).send("Bad request");
        const calculatedEndDate = calculateEndDate( payDate , payMonth , payYear , totalMonths );
        const endDate = calculatedEndDate.getDate();
        const endMonth = calculatedEndDate.getMonth() + 1;
        const endYear = calculatedEndDate.getFullYear();
        const payAndEndDate = await prisma.payAndEndDate.create({ data : { studentId , payDate , payMonth , payYear , endDate , endMonth , endYear , totalMonths , price , breakFast , lunch , dinner , isPaidUp }});
        return res.status(200).json({ payAndEndDate });
    }
    res.status(405).send("Invalid method");
}
