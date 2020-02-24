const ifUserIsAdminOrSuperUser = token => token.isAdmin || token.superUser

module.exports = (req, res, next) => {
	if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' })

	return ifUserIsAdminOrSuperUser(req.locals)
		? next()
		: res.status(401).json({ message: 'Sorry, you do not have permission' })
}
