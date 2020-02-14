module.exports = (req, __, next) => {
	const date = new Date(Date.now());
	console.log(`${req.method} to ${req.originalUrl} at ${date.toDateString()}, ${date.toTimeString()}`);
	next();
};
