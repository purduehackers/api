import prisma from "./prisma";

export async function fetchPassports() {
  return await prisma.passport.findMany();
}
