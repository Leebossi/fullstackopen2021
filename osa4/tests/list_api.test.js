const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {

    test('bloglist is returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('returned blogs identifier is named id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(r => {
            expect(r.id).toBeDefined()
        })
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(contents).toContain(
            'Go To Statement Considered Harmful'
        )
    })
})

describe('viewing a specific blog', () => {

    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonExistingId = await helper.nonExistingId()

        console.log(validNonExistingId)

        await api
            .get(`/api/blogs/${validNonExistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '8902609687'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new blog', () => {

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'test blog title',
            author: 'test blog author',
            url: 'test blog url',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd.map(r => r.title)

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(contents).toContain(
            'test blog title'
        )
    })

    test('fails with status code 400 if data is invalid', async () => {
        const newBlog = {
            author: 'test blog author',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blog without likes has its likes value 0', async () => {
        const newBlog = {
            title: 'test blog title',
            author: 'test blog author',
            url: 'test blog url',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd[blogsAtEnd.length - 1].likes

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(contents).toEqual(0)
    })
})

describe('deletion of a blog', () => {

    test('succeeds with status code 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)


        blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.content)
    })
})

afterAll(() => {
    mongoose.connection.close()
})