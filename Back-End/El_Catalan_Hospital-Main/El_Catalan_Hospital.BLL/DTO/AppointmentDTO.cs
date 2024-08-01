using El_Catalan_Hospital.models.Entities;

namespace El_Catalan_Hospital.BLL.DTO
{
    public class AppointmentDTO
    {
        public int Id { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string PatientName { get; set; } 
        public string DoctorName { get; set; }
        public Status Status { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
    }
}
