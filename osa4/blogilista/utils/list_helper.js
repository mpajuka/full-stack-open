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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}