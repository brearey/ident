import { Pool } from 'pg'
import { logger } from '../utils/logger'

function createPool(host: string, user: string, password: string) {
  const pool = new Pool({
    host: host,
    user: user,
    password: password,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60
  })
  return pool
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