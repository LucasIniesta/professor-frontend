import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface StudentSidebarDataProps {
  student: {
    id: string;
    name: string;
    status: string;
  };
  onSubmit: (data: {
    studentId: string;
    aulasLecionadas: number;
    aulasAtendidas: number;
    notaP1: number;
    notaP2: number;
  }) => void;
}

const StudentSidebarData: React.FC<StudentSidebarDataProps> = ({ student, onSubmit }) => {
  const [aulasLecionadas, setAulasLecionadas] = useState<number>(0);
  const [aulasAtendidas, setAulasAtendidas] = useState<number>(0);
  const [notaP1, setNotaP1] = useState<number>(0);
  const [notaP2, setNotaP2] = useState<number>(0);

  const handleSubmit = () => {
    onSubmit({
      studentId: student.id,
      aulasLecionadas,
      aulasAtendidas,
      notaP1,
      notaP2,
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {student.name}
      </Typography>
      <Typography color="textSecondary">
        RA: {student.id}
      </Typography>
      <Typography color="textSecondary">
        Status: {student.status}
      </Typography>

      <Box mt={4}>
        <Typography variant="h6">Informações de Aulas e Notas</Typography>
        <TextField
          label="Aulas Lecionadas"
          type="number"
          value={aulasLecionadas}
          onChange={(e) => setAulasLecionadas(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Aulas Atendidas"
          type="number"
          value={aulasAtendidas}
          onChange={(e) => setAulasAtendidas(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nota P1"
          type="number"
          value={notaP1}
          onChange={(e) => setNotaP1(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nota P2"
          type="number"
          value={notaP2}
          onChange={(e) => setNotaP2(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          fullWidth 
          sx={{ marginTop: '16px' }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default StudentSidebarData;
