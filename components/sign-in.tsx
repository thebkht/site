import { Button } from '@/components/ui/button';

export function SignIn({ onSignIn }: { onSignIn: () => void }) {
  const handleSignIn = (provider: string) => {
    // Here you would typically implement the actual sign-in logic
    console.log(`Signing in with ${provider}`);
    onSignIn();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl mb-4">Sign in to access the guestbook</h2>
      <Button
        onClick={() => handleSignIn('Google')}
        className="w-full max-w-xs bg-primary text-black hover:bg-primary/90"
      >
        Sign in with Google
      </Button>
      <Button
        onClick={() => handleSignIn('GitHub')}
        className="w-full max-w-xs bg-primary text-black hover:bg-primary/90"
      >
        Sign in with GitHub
      </Button>
    </div>
  );
}
