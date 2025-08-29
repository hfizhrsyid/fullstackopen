const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog post 1',
    author: 'Author 1',
    url: 'www.example.com/1',
    likes: 8
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

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
    initialBlogs, dummy, totalLikes, idCheck, blogsInDb
}