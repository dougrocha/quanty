import { prisma } from '../index'

async function main() {
  console.log('Seeding database...')

  console.log('Finished seeding database.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

