import { nodemailerConfig } from "../nodemailerConfig";

import { INodemailerRequest } from "./INodemailerProvider";
import { INodemailerProvider } from "./INodemailerProvider";

import { SendMailError } from "../../../errors/nodemailer/SendMailError";

import dotenv from "dotenv";
dotenv.config();

export class NodemailerProvider implements INodemailerProvider {
  linkConfirmationAccount: string;
  constructor() {
    this.linkConfirmationAccount = `${process.env.FRONTEND}/auth/user/cadastrar`;
  }
  async sendMail(mailParameters: INodemailerRequest): Promise<void> {
    const mailOptions = {
      to: mailParameters.email,
      from: process.env.MAIL_USER,
      subject: mailParameters.subject,
      text: `APP-GYM-PROJECT`,
      html: mailParameters.content,
    };

    try {
      await nodemailerConfig.sendMail(mailOptions);
    } catch (err: any) {
      throw new SendMailError();
    }
  }
}
