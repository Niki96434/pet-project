import { IUserPayload } from "./jwt-auth/types";

declare global {
    namespace Express {
        interface Request {
            user: IUserPayload;
        }
    }
}