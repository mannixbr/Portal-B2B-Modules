const cron = require('node-cron')
const mysql = require('mysql')
const mongoose = require('mongoose')
const fs = require('fs');



function MysqlImportOsAbertas() {

  function sqlQuery(mysqlConnection, tableName) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM ' + tableName + ' WHERE area = "OEMP"'
      mysqlConnection.query(sql, function (error, results) {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(results)
        mysqlConnection.end()
      })
    })
  }

  function insertToMongo(results, mongoCollection) {
    const promises = []
    const mainPromise = new Promise((resolve, reject) => {

      results.forEach(function (item) {
        const secondaryPromise = new Promise((resolve, reject) => {
          mongoCollection.find({ cod: item.cod }).toArray(async function (error, data) {
            if (error) {
              console.log(error)
              reject(err)
            }

            if (data.length === 0) {
              item.status = 'new'
              item.lastUpdate = new Date()
              await mongoCollection.insertOne(item)
              resolve(true)
            }
            else {
              const date = new Date()
              const formatedDate = ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(); 
              await mongoCollection.updateOne({cod:item.cod}, {$set: {lastUpdate: formatedDate}})
              // const lastUpdate = formatedDate
              // fs.writeFileSync('lastUpdate.txt', lastUpdate);
              resolve(true)
            }

          })
        })
        promises.push(secondaryPromise)
      })
      Promise.all(promises).then(success => resolve('open base successfully updated!'))
    })
    mongoCollection.off
    return mainPromise
  }
  mongoose.connect("mongodb://localhost/op-b2b-db", { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))

  const mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '89118642',
    port: 3306,
    database: 'os_abertas'
  })

  mysqlCon.connect()

  const table = 'os_abertas'
  const collection = db.collection(table)

  sqlQuery(mysqlCon, table)
    .then(result => insertToMongo(result, collection)).then(success => console.log(success)).catch(e => console.log(e))

}

module.exports = cron.schedule('0 00 6 * Jan-Dec 1-5', MysqlImportOsAbertas, {
  scheduled: false
})