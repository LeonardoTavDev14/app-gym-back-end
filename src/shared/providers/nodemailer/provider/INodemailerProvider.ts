export interface INodemailerRequest {
  email: string;
  subject: string;
  content: string;
}

export interface INodemailerProvider {
  sendMail(mailParameters: INodemailerRequest): Promise<void>;
  linkConfirmationAccount: string;
  linkPlataform: string;
}
