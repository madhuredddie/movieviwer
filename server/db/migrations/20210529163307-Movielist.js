'use strict';

var dbm;
var type;
var seed;

const csv = require('csv-parser');
const fs = require('fs');
var async = require('async');
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


exports.up = function (db, callback) {
  const sql = `CREATE TABLE movies(
    ID   VARCHAR(20),
    NAME VARCHAR(100),
    GENER VARCHAR(20),
    RATING VARCHAR(20),       
    PRIMARY KEY (ID))`
  db.runSql(sql, function (err) {
    if (err)
    { 
      callback(err);
    }
    else
    {
    
      const results = [];
      
      fs.createReadStream('../Movies.csv')
        .pipe(csv())
        .on('data', (data) => {
          results.push(data)
          })
        .on('end', () => {

          let sql = 'INSERT INTO movies( id, name ,gener,rating) VALUES '
          results.forEach ((object, index) => {
            sql = sql + `("${(index + 1)}" , "${object.Title}", "${object.Genre}" , "${object.Rating}"),`
          })
          sql = sql.slice(0, -1);       
         
        
          db.runSql(sql, function(err) {
            if(err)
            {
              callback(err)
            }
            else
            {
              callback()
            }
          })
          
        });
    }
  })
  
};

exports.down = function (db, callback) {
  return null;
};


exports._meta = {
  "version": 1
};
