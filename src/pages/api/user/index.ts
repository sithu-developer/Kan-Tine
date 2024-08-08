// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/util/prisma";
import { calculateEndDate } from "@/util/general";


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
        const hostel = await prisma.hostel.create({ data : { name : "default hostel" , companyId : company.id }})
        const customer = await prisma.customer.create({ data : { name : "default customer" , phone : "09123456789" , roomNumber : "000" , hostelId : hostel.id }})
        
        // for pay and end date
        const payDate = 1;
        const payMonth = 1;
        const payYear = 2024;
        const totalMonths = 1;
        const calculatedEndFullDate = calculateEndDate(payDate ,payMonth , payYear , totalMonths);
        const endDate = calculatedEndFullDate.getDate();
        const endMonth = calculatedEndFullDate.getMonth() + 1;
        const endYear = calculatedEndFullDate.getFullYear();
        const payAndEndDate = await prisma.payAndEndDate.create({ data : { customerId : customer.id , totalMonths , payDate , payMonth , payYear , endDate , endMonth , endYear }});

        return res.status(200).json({ user , company , hostels : [ hostel ] , customers : [ customer ] , payAndEndDates : [ payAndEndDate ] });
    } else {
        const company = await prisma.company.findFirst({ where : { userId : user.id , isArchived : false }});
        if(!company) return res.status(400).send("Bad request");
        const hostels = await prisma.hostel.findMany({ where : { companyId : company.id , isArchived : false }});
        const hostelIds = hostels.map(item => item.id);
        const customers = await prisma.customer.findMany({ where : { hostelId : { in : hostelIds } , isArchived : false }});
        const customerIds = customers.map(item => item.id);
        const payAndEndDates = await prisma.payAndEndDate.findMany({ where : { customerId : { in : customerIds } , isArchived : false }})
        return res.status(200).json({ user , company , hostels , customers , payAndEndDates });
    }
    
}
