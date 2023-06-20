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
            <input type='text' value={title} name='Title' 
              onChange={handleTitleChange}/>
        </div>
        <div>
          author&nbsp;
            <input type='text' value={author} name='Author'
              onChange={handleAuthorChange}/>
        </div>
        <div>
          url&nbsp;
            <input type='text' value={url} name='Url'
              onChange={handleUrlChange}/>
        </div>
        <p>
          <button type='submit'>create</button>
        </p>
    </form>
  </div> 
)

export default BlogForm