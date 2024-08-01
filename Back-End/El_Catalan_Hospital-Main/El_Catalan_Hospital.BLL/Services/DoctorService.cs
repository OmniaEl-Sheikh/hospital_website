using AutoMapper;
using El_Catalan_Hospital.BLL.DTO;
using El_Catalan_Hospital.BLL.Services.Contract;
using El_Catalan_Hospital.DataAccessLayer.Repository.Contract;
using El_Catalan_Hospital.models.Entities;

namespace El_Catalan_Hospital.BLL.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepo doctorRepo;
        private readonly IMapper mapper;

        public DoctorService(IDoctorRepo _doctorRepo, IMapper _mapper)
        {
            doctorRepo = _doctorRepo;
            mapper = _mapper;
        }
        //-------------------------------------------------------------
        public async Task<DoctorDto> DisplayDoctorProfileAsync(int id)
        {
            var dr = await doctorRepo.GetDoctorByIdAsync(id);
            if (dr == null) { return null; }

            var drDTO = mapper.Map<DoctorDto>(dr);
            return drDTO;
        }
        //-------------------------------------------------------------
        public async Task<DoctorDto> UpdateDoctorInformation(DoctorDto doctorDTO, int id)
        {
            // Map DoctorDto to Doctor entity
            var DoctorEntity = mapper.Map<Doctor>(doctorDTO);

            var updatedDoctor = await doctorRepo.UpdateDoctor(DoctorEntity, id);
            var updatedDoctorDTO = mapper.Map<DoctorDto>(updatedDoctor);
            return updatedDoctorDTO;
        }
        //-------------------------------------------------------------
        public async Task<IEnumerable<AppointmentDTO>> GetDoctorAppointmentsAsync(int doctorId)
        {
            var appointments = await doctorRepo.GetDoctorAppointmentsAsync(doctorId);
            return mapper.Map<IEnumerable<AppointmentDTO>>(appointments);
        }
        //-------------------------------------------------------------
        public async Task<IEnumerable<AppointmentDTO>> GetDoctorFutureAppointmentsAsync(int doctorId)
        {
            var FutureAppointments = await doctorRepo.GetDoctorFutureAppointmentsAsync(doctorId);
            return mapper.Map<IEnumerable<AppointmentDTO>>(FutureAppointments);
        }
        //-------------------------------------------------------------
        public async Task<bool> CancelAppointmentAsync(int appointmentId)
        {
            try
            {
                var result = await doctorRepo.CancelAppointmentAsync(appointmentId);
                return result;
            }
            catch (Exception ex) { return false; }
        }
        //-------------------------------------------------------------
        public IEnumerable<WorkingScheduleDTO> GetWorkingSchedule(int id)
        {
            var DoctorWorkingSchedule = doctorRepo.GetWorkingSchedules(id);
            return mapper.Map<IEnumerable<WorkingScheduleDTO>>(DoctorWorkingSchedule);
        }
        //-------------------------------------------------------------

    }
}
