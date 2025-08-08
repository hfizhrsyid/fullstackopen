const dummy = (blogs) => {
    return 1
}

const totalLikes = (listOfBlogs) => {
    const sumWithValue = listOfBlogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
    return sumWithValue
}

// const favoriteBlog = (listOfBlogs) => {
//     const sumWithValue = list
// }

module.exports = {
    dummy, totalLikes
}