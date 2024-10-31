import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('middleware')
  const { method, url } = request
  const startTime = Date.now()

  // Ghi log thông tin yêu cầu
  console.log(`Received ${method} request for ${url}`)

  // Tính thời gian xử lý (optional)
  const duration = Date.now() - startTime
  console.log(`Request duration: ${duration}ms`)

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/:path*'],
}
