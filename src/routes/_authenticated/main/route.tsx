import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/main')({
  component: () => <div>Main page</div>,
});
