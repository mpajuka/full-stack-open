import { useState } from "react"

const Blog = ({blog, incrementLike}) => {
  const blogStyle = {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogVisible, setBlogVisible] = useState(false)

  const toggleBlogVisible = () => {
    setBlogVisible(!blogVisible)
  }
  if (blogVisible === true) {
    return(
      <div style={blogStyle}>
          {blog.title}&nbsp;{blog.author}&nbsp;<button onClick={toggleBlogVisible}>hide</button>
          <br></br><a href={blog.url} target="noreferrer noopener">{blog.url}</a>
          <br></br>likes {blog.likes} <button onClick={incrementLike}>like</button>
          <br></br>{blog.user.name}
      </div>
    )
  } else {
    return(
      <div style={blogStyle}>
        {blog.title} {blog.author} &nbsp;<button onClick={toggleBlogVisible}>view</button>
      </div>
    )
  }
}

export default Blog