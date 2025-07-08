import { BlogAdmin } from '@/components/blog/admin/BlogAdmin';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function BlogManagement() {
  return (
    <DashboardLayout>
      <BlogAdmin />
    </DashboardLayout>
  );
}
