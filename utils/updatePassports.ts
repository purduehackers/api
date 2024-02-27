import prisma from "./prisma";

export async function updatePassports(id: string) {
  // Fetch passport given id and set activated to true
  // Fetch all other passports by that user that are marked activated
  // If there are any, mark all of them deactivated

  const passportId = Number(id);
  const passport = await prisma.passport.update({
    where: {
      id: passportId,
    },
    data: {
      activated: true,
    },
  });
  const ownerId = passport.owner_id;

  const otherPassports = await prisma.passport.findMany({
    where: {
      owner_id: ownerId,
      activated: true,
      NOT: {
        id: passportId,
      },
    },
  });
  if (otherPassports.length > 0) {
    for (const otherPassport of otherPassports) {
      await prisma.passport.update({
        where: {
          id: otherPassport.id,
        },
        data: {
          activated: false,
        },
      });
    }
  }

  return passport;
}
