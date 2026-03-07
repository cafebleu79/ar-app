export function middleware(req) {
  const auth = req.headers.get('authorization')

  const user = process.env.BASIC_AUTH_USER
  const pass = process.env.BASIC_AUTH_PASSWORD

  if (auth) {
    const encoded = auth.split(' ')[1]
    const decoded = atob(encoded)
    const [username, password] = decoded.split(':')

    if (username === user && password === pass) {
      return new Response(null, { status: 200 })
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: '/:path*',
}