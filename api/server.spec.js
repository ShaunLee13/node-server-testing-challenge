const supertest = require('supertest')

const server = require('./server')

const trueMatch = {
    hello:'there',
    general:'kenobi'
}

const falseMatch = {
    owo: "what's this?"
}

describe('server', () => {
    describe('get /', () => {
        it('returns a status code 200', async () => {
            const res = await supertest(server).get('/')

            expect(res.status).toBe(200)
        })

        it('returns a JSON response', async () => {
            const res = await supertest(server).get('/')

            expect(res.type).toMatch(/json/i)
            expect(res.body).toMatchObject({api:'running'})
        })
    })

    describe('post /testing', () => {
        it('rejects a request that does not match', async () => {
            const res = await supertest(server)
                .post('/testing')
                .send(falseMatch)

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({addition:'denied'})
        })
        it('posts a response if correct', async () => {
            const res = await supertest(server)
                .post('/testing')
                .send(trueMatch)

            expect(res.status).toBe(201)
            expect(res.type).toMatch(/json/i)
        })
    })

    describe('get /testing', () => {
        it('returns a status code 200', async () => {
            const res = await supertest(server).get('/testing')

            expect(res.status).toBe(200)
        })
        it('returns an object', async () => {
            const res = await supertest(server).get('/testing')

            expect(res.body).toMatchObject({rawr:'X3',nyan:'cat'})
        })
    })

    describe('delete /testing', () => {
        it('returns a status code 200', async () => {
            const res = await supertest(server).delete('/testing')

            expect(res.status).toBe(204)
        })
        it('returns an empty response', async () => {
            const res = await supertest(server).delete('/testing')

            expect(res.body).toMatchObject({})
        })
    })
})