import PropTypes from 'prop-types'

const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit
}) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={handleSubmit}>
      <div>
          title&nbsp;
        <input type='text' value={title} name='Title' id='title'
          onChange={handleTitleChange}/>
      </div>
      <div>
          author&nbsp;
        <input type='text' value={author} name='Author' id='author'
          onChange={handleAuthorChange}/>
      </div>
      <div>
          url&nbsp;
        <input type='text' value={url} name='Url' id='url'
          onChange={handleUrlChange}/>
      </div>
      <p>
        <button type='submit'>create</button>
      </p>
    </form>
  </div>
)

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm