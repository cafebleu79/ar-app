export default {
  async fetch(request, env) {
    const auth = request.headers.get('Authorization')

    if (auth) {
      const encoded = auth.split(' ')[1]
      const decoded = atob(encoded)
      const [username, password] = decoded.split(':')

      if (username === env.AUTH_USER && password === env.AUTH_PASS) {
        // 認証成功 → アセットをそのまま返す
        return env.ASSETS.fetch(request)
      }
    }

    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    })
  },
}