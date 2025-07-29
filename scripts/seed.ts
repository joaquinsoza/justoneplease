import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialItems = [
  'Vasos/tazas pequeñas para cafes por ejemplo esos de nesspreso o que venden como vasos de doble vidrio',
  'paños de cocina',
  'cosas para parrilla',
  'pyrex de vidrio',
  'colgador de entrada de pared',
  'plantitas',
  'maceteros o estas cosas de madera que son como un piso para que la planta quede en altura',
  'organizadores para el baño',
  'cuadros para decorar la cocina o el living',
  'cosas aromáticas; para el baño o para la casa en general',
  'mantel redondo',
  'individuales estos de mimbre',
  'Tabla de madera picoteo',
  'pocillos',
  'mantequillero',
  'Mat secaplatos',
  'Paila de huevos',
  'tostador de cocina',
  'sacacorcho/destapador'
]

async function main() {
  console.log('Seeding database...')

  const existingList = await prisma.giftList.findFirst({
    where: { name: 'Vale & Diego depashower' }
  })

  if (existingList) {
    console.log('Initial list already exists, skipping seed...')
    return
  }

  const giftList = await prisma.giftList.create({
    data: {
      name: 'Vale & Diego depashower',
      items: {
        create: initialItems.map((item) => ({
          name: item,
        })),
      },
    },
    include: {
      items: true,
    },
  })

  console.log(`Created gift list "${giftList.name}" with ${giftList.items.length} items`)
  console.log(`Share URL: /list/${giftList.shareId}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })