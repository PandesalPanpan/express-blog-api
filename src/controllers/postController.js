import { prisma } from "../lib/prisma.js"
import { isValidUUID } from "../utils/regex.js"

// Get all published posts
export const index = async (req, res, next) => {
    // Fetch all the posts in the database
    const posts = await prisma.post.findMany({
        where: {
            isPublished: true
        }
    })

    return res.status(200).json({
        posts
    })
}

// Get specific posts
export const show = async (req, res, next) => {
    // route must have a postId
    const { postId } = req.params;

    if (isValidUUID(postId)) {
        return res.status(400).json({
            message: "Invalid Post ID format."
        })
    }


    try {
        // attempt to fetch for the post id using prisma
        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        // If didn't fetch anything, then return an error status
        if (!post) {
            return res.status(404).json({
                message: "Post is not found."
            })
        }

        // If it did fetch, check if it unpublished
        if (!post.isPublished &&
            (!req.user || req.user.id !== post.authorId)
        ) {
            return res.status(403).json({
                message: "Post is unpublished by the author."
            });
        }

        return res.status(200).json({
            post
        })
    } catch (err) {
        next(err)
    }
}


// Create Post


// Update Post

// Delete Post