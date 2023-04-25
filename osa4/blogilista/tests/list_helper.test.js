const listHelper = require('../utils/list_helper')

const blogsArray = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  test('of empty list is zero', () => {
    const emptyList = listHelper.totalLikes([])
    expect(emptyList).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const resultOfOne = listHelper.totalLikes(listWithOneBlog)
    expect(resultOfOne).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const resultOfMany = listHelper.totalLikes(blogsArray)
    expect(resultOfMany).toBe(36)
  })
})

describe('Most likes', () => {
  test('of all blogs', () => {
    const targetObject = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const most = listHelper.favoriteBlog(blogsArray)
    expect(most).toMatchObject(targetObject)
  })
})

describe('most occurrences', () => {

  test('of blog', () => {
    const expectedObject = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const mostOccurrences = listHelper.mostBlogs(blogsArray)
    expect(mostOccurrences).toMatchObject(expectedObject)
  })
})

describe('most likes', () => {

  test('of blogs', () => {
    const expectedObject = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    const mostLikesOfBlogs = listHelper.mostLikes(blogsArray)
    expect(mostLikesOfBlogs).toMatchObject(expectedObject)
  })
})