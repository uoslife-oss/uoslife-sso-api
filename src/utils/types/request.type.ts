import { FastifyRequest } from 'fastify';

import { User } from '@domain/user';

export type AuthenticatedRequest = { user: User } & FastifyRequest;
