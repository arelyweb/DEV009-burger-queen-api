const mongoose = require('mongoose');
const User = require('../../model/user.model');
const express = require('express');
const res = require('./util/response')
const { MongoClient } = require('mongodb');

const {
  createUser,
} = require('../users.controller');



jest.mock('mongodb', () => {

  return {
    MongoClient: {
      connect: () => Promise.resolve(
        {
          db:() => Promise.resolve(
            {
              collection:() => Promise.resolve(
                {
                  insertOne:jest.fn()
                }
              )
            }
          )
        }
      )
    }
  }
});
//jest.mock('mongoose');

const queryUsers = { _page: '3', _limit: '1' };

describe('insert', () => {
  let connection;
  let db, collection;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
    collection = await db.collection(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    
    createUser({body:{email:'arely@gmail.com', password:'hshshs'}})
    expect(collection.insertOne).toHaveBeenCalled()
    
  });
  // describe('getUsers', () => {
  //   it('should get users collection', (done) => {
  //     const result = getUsers(queryUsers, resp, next);
  //     expect(result).toBe(res.getusersRes);
  //     done();
  //   });
  // });
});