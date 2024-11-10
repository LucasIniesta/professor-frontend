import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton, Drawer } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useListStudentsFromClassById } from '../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.hook';
import StudentSidebarData from '../components/students-screen/StudentSideBarData';

interface Student {
  id: string;
  name: string;
  status: string;
}

export const StudentsScreen: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { result: studentsInfo, loading, error } = useListStudentsFromClassById({ classId: classId! });
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleBackClick = () => {
    navigate('/'); 
  };

  const handleCardClick = (student: Student) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedStudent(null);
  };

  const handleFormSubmit = async (data: {
    studentId: string;
    aulasLecionadas: number;
    aulasAtendidas: number;
    notaP1: number;
    notaP2: number;
  }) => {
    try {
      await fetch('/api/students/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      alert('Dados enviados com sucesso!');
      handleCloseDrawer();
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados.');
    }
  };

  return (
    <Box sx={{ padding: '40px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={handleBackClick} sx={{ marginRight: '2px' }}>
          <ArrowBackIcon/> 
          <Typography variant="h6"> Voltar </Typography> 
        </IconButton>
        <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
          Alunos da Turma: {classId}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      
      {studentsInfo && studentsInfo.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={2}
        >
          {studentsInfo.map((student: Student) => (
            <Box
              key={student.id}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                padding: '1rem'
              }}
            >
              <Card 
                sx={{ height: '100%', boxShadow: 3 }}
                onClick={() => handleCardClick(student)} 
              >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {student.name}
                  </Typography>
                  <Typography color="textSecondary">
                    RA: {student.id}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {student.status}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && <Typography>Nenhum aluno encontrado.</Typography>
      )}

      {/* Drawer que aparece à direita */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{ '& .MuiDrawer-paper': { width: '300px', padding: '20px' } }}
      >
        {selectedStudent && (
          <StudentSidebarData 
            student={selectedStudent} 
            onSubmit={handleFormSubmit} 
          />
        )}
      </Drawer>
    </Box>
  );
};
