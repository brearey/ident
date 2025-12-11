export type ApiError = {
	name: string
	message: string
}

export type ApiResponse = {
	success: boolean
	message: string | null
	data: [] | null
	errors: ApiError[]
}
