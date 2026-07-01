import { IUserPayload } from "./auth/types";

declare global {
    namespace Express {
        export interface Request {
            user?: IUserPayload;
            params?: {
                task_id: number;
            }
        }
    }
}