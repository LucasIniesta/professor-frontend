import { useState } from 'react';
import { UseStudentDetails} from '../use-student-details/use-student-details.types';
import { Student, StudentFormValues } from '../../features/classes-app/components/students-screen/StudentSideBarData.types'
import { submitStudentDetails } from '../../services/student-details/student-details.service';

export const useStudentDetails = (): UseStudentDetails => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formValues, setFormValues] = useState<StudentFormValues>({
    aulasLecionadas: 0,
    aulasAtendidas: 0,
    notaP1: 0,
    notaP2: 0,
  });

  const openDrawer = (student: Student) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedStudent(null);
  };

  const handleInputChange = (name: keyof StudentFormValues, value: number) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (selectedStudent) {
      await submitStudentDetails(selectedStudent.id, formValues);  // Passa o studentId para o serviço
      closeDrawer();
    }
  };

  return {
    drawerOpen,
    selectedStudent,
    formValues,
    openDrawer,
    closeDrawer,
    handleInputChange,
    handleFormSubmit,
  };
};
