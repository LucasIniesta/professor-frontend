import { StudentFormValues } from '../../features/classes-app/components/students-screen/StudentSideBarData.types';

export const submitStudentDetails = async (studentId: string, data: StudentFormValues) => {
  try {
    const response = await fetch(`/api/students/${studentId}/evaluation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar dados');
    }

    alert('Dados enviados com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    alert('Erro ao enviar dados.');
  }
};
