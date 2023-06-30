describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username').find('input')
    cy.contains('password').find('input')
    cy.get('form').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('username').find('input').type('mluukkai')
      cy.contains('password').find('input').type('salainen')
      cy.get('form').contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('username').find('input').type('mluukkai')
      cy.contains('password').find('input').type('wrong')
      cy.get('form').contains('login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('username').find('input').type('mluukkai')
      cy.contains('password').find('input').type('salainen')
      cy.get('form').contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.contains('title').find('input').type('test-title')
      cy.contains('author').find('input').type('test-author')
      cy.contains('url').find('input').type('test-url')
      cy.get('form').contains('create').click()
      cy.contains('a new blog test-title by test-author added')
    })

    it('A blog can be liked', function() {
      cy.contains('create a new blog').click()
      cy.contains('title').find('input').type('test-title')
      cy.contains('author').find('input').type('test-author')
      cy.contains('url').find('input').type('test-url')
      cy.get('form').contains('create').click()
      cy.get('button').contains('view').click()
      cy.contains('likes 0')
      cy.get('button').contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed by the creator', function() {
      cy.contains('create a new blog').click()
      cy.contains('title').find('input').type('test-title')
      cy.contains('author').find('input').type('test-author')
      cy.contains('url').find('input').type('test-url')
      cy.get('form').contains('create').click()
      cy.get('button').contains('view').click()
      cy.get('button').contains('remove').click()
      cy.contains('Successfully removed test-title by test-author')
    })

    it('A blog can only be removed by the creator', function() {
      cy.contains('create a new blog').click()
      cy.contains('title').find('input').type('test-title')
      cy.contains('author').find('input').type('test-author')
      cy.contains('url').find('input').type('test-url')
      cy.get('form').contains('create').click()
      cy.get('button').contains('view').click()
      cy.get('button').contains('remove')
      cy.get('button').contains('log out').click()
      const newUser = {
        name: 'Arto Hellas',
        username: 'hellas',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', newUser)
      cy.contains('username').find('input').type('hellas')
      cy.contains('password').find('input').type('salainen')
      cy.get('form').contains('login').click()
      cy.contains('Arto Hellas logged in')
      cy.get('button').contains('view').click()
      cy.get('button').contains('remove').should('not.exist')
    })
  })
})