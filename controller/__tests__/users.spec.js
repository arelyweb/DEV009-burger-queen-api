const mongoose = require('mongoose');
const User = require('../../model/user.model');
const express = require('express');
const res = require('./util/response')
const {MongoClient} = require('mongodb');

const {
  getUsers,
} = require('../users.controller');


const queryUsers = { _page: '3', _limit: '1' };

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', email: 'admin@localhost.com'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
  // describe('getUsers', () => {
  //   it('should get users collection', (done) => {
  //     const result = getUsers(queryUsers, resp, next);
  //     expect(result).toBe(res.getusersRes);
  //     done();
  //   });
  // });
});