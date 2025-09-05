import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/main/$storeId')({
  component: () => <div>Store page</div>,
});
