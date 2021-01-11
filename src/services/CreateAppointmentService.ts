import Appointment from '../models/appointments';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import {startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateApointmentService {

    public async execute({provider, date}: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error("This appointment is already booked");
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateApointmentService;