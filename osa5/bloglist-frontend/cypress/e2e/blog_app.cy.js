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
})