import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    // Grab the authorization header
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'string') {
        return res.status(401).json({
            message: "You are not authenticated"
        })
    }

    // Grab the scheme prefix and token
    const [scheme, token] = bearerHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(403).json({
            message: "Invalid authorization"
        });
    }
    // Verify
    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" })
        }

        req.user = data;
        return next()
    })
}

export default auth;