import { Pool } from 'pg'
import { query } from '../database/db'
import { randomUUID } from 'crypto'
import { CreateTicketDto } from '../types/app-types'

async function getTickets(pool: Pool, dateTimeFrom: Date, dateTimeTo: Date, limit?: number, offset?: number) {
	let sql = `
		SELECT 
			"Id",
			"DateAndTime",
			"ClientPhone",
			"ClientEmail",
			"FormName",
			"ClientFullName",
			"ClientSurname",
			"ClientName",
			"ClientPatronymic",
			"PlanStart",
			"PlanEnd",
			"Comment",
			"DoctorId",
			"DoctorName",
			"UtmSource",
			"UtmMedium",
			"UtmCampaign",
			"UtmTerm",
			"UtmContent",
			"HttpReferer"
		FROM "IDENT_Tickets"
		WHERE "DateAndTime" >= $1 AND "DateAndTime" <= $2
		ORDER BY "DateAndTime"
	`

	const params: (Date | number)[] = [dateTimeFrom, dateTimeTo]

	if (limit !== undefined) {
		params.push(limit)
		sql += ` LIMIT $${params.length}`
	}

	if (offset !== undefined) {
		params.push(offset)
		sql += ` OFFSET $${params.length}`
	}

	return await query(pool, sql, params)
}

async function createTicket(pool: Pool, payload: CreateTicketDto) {
	const id = randomUUID()
	const createdAt = new Date()
	const planStart = new Date(payload.StartDateTime)
	const planEnd = new Date(planStart.getTime() + payload.LengthInMinutes * 60000)

	const sql = `
		INSERT INTO "IDENT_Tickets" (
			"Id",
			"DateAndTime",
			"ClientPhone",
			"ClientEmail",
			"FormName",
			"ClientFullName",
			"ClientSurname",
			"ClientName",
			"ClientPatronymic",
			"PlanStart",
			"PlanEnd",
			"Comment",
			"DoctorId",
			"DoctorName",
			"UtmSource",
			"UtmMedium",
			"UtmCampaign",
			"UtmTerm",
			"UtmContent",
			"HttpReferer"
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
		)
	`

	const params = [
		id,
		createdAt,
		payload.ClientPhone,
		payload.ClientEmail || null,
		payload.FormName || null,
		payload.ClientFullName || null,
		payload.ClientSurname || null,
		payload.ClientName || null,
		payload.ClientPatronymic || null,
		planStart,
		planEnd,
		payload.Comment || null,
		payload.DoctorId,
		payload.DoctorName || null,
		payload.UtmSource || null,
		payload.UtmMedium || null,
		payload.UtmCampaign || null,
		payload.UtmTerm || null,
		payload.UtmContent || null,
		payload.HttpReferer || null,
	]

	return await query(pool, sql, params)
}

export { getTickets, createTicket }
