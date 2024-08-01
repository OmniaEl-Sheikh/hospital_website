using AutoMapper;
using El_Catalan_Hospital.BLL.DTO;
using El_Catalan_Hospital.models.Entities;

namespace El_Catalan_Hospital.BLL.MappingProfiles
{
    public class AppointmentProfile : Profile
    {
        public AppointmentProfile()
        {
            CreateMap<Appointment, AppointmentDTO>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
           .ForMember(dest => dest.AppointmentDate, opt => opt.MapFrom(src => src.Appointment_Date))
           .ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.PatientId))
           .ForMember(dest => dest.DoctorId, opt => opt.MapFrom(src => src.DoctorId))
           .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.AppUser.FullName))
           .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor.AppUser.FullName))
           .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
           .ReverseMap();
        }

    }
}
