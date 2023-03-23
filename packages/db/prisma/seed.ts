import { prisma } from '../index'

async function main() {
  console.log('Seeding database...')

  const text = new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('Finished seeding database.')
    }, 1000)
  })

  console.log(await text)
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
