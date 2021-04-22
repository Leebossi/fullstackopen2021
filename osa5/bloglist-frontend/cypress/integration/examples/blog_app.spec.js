describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Leevi Ossi',
      username: 'leevio',
      password: 'salainen'
    }
    const anotherUser = {
      name: 'Ossi Leevi',
      username: 'ossil',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('leevio')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('leevio logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('leevio')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'leevio logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'leevio', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('a url created by cypress')
      cy.contains('add').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'first blog',
          author: 'first blog author',
          url: 'first blog url'
        })
        cy.addBlog({
          title: 'second blog',
          author: 'second blog author',
          url: 'second blog url'
        })
        cy.addBlog({
          title: 'third blog',
          author: 'third blog author',
          url: 'third blog url'
        })
      })

      it('one of those can be liked', function () {
        cy.contains('first blog')
          .contains('show')
          .click()

        cy.contains('like')
          .click()

        cy.contains('like').parent()
          .contains('1')
      })

      it('one of those can be deleted', function () {
        cy.contains('second blog')
          .contains('show')
          .click()

        cy.contains('remove')
          .click()

        cy.get('html').should('contain', 'blog deleted')
          .should('not.contain', 'second blog')
      })

      it('but not if user didnt add the blog', function () {
        cy.contains('logout').click()
        cy.login({ username: 'ossil', password: 'salainen' })

        cy.contains('third blog').contains('show').click()
          .should('not.contain', 'remove')
      })

      it('blogs are ordered by likes', function () {
        cy.get('.blog').each(($el, index) => {
          cy.wrap($el).contains('show').click().wait(1000)
          for (let i = 0; i < index; i++) {
            cy.wrap($el).contains('like').click()
            cy.wait(1000)
          }
        })

        cy.get('.blog').each(($el, index) => {
          cy.wrap($el).contains(`${2 - index}`)
        })
      })
    })
  })
})