const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((sum, blog) => {
    return sum +  blog.likes
  }, 0)
  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  const greatestLikes = blogs.reduce((greatest, blog) => {
    return greatest.likes > blog.likes
      ? { title: greatest.title, author: greatest.author, likes: greatest.likes }
      : { title: blog.title, author: blog.author, likes: blog.likes }
  })
  return greatestLikes
}

const mostBlogs = (blogs) => {
  const amount = blogs.reduce((max, blog) => {
    max[blog.author] = (max[blog.author] || 0 ) + 1
    return max
  }, {})
  const most = Object.keys(amount).reduce((a, b) => amount[a] > amount[b] ? a : b)
  const mostOccurrencesObject = { author: most, blogs: amount[most] }

  return mostOccurrencesObject
}

const mostLikes = (blogs) => {
  const likes = blogs.reduce((max, blog) => {
    max[blog.author] = (max[blog.author] || 0) + blog.likes
    return max
  }, {})
  const most = Object.keys(likes).reduce((a, b) => likes[a] > likes[b] ? a : b)
  const mostLikesObject = { author: most, likes: likes[most] }

  return mostLikesObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}