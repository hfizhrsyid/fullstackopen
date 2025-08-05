const dummy = (blogs) => {
    return 1
}

const totalLikes = (listOfBlogs) => {
    const sumWithValue = listOfBlogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
    return sumWithValue
}

module.exports = {
    dummy, totalLikes
}