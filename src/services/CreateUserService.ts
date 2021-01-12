import User from '../models/user';
import {getRepository} from 'typeorm';
import {hash} from 'bcryptjs';
interface Request{
    name: string,
    email: string,
    password: string,
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: {
                email
            },
        });

        if (checkUserExists){
            throw new Error('Email address already used by another');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;