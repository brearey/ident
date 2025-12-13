import { Pool } from 'pg'
import { logger } from '../utils/logger'

function createPool(host: string, user: string, password: string) {
  try {
    // TODO: debug
    console.log(`host = ${host} user = ${user} password = ${password}`)
    const pool = new Pool({
      host: host,
      user: user,
      password: password,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      maxLifetimeSeconds: 60
    })
    // TODO: debug
    console.log(`pool created totalCount = ${pool.totalCount}`)
    return pool
  } catch(e) {
    logger.error(e as Error)
  }
}

async function query(pool: Pool, q: string, params: unknown[] = []) {
  try {
    return await pool.query(q, params)
  } catch (err) {
    logger.error(err as Error);
    return null
  }
}

export {
  createPool,
  query
}