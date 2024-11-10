import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { StudentSidebarDataProps } from './StudentSideBarData.types';

const StudentSidebarData: React.FC<StudentSidebarDataProps> = ({
  student,
  formValues,
  onInputChange,
  onSubmit,
}) => {
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

      {/* Formulário para input de dados */}
      <Box mt={4}>
        <Typography variant="h6">Informações de Aulas e Notas</Typography>
        <TextField
          label="Aulas Lecionadas"
          type="number"
          value={formValues.aulasLecionadas}
          onChange={(e) => onInputChange('aulasLecionadas', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Aulas Atendidas"
          type="number"
          value={formValues.aulasAtendidas}
          onChange={(e) => onInputChange('aulasAtendidas', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nota P1"
          type="number"
          value={formValues.notaP1}
          onChange={(e) => onInputChange('notaP1', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nota P2"
          type="number"
          value={formValues.notaP2}
          onChange={(e) => onInputChange('notaP2', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onSubmit} 
          fullWidth 
          sx={{ marginTop: '16px' }}
        >
          Lançar Notas e Frequência
        </Button>
      </Box>
    </Box>
  );
};

export default StudentSidebarData;
