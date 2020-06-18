const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const client = require('../connection');

after(() => {
  client.destroy();
});

describe('return results from seeding ', () => {
  it('returns result', () => {
    return request(app)
      .get('/api/owners')
      .expect(200)
      .then((result) => {
        const firstOwner = result.body.owners[0];
        expect(firstOwner).to.have.property('owner_id');
        expect(firstOwner).to.have.property('forename');
        expect(firstOwner).to.have.property('surname');
        expect(firstOwner).to.have.property('age');
        expect(firstOwner).to.have.property('residence');
      });
  });
});
