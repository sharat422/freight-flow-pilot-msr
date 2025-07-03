
import { LoadBoard as LoadBoardComponent } from '@/components/loadboard/LoadBoard';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function LoadBoard() {
  return (
    <DashboardLayout>
      <LoadBoardComponent />
    </DashboardLayout>
  );
}
