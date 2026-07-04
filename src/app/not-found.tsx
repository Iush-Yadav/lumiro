import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl text-clay">404</p>
      <h1 className="mt-4 font-display text-3xl">This light has wandered off.</h1>
      <p className="mt-3 max-w-sm text-ink/60">
        The page you are looking for does not exist, or has been retired with a past collection.
      </p>
      <div className="mt-10">
        <Button href="/">Return Home</Button>
      </div>
    </main>
  );
}
