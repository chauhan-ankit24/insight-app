import Image from 'next/image';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="login-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-[400px] space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-violet-500 opacity-15 blur transition duration-1000 group-hover:opacity-50" />
            <div className="relative flex items-center justify-center rounded-2xl p-2 shadow-2xl backdrop-blur-lg">
              <Image
                src="/logo.png"
                alt="Logo"
                width={180}
                height={180}
                priority
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        <LoginForm />

        <p className="text-muted-foreground/40 text-center text-[10px] font-bold uppercase tracking-[0.4em]">
          InsightEdge Secure Protocol v2.0
        </p>
      </div>
    </div>
  );
}
