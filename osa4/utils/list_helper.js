const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {    
    const reducer = (sum, item) => {
        return sum + item
    }
    return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max.apply(Math, blogs.map(blog => blog.likes))
    const blog = blogs.find(blog => blog.likes === mostLikes)
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
    }
}

const mostBlogs = (blogs) => {
    const reducer = (sum, item) => {
        if(!sum[item.author]) sum[item.author] = 1
        else (sum[item.author]++)
        return sum
    }

    const authors = blogs.reduce(reducer, [])
    const credits = Math.max.apply(Math, Object.keys(authors).map(blog => authors[blog]))
    const author = Object.keys(authors).find(author => authors[author] === credits)
    return {
        author: author,
        blogs: credits
    }
}

const mostLikes = (blogs) => {
    const reducer = (sum, item) => {
        if(!sum[item.author]) sum[item.author] = item.likes
        else (sum[item.author] += item.likes)
        return sum
    }

    const authors = blogs.reduce(reducer, [])
    const likes = Math.max.apply(Math, Object.keys(authors).map(blog => authors[blog]))
    const author = Object.keys(authors).find(author => authors[author] === likes)
    return {
        author: author,
        likes: likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}