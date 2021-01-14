import {Router} from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfigs from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfigs);

usersRouter.post('/', async (request, response) => {
    try{
        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.send(user);
    } catch(err){
        
        return response.status(400).json({error: err.message});
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),async (request, response) => {
    return response.json({ ok: true });
});

export default usersRouter;