import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function init() {
	const userID = "123"

	const userUpdate = client.user.update({
		where: { id: userID },
		data: {
			email: "new",
		},
	})

	const postCreate = client.post.create({
		data: {
			title: "hi",
			content: "what up",
			author: {
				connect: {
					id: userID,
				},
			},
		},
	})

	await client.$transaction([userUpdate, postCreate])
}

init().catch((err) => {
	console.log(err)
	process.exit(1)
}).then((err) => {
	client.$disconnect()
	process.exit(0)
})
