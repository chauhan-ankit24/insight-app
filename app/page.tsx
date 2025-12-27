import Link from 'next/link';
import { ActionButton } from './components/ui/ActionButton';
import { ROUTES } from './constants/routes';

export default function Home() {
  return (
    <div className="login-bg flex min-h-screen items-center justify-center p-6">
      <div className="max-w-xl text-center backdrop-blur-sm">
        <h1 className="mb-6 text-5xl font-black tracking-tight text-black">InsightEdge</h1>

        <p className="mb-10 text-lg font-medium leading-relaxed text-black">
          An application for generating and viewing multi-page insights and data visualizations.
        </p>

        <ActionButton className="flex justify-center bg-primary/70">
          <Link href={ROUTES.LOGIN}>Enter Application</Link>
        </ActionButton>
      </div>
    </div>
  );
}
