// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { UpdateCompanyOptions } from "@/types/company";
import { prisma } from "@/util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req , res , authOptions );
  if(!session) return res.status(401).send("unauthorized");
  const method = req.method;
  if(method === "PUT") {
    const { id , name } = req.body as UpdateCompanyOptions;
    const valid = id && name;
    if(!valid) return res.status(400).send("Bad request");
    const exit = await prisma.company.findUnique({ where : { id , isArchived : false }});
    if(!exit) return res.status(400).send("Bad request");
    const company = await prisma.company.update({ where : { id } , data : { name }});
    return res.status(200).json({ company });
  }
  res.status(405).send("Invalid method");
}


