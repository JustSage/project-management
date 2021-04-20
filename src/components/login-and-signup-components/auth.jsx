function requireAuth() {
	if (!sessionStorage.getItem('logged-in-username')) return false
	return true
}

export default requireAuth
