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

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
        'Go To Statement Considered Harmful'
    )
})

test('returned blogs identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(r => {
        expect(r.id).toBeDefined()
    })
})

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

test('blog without a title and url is not added', async () => {
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

afterAll(() => {
    mongoose.connection.close()
})