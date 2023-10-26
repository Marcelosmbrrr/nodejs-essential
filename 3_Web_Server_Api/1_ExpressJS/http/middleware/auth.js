import { verifyTokenProvider } from '../../providers/VerifyTokenProvider.js';

async function authMiddleware(req, res, next) {

    try {

        const token = extractTokenFromHeader(request);

        if (!token) {
            throw new Error('Unauthorized. Error: Token is required.');
        }

        // JWT token verification
        const userId = await verifyTokenProvider(token);

        // Put user id in request
        req.user = { id: userId };
        next();

    } catch (e) {

        if (error.message.includes('Unauthorized') || error.message.includes('Token')) {
            res.status(401).send({ message: error.message });
        } else {
            res.status(500).send({ message: error.message });
        }

    }


}

function extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

export { authMiddleware }