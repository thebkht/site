'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { signIn, signOut } from 'next-auth/react';

export function SignOut() {
  return (
    <Button
      className="mt-2 mb-6 text-white"
      size={'sm'}
      variant={'link'}
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
}

export function SignIn() {
  return (
    <div className="flex flex-col gap-2 items-end mb-8">
      <Button className="rounded-none" onClick={() => signIn('github')}>
        <Icons.gitHub className="w-5 h-5" />
        <div className="ml-3">Sign in with GitHub</div>
      </Button>
      <Button className="rounded-none" onClick={() => signIn('google')}>
        <Icons.google className="w-5 h-5" />
        <div className="ml-3">Sign in with Google</div>
      </Button>
    </div>
  );
}
