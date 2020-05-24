const supertest = require('supertest');
const {assert} = require('chai');
const config = require('../../config');
const jwt = require('../../utils/jwt');

describe('JSON Patch API', () => {

    const api = supertest(config.URL);

    const jsonObj = {
        name: 'Adeola',
        city: 'Lagos'
    };

    const patchObj = {
        op: 'replace',
        path: '/name',
        value: 'Adebayo'
    };

    const loginData = {
        username: 'username',
        password: 'password'
    };

    const token = jwt.getToken(loginData);

    it('can patch a JSON object', (done) => {

        api.patch('/apply-patch')
        .send({ jsonObj, patchObj })
        .set('token', token)
        .expect((res) => {
            let body = res.body;
            assert.isObject(body);
            assert.equal(body.data.name, "Adebayo");
            assert.equal(body.data.city, "Lagos");
        })
        .expect(200, done);
    });

    it('cannot apply a patch without a JWT', (done) => {

        api.patch('/apply-patch')
        .send({ jsonObj, patchObj })
        .expect((res) => {
            let body = res.body;
            assert.exists(body.error);
        })
        .expect(401, done);
    });

    it('cannot apply patch with an invalid Patch object', (done) => {

        let patchObj = {
            op: 'replace',
            value: 'Adebayo'
        };

        api.patch('/apply-patch')
        .send({ jsonObj, patchObj })
        .set('token', token)
        .expect((res) => {
            let body = res.body;
            assert.exists(body.error);
        })
        .expect(400, done);
    });
});
