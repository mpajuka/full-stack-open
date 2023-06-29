import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Blog form called correctly', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm handleSubmit={createBlog} />)

  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const createButton = screen.getByText('create')

  await user.type(title, 'test-title')
  await user.type(author, 'test-author')
  await user.type(url, 'test-url')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
})