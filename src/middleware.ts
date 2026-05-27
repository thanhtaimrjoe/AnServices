import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('as-session')
  const { pathname } = request.nextUrl

  // 1. Kiểm tra session
  let userData = null
  try {
    userData = session ? JSON.parse(session.value) : null
  } catch (e) {
    console.error('Malformed session cookie')
  }

  const isAuthPage = pathname === '/login'
  const isDashboardPage = pathname.startsWith('/admin') || 
                         pathname.startsWith('/worker') || 
                         pathname.startsWith('/customer')

  // 2. Nếu chưa đăng nhập và cố gắng vào dashboard -> redirect to login
  if (!userData && isDashboardPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 3. Nếu đã đăng nhập, kiểm tra vai trò
  if (userData) {
    const role = userData.role

    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    if (pathname.startsWith('/worker') && role !== 'WORKER') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    if (pathname.startsWith('/customer') && role !== 'CUSTOMER') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    
    // Nếu vào trang login khi đã đăng nhập -> redirect về dashboard tương ứng
    if (isAuthPage && role) {
      const url = request.nextUrl.clone()
      url.pathname = `/${role.toLowerCase()}`
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
