import { Request } from 'express';

import { User } from '@domain/user';

export type AuthenticatedRequest = { user: User } & Request;
