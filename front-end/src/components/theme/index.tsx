'use client'
import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SolarMoonLineDuotone } from '@/components/icon/MoonIcon'
import { SunIcon } from '@/components/icon/SunIcon'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex justify-center items-center">
      {theme === 'dark' ? (
        <Button isIconOnly onClick={() => setTheme('light')}>
          <SunIcon />
        </Button>
      ) : (
        <Button isIconOnly onClick={() => setTheme('dark')}>
          <SolarMoonLineDuotone />
        </Button>
      )}
    </div>
  )
}
