import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton, Drawer } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useListStudentsFromClassById } from '../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.hook';
import StudentSidebarData from '../components/students-screen/StudentSideBarData';
import { useStudentDetails } from '../../../hooks/use-student-details/use-student-details.hook';

export const StudentsScreen: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { result: studentsInfo, loading, error } = useListStudentsFromClassById({ classId: classId! });
  const {
    drawerOpen,
    selectedStudent,
    formValues,
    openDrawer,
    closeDrawer,
    handleInputChange,
    handleFormSubmit,
  } = useStudentDetails();

  const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <Box sx={{ padding: '40px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={handleBackClick} sx={{ marginRight: '2px' }}>
          <ArrowBackIcon /> 
          <Typography variant="h6"> Voltar </Typography> 
        </IconButton>
        <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
          Alunos da Turma: {classId}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      
      {studentsInfo && studentsInfo.length > 0 ? (
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
          {studentsInfo.map((student) => (
            <Box key={student.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' }, padding: '1rem' }}>
              <Card sx={{ height: '100%', boxShadow: 3 }} onClick={() => openDrawer(student)}>
                <CardContent>
                  <Typography variant="h5" component="h2">{student.name}</Typography>
                  <Typography color="textSecondary">RA: {student.id}</Typography>
                  <Typography color="textSecondary">Status: {student.status}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && <Typography>Nenhum aluno encontrado.</Typography>
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} sx={{ '& .MuiDrawer-paper': { width: '300px', padding: '20px' } }}>
        {selectedStudent && (
          <StudentSidebarData 
            student={selectedStudent} 
            formValues={formValues}
            onInputChange={handleInputChange}
            onSubmit={handleFormSubmit} 
          />
        )}
      </Drawer>
    </Box>
  );
};
