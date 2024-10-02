'use client';

import { Icons } from 'app/components/icons';
import { signIn, signOut } from 'next-auth/react';

export function SignOut() {
  return (
    <button
      className="text-xs text-gray-700 dark:text-gray-300 mt-2 mb-6"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <div className="flex gap-2 items-center">
      <button
        className="px-3 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded p-1 text-sm inline-flex items-center leading-4 text-gray-900 dark:text-gray-100 mb-8"
        onClick={() => signIn('github')}
      >
        <Icons.gitHub className="w-5 h-5" />
        <div className="ml-3">Sign in with GitHub</div>
      </button>
      <button
        className="px-3 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded p-1 text-sm inline-flex items-center leading-4 text-gray-900 dark:text-gray-100 mb-8"
        onClick={() => signIn('google')}
      >
        <Icons.google className="w-5 h-5" />
        <div className="ml-3">Sign in with Google</div>
      </button>
    </div>
  );
}
