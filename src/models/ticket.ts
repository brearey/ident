import { Pool } from "pg"
import { query } from "../database/db"

async function getTickets(pool: Pool) {
  return await query(pool, `SELECT * FROM "IDENT_Tickets"`)
}

export {
  getTickets
}