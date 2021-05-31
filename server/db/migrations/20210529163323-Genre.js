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
  const sql = `CREATE TABLE Genre(
    ID   VARCHAR(20),
    NAME VARCHAR(100),       
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
          if(!results.includes(data.Genre))
             results.push(data.Genre)
            
          })
        .on('end', () => {
          console.log('\n\n\n')
          console.log(results)
          console.log('\n\n\n\n\n')

          let sql = 'INSERT INTO Genre( id, name ) VALUES '
          results.forEach ((object, index) => {
            sql = sql + `("${(index + 1)}" , "${object}" ),`
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
