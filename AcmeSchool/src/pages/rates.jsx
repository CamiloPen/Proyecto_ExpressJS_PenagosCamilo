import { useEffect, useState } from 'react';
import { getStudentsBySchedules } from '../api/routes';
import Navbar from '../components/navbar';

function Rates() {
  const [schedules, setSchedules] = useState([]);
  const [expandedScheduleId, setExpandedScheduleId] = useState(null);
  const [grades, setGrades] = useState({}); // { scheduleId: { studentId: grade } }

  const fetchTopics = async () => {
    try {
      const scheduleRequest = await getStudentsBySchedules();
      if (scheduleRequest.status === 200) {
        setSchedules(scheduleRequest.data);
      } else {
        console.error('Error en el registro:', scheduleRequest.data || scheduleRequest);
      }
    } catch (err) {
      console.error('Error al obtener los temas:', err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleToggle = (scheduleId) => {
    setExpandedScheduleId(prev =>
      prev === scheduleId ? null : scheduleId
    );
  };

  const handleGradeChange = (scheduleId, studentId, grade) => {
    setGrades(prev => ({
      ...prev,
      [scheduleId]: {
        ...prev[scheduleId],
        [studentId]: grade
      }
    }));
  };

  const handleSubmitGrades = async (scheduleId) => {
    const studentGrades = grades[scheduleId];
    await updateGrades({scheduleId, grates: studentGrades})
    console.log('Enviar calificaciones para:', scheduleId, studentGrades);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Lista de cursos programados</h2>
        <div className="box">
          {schedules.length === 0 && <p>No hay cursos disponibles</p>}
          {schedules.map((schedule) => (
            <div className="box-card" key={schedule._id}>
              <h3>{schedule.code}</h3>
              <p>
                Curso: {schedule.course.description}<br />
                Profesor: {schedule.teacher.firstName} {schedule.teacher.lastName}<br />
                Aula: {schedule.classroom.code} - {schedule.classroom.description}<br />
                Estudiantes: {schedule.students ? schedule.students.length : 0}
              </p>
              <button onClick={() => handleToggle(schedule._id)}>
                {expandedScheduleId === schedule._id ? 'Ocultar estudiantes' : 'Calificar'}
              </button>

              {expandedScheduleId === schedule._id && schedule.students?.length > 0 && (
                <div className="student-list">
                  <h4>Estudiantes:</h4>
                  {schedule.students.map((student) => (
                    <div key={student._id} className="student-entry">
                      <span>{student.firstName} {student.lastName} </span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={grades[schedule._id]?.[student._id] || ''}
                        onChange={(e) =>
                          handleGradeChange(schedule._id, student._id, e.target.value)
                        }
                        placeholder="Nota"
                      />
                    </div>
                  ))}
                  <button onClick={() => handleSubmitGrades(schedule._id)}>
                    Guardar calificaciones
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Rates;