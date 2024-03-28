const request = require('supertest');
const server = require('../');
const generate = require('../generate');
const fs = require('fs');

describe('GET /scores', () => {
  it('Normal response', async () => {
      generate('normal')
      const response = await request(server).get('/scores');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('femaleScore');
      expect(response.body).toHaveProperty('maleScore');
      expect(response.body).toHaveProperty('diverseScore');
  });

  it('Insufficient data', async () => {
      generate('insufficient')
      const response = await request(server).get('/scores');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('femaleScore');
      expect(response.body).toHaveProperty('maleScore');
      expect(response.body).toHaveProperty('diverseScore');
      expect(response.body.femaleScore).toBe(0);
      expect(response.body.maleScore).toBe(0);
      expect(response.body.diverseScore).toBe(0);
  });

  it('File not found', async () => {
      fs.unlinkSync('survey.json');
      const response = await request(server).get('/scores');
      expect(response.statusCode).toBe(500);
  });

  it('Empty file', async () => {
    fs.writeFileSync('survey.json', '[]');
    const response = await request(server).get('/scores');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('femaleScore');
    expect(response.body).toHaveProperty('maleScore');
    expect(response.body).toHaveProperty('diverseScore');
    expect(response.body.femaleScore).toBe(0);
    expect(response.body.maleScore).toBe(0);
    expect(response.body.diverseScore).toBe(0);
  });

  it('Not a JSON file', async () => {
    fs.writeFileSync('survey.json', 'This is not a JSON file');
    const response = await request(server).get('/scores');
    expect(response.statusCode).toBe(500);
  });
  
  it('Not an array', async () => {
    fs.writeFileSync('survey.json', '{"name": "John Doe"}');
    const response = await request(server).get('/scores');
    expect(response.statusCode).toBe(500);
  });
  
  
  it('Invalid objects', async () => {
    fs.writeFileSync('survey.json', '[{"name": "John Doe"}]');
    const response = await request(server).get('/scores');
    expect(response.statusCode).toBe(500);
  });
  
  });



afterAll(done => {
  server.close(done);
});