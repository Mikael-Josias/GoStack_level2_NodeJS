import {Router} from 'express';
import {startOfHour, parseISO} from 'date-fns';
import AppointmentsRepository from '../repositories/appointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parseDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parseDate);

    if(findAppointmentInSameDate){
        return response
            .status(400)
            .json({message: "This appointment is already booked"});
    }

    const appointment = appointmentsRepository.create(provider, date);
    
    return response.json(appointment);
});

export default appointmentsRouter;