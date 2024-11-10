import { StudentFormValues, Student } from '../../features/classes-app/components/students-screen/StudentSideBarData.types';

export interface UseStudentDetails {
  drawerOpen: boolean;
  selectedStudent: Student | null;
  formValues: StudentFormValues;
  openDrawer: (student: Student) => void;
  closeDrawer: () => void;
  handleInputChange: (name: keyof StudentFormValues, value: number) => void;
  handleFormSubmit: () => Promise<void>;
}
