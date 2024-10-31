import './globals.css'
import '@fontsource/manrope'
import { Providers } from './providers'
import 'dotenv/config'
import { ToastProvider } from '@/hook/useToast'
import { UserProvider } from '@/hook/useDecodeToken'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <UserProvider>
            <ToastProvider>{children}</ToastProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  )
}
