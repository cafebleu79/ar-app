export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 認証チェック
    const auth = request.headers.get('Authorization')

    if (auth) {
      const encoded = auth.split(' ')[1]
      const decoded = atob(encoded)
      const [username, password] = decoded.split(':')

      if (username === env.AUTH_USER && password === env.AUTH_PASS) {
        return env.ASSETS.fetch(request)
      }
    }

    // 認証失敗
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'text/plain',
      },
    })
  },
}
