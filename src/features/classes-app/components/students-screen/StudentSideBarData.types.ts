export interface Student {
    id: string;
    name: string;
    status: string;
  }
  
  export interface StudentFormValues {
    aulasLecionadas: number;
    aulasAtendidas: number;
    notaP1: number;
    notaP2: number;
  }
  
  export interface StudentSidebarDataProps {
    student: Student;
    formValues: StudentFormValues;
    onInputChange: (name: keyof StudentFormValues, value: number) => void;
    onSubmit: () => Promise<void>;
  }
  