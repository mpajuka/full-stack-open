import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = {
    title: 'This title should be rendered'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('This title should be rendered')
  expect(element).toBeDefined()
})

test('all blog content rendered after "view" clicked', async () => {
  const blog = {
    title: 'This title should be rendered',
    author: 'This author should be rendered',
    url: 'This url should be rendered',
    user: {
      name: 'This name should be rendered'
    },
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(container).toHaveTextContent('This author should be rendered')
  expect(container).toHaveTextContent('This url should be rendered')
  expect(container).toHaveTextContent('This name should be rendered')
  expect(container).toHaveTextContent('likes 0')
})