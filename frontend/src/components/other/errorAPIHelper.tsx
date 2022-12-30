export function errorAPIHandler(data) {
	const error = data.message.originalError.info.message;

	return error;
}
