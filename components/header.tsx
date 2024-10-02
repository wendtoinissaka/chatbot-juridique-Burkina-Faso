// import * as React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { IconNextChat, IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import Image from 'next/image'
import NotificationIcon from '@/app/notification/NotificationIcon'
import React from 'react'

// Icône de notification
function IconNotification({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 ${className}`}
      {...props}
    >
      <path d="M12 22c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.364-6c-.182-.387-.544-.682-1.011-.793L17 15V11c0-3.519-2.613-6.432-6-6.929V4c0-.552-.449-1-1-1s-1 .448-1 1v.071C7.613 4.568 5 7.481 5 11v4l-.354.207c-.467.111-.829.406-1.011.793A1.006 1.006 0 003.004 17h18a1.007 1.007 0 00-.64-1z" />
    </svg>
  );
}

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Se connecter</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      
      <Link
        href="/laws"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        CODE EN VIGUEUR
      </Link>

      <div className="flex items-center justify-end space-x-2">
        <Link href="/login">
          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            className='rounded-2xl border-2 border-white p-2'
          />
        </Link>
        <Link href="/login">
          <span className="hidden md:block font-bold text-xl gradient-text">
            Veenge Maan
          </span>
        </Link>
        {/* Ajout de l'icône de notification ici */}
        {/* <IconNotification className="cursor-pointer text-gray-600 hover:text-black" /> */}
        <NotificationIcon />
      </div>
    </header>
  )
}