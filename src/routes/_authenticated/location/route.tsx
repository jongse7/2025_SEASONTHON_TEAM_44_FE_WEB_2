import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/location')({
  component: () => <div>Store page</div>,
});
