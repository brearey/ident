import { config } from 'dotenv'
config() // dotenv
import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { ApiResponse } from './types/app-types'
import { logger } from './utils/logger'
import { getTickets } from './models/ticket'
import {createPool} from './database/db'

const app: Application = express()
const PORT = process.env.SERVER_PORT || 5100
const pool = createPool(
  'localhost',
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
)

app.use(bodyParser.json())
app.use(logger.request)

app.get('/health', (req: Request, res: Response) => {
	const response: ApiResponse = {
		success: true,
		message: 'ok',
		data: null,
		errors: [],
	}
	res.status(200).json(response)
})

app.get('/GetTickets', async (req: Request, res: Response) => {
  logger.info(`/GetTickets req.query.dateTimeFrom ${req.query.dateTimeFrom}`)
  logger.info(`/GetTickets req.query.dateTimeTo ${req.query.dateTimeTo}`)
  logger.info(`/GetTickets req.query.limit ${req.query.limit}`)
  logger.info(`/GetTickets req.query.offset ${req.query.offset}`)
  const result = await getTickets(pool)
  if (result?.rows[0]) logger.info(result.rows[0])
	res.status(200).end('Some message')
})

app.listen(PORT, () => {
	logger.info(`Server running at http://localhost:${PORT}`)
})
