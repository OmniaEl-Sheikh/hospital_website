using AutoMapper;
using El_Catalan_Hospital.BLL.DTO;
using El_Catalan_Hospital.models.Entities;

namespace El_Catalan_Hospital.BLL.MappingProfiles
{
    public class WorkingScheduleProfile : Profile
    {
        public WorkingScheduleProfile() 
        { 
            CreateMap<WorkingSchedule,WorkingScheduleDTO>()
            .ForMember(destination => destination.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(destination => destination.Working_Schedule_Start_Time, opt => opt.MapFrom(src => src.Working_Schedule_Start_Time))
            .ForMember(destination => destination.Working_Schedule_End_Time, opt => opt.MapFrom(src => src.Working_Schedule_End_Time))
            .ForMember(destination => destination.Working_Schedule_Day, opt => opt.MapFrom(src => src.Working_Schedule_Day))
            .ForMember(destination => destination.Doctor_ID, opt => opt.MapFrom(src => src.Doctor_ID))
            .ReverseMap();

        }
    }
}
