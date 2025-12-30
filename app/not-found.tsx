import Link from 'next/link';
import { FileQuestion, MoveLeft } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';
import { ROUTES } from './constants/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="bg-muted/20 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <FileQuestion className="text-muted-foreground h-10 w-10" />
      </div>

      <h2 className="text-2xl font-black tracking-tight text-foreground">Metric Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-[350px] text-sm">URL is incorrect.</p>

      <div className="mt-8">
        <Link href={ROUTES.DASHBOARD.METRICS} aria-label="Go back to all metrics">
          <ActionButton className="bg-primary text-primary-foreground">
            <MoveLeft className="mr-2 h-4 w-4" />
            Back to All Metrics
          </ActionButton>
        </Link>
      </div>
    </div>
  );
}
