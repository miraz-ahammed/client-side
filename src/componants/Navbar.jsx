'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  // Page change hole mobile menu bondho hoye jabe
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
          router.refresh();
        },
      },
    });
  };

  const linkClass = (href) => {
    const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
    return `text-sm font-medium ${
      active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
    }`;
  };

  const authButtons = isPending ? null : session ? (
    <>
      <span className="text-sm text-gray-700">{session.user.name}</span>
      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="rounded-lg border border-blue-600 px-4 py-1.5 text-center text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="rounded-lg bg-blue-600 px-4 py-1.5 text-center text-sm font-medium text-white hover:bg-blue-700"
      >
        Register
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-blue-600">
          TechStore
        </Link>

        {/* Desktop menu (md o tar boro screen) */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
          <Link href="/products" className={linkClass('/products')}>
            Products
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">{authButtons}</div>

        {/* Hamburger button (shudhu mobile e) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="space-y-4 border-t border-gray-200 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className={linkClass('/')}>
              Home
            </Link>
            <Link href="/products" className={linkClass('/products')}>
              Products
            </Link>
          </div>
          <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
            {authButtons}
          </div>
        </div>
      )}
    </nav>
  );
}