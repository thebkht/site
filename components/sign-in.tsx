import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export function SignIn() {
  const handleSignIn = (provider: string) => {
    // Here you would typically implement the actual sign-in logic
    signIn(provider);
  };

  return (
    <div className="flex flex-col items-center space-y-4 h-[60vh]">
      <h2 className="text-xl mb-4">Sign in to access the guestbook</h2>
      <Button
        onClick={() => handleSignIn('google')}
        className="w-full max-w-xs bg-primary text-black hover:bg-primary/90"
      >
        Sign in with Google
      </Button>
      <Button
        onClick={() => handleSignIn('github')}
        className="w-full max-w-xs bg-primary text-black hover:bg-primary/90"
      >
        Sign in with GitHub
      </Button>
    </div>
  );
}
