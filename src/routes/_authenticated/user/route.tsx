import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user')({
  component: () => <div>User page</div>,
});
