const router = require('express').Router()
const bcrypt = require('bcryptjs')

const Users = require('./auth-model')

const { authenticate, validateUserType } = require('./util')
const { signToken, validateToken } = require('./util')
const { validateLogin, validateNewUser, validateAdminCreation, validateAdmin } = require('../middleware')

const userEnteredEmailAddress = username => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username)

router.post('/login', validateLogin, async (req, res) => {
	let { username, password } = req.body

	try {
		if (userEnteredEmailAddress(username)) {
			const user = await Users.findByEmail(username.toLowerCase())

			return validateToken(user, password, res)
		}
		const user = await Users.findByUsername(username.toLowerCase())

		return validateToken(user, password, res)
	} catch (err) {
		console.log(err)
		res.status(500).json({ errMessage: 'Error while logging in' })
	}
})

router.post('/register', validateNewUser, (req, res) => {
	let newUser = req.body
	const hash = bcrypt.hashSync(newUser.password, Number(process.env.SALT))

	// cannot sign up as admin or superUser
	newUser.password = hash
	newUser.isAdmin = false
	newUser.superUser = false

	Users.add(newUser)
		.then(saved => {
			const token = signToken(saved)

			res.status(200).json({
				uid: saved.id,
				token,
				message: `Welcome, ${saved.username}`
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ errMessage: 'Error while registering' })
		})
})

// PUT - edit user
router.put('/:id', authenticate, validateUserType, async (req, res) => {
	try {
		const user = await Users.editUser(req.params.id, req.userObj)

		return user ? res.status(200).json(user) : res.status(404).json({ errMessage: 'Error' })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ errMessage: 'Error' })
	}
})

// PUT - edit user permissions
router.put('/super/:id', authenticate, validateAdminCreation, async (req, res) => {
	const { id } = req.params
	const token = req.locals

	await editingUserPermissions(req, res, id, token)
})

// PUT - lock/unlock non superUser account with `locked` property in req.query.locked
router.get('/lock/:id', authenticate, validateAdmin, async (req, res) => {
	const { id } = req.params
	const token = req.locals

	await editingUserPermissions(req, res, id, token)
})

// function verifyToEditOwner(id, token, res) {
// 	if (id == 1 && token.uid != 1)
// 		return res.status(401).json({ message: 'Sorry, you do not have permission' })
// }

async function editingUserPermissions(req, res, id, token) {
	if (id == 1 && token.uid != 1)
		return res.status(401).json({ message: 'Sorry, you do not have permission' })

	try {
		const user = !req.query.locked
			? await Users.editPermissions(id, req.body)
			: await Users.lockAccount(id, req.query.locked)

		return user ? res.status(200).json(user) : res.status(404).json({ errMessage: 'Error' })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ errMessage: 'Error' })
	}
}

module.exports = router
