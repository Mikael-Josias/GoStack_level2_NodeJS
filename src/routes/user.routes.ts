import {Router} from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfigs from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';


const usersRouter = Router();
const upload = multer(uploadConfigs);

usersRouter.post('/', async (request, response) => {
    
        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.send(user);

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),async (request, response) => {        
    const updateUserAvatar = new UpdateUserAvatarService();
    
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(user);

});

export default usersRouter;