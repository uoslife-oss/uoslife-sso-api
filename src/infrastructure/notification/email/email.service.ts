import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter!: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      from: this.configService.get<string>(
        'SMTP_FROM',
        '시대생팀 <no-reply@uoslife.team>',
      ),
      secure: true,
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendPlainEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      to,
      subject,
      text,
    });
  }
}
