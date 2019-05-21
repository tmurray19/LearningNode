var request = require('request')

describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2*2).toBe(4)
    })

    // This test is designed to fail
    it('should multiply 2 and 2', () => {
        expect(2*2).toBe(5)
    })
})


describe('get messages', () => {
    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            // console.log(res.body)
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should return a list, that\'s not empty', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            // console.log(res.body)
            // Designed to test lenght of JSON
            expect(res.body.length).toBeGreaterThan(0)
            done()
        })
    })
    it('should return a list, that\'s not greater than 40', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            // console.log(res.body)
            // Designed to test lenght of JSON
            expect(res.body.length).toBeGreaterThan(40)
            done()
        })
    })
    it('should return a list, that\'s not empty (JSON)', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            // console.log(res.body)
            // Designed to test lenght of JSON
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})
