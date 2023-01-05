export function getCurrentUser() {
	const data = sessionStorage.getItem('user');
	return JSON.parse(data!);
}

export function isAuthenticated(): boolean {
	const user = getCurrentUser();

	if (user) {
		return true;
	} else return false;
}
