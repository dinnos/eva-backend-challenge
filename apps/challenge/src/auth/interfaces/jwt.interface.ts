import { ROLE_TYPES } from '../schemas/user.schema';

interface IJwtResponse { access_token: string; }
interface IJwtPayload { username: string; roles: ROLE_TYPES[]; }

export { IJwtResponse, IJwtPayload };
