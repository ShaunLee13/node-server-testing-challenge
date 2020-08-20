const supertest = require('supertest')

const server = require('./server')
const db = require('../data/dbConfig')

const trueMatch = {
    message:'hello there'
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
        beforeEach( async () => {
            await db('test').truncate()
        })
        it('rejects a request that does not match', async () => {
            const res = await supertest(server)
                .post('/testing')
                .send(falseMatch)

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({addition:'denied'})
        })
        it('should add a message', async () => {
            const res = await supertest(server)
                .post('/testing')
                .send(trueMatch)

            const messages = await db("test");

            expect(messages).toHaveLength(1);

        })
    })

    describe('delete /testing/1', () => {
        it('returns a status code 200', async () => {
            const res = await supertest(server).delete('/testing/1')

            expect(res.status).toBe(200)
        })
        it('returns an empty response', async () => {
            const res = await supertest(server).delete('/testing/1')

            expect(res.body).toMatchObject({message:'deleted'})
        })
    })
})