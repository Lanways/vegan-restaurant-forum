if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { exec } = require('child_process')
const mysql = require('mysql2/promise')

async function hasDataInTables(pool, tableNames) {
  for (let i = 0; i < tableNames.length; i++) {
    const tableName = tableNames[i]
    const [rows] = await pool.query(`SELECT COUNT(*) as count FROM ${tableName}`)
    if (rows[0].count > 0) {
      return true
    }
  }
  return false
}


function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else if (stderr) {
        reject(new Error(stderr))
      } else {
        resolve(stdout)
      }
    })
  })
}

async function removeData() {
  try {
    console.log('remove seed and model')
    await runCommand('npx sequelize db:seed:undo:all')
    await runCommand('npx sequelize db:migrate:undo:all')
    console.log('cleaned database')
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

async function createData() {
  try {
    await runCommand('npx sequelize db:migrate')
    console.log('success created migrate')
    await runCommand('npx sequelize db:seed:all')
    console.log('success created seeds')
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

async function main() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
  })

  const tables = ['Comments', 'Favorites', 'Followships', 'Likes', 'Categories', 'Users', 'Restaurants']

  const hasData = await hasDataInTables(pool, tables)

  if (hasData) {
    await removeData()
    await createData()
  } else {
    await createData()
  }
  pool.end()
}

main().catch(console.error)
