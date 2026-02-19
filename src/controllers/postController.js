import { prisma } from "../lib/prisma.js"

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

// Get specific posts that is not published


// Create Post


// Update Post

// Delete Post