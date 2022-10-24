import { readFileSync } from 'fs';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { SES } from 'aws-sdk';
import mjml2html from 'mjml';

export type EmailMeta = {
  to: string;
  subject: string;
};

@Injectable()
export class EmailService {
  private readonly ses!: SES;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      region: 'ap-northeast-2',
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });

    this.ses = new SES();
  }

  async sendPlainEmail(meta: EmailMeta, text: string): Promise<void> {
    await this.ses
      .sendEmail({
        Source: this.configService.get<string>(
          'EMAIL_FROM',
          'UOSLIFE <support@uoslife.team>',
        ),
        Message: {
          Subject: { Data: meta.subject },
          Body: { Text: { Data: text } },
        },
        Destination: {
          ToAddresses: [meta.to],
        },
      })
      .promise();
  }

  async sendTemplateEmail(
    meta: EmailMeta,
    templateTitle: string,
    variables: Record<string, string>,
  ): Promise<void> {
    let content = readFileSync(
      'src/utils/email-templates/' + templateTitle + '.mjml',
      'utf8',
    );

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\$${key}`, 'g');
      content = content.replace(regex, value);
    });

    await this.ses
      .sendEmail({
        Source: this.configService.get<string>(
          'EMAIL_FROM',
          'UOSLIFE <support@uoslife.team>',
        ),
        Message: {
          Subject: { Data: meta.subject },
          Body: { Html: { Data: mjml2html(content).html } },
        },
        Destination: {
          ToAddresses: [meta.to],
        },
      })
      .promise();
  }
}
