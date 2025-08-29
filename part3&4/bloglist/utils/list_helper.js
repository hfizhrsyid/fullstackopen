const Blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (listOfBlogs) => {
    const sumWithValue = listOfBlogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
    return sumWithValue
}

const idCheck = (postBlog) => {
    const blog = new Blog(postBlog)
    return blog
}

module.exports = {
    dummy, totalLikes, idCheck
}