import Link from 'next/link';
import { ActionButton } from './components/ui/ActionButton';

export default function Home() {
  return (
    <div className="login-bg flex min-h-screen items-center justify-center p-6">
      <div className="max-w-xl text-center backdrop-blur-sm">
        <h1 className="mb-6 text-5xl font-black tracking-tight text-foreground">InsightEdge</h1>

        <p className="text-muted-foreground mb-10 text-lg font-medium leading-relaxed">
          An application for generating and viewing multi-page insights and data visualizations.
        </p>

        <ActionButton className="flex justify-center bg-primary/70">
          <Link href="/login">Enter Application</Link>
        </ActionButton>
      </div>
    </div>
  );
}
