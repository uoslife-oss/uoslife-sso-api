import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserRegisteredEvent } from '@application/user/user-core/events/user-registered.event';
import { UserVerificationService } from '@application/user/user-verification/services/user-verification.service';

@Injectable()
export class UserRegisterListener {
  constructor(
    @Inject('EmailVerificationService')
    private readonly emailVerificationService: UserVerificationService,
  ) {}

  @OnEvent('user.registered')
  async handle(payload: UserRegisteredEvent): Promise<void> {
    const verificationId = await this.emailVerificationService.request(
      payload.user.id,
    );

    await this.emailVerificationService.process(verificationId);
  }
}
