import { IConfirmUserAccountTEMPLATE } from "./IConfirmUserAccountTEMPLATE";

import dayjs from "dayjs";

const yearNow = dayjs().year();

export class ConfirmUserAccountTEMPLATE implements IConfirmUserAccountTEMPLATE {
  confirmUserAccount(linkConfirmation: string): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>

  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:'Poppins', Arial, sans-serif;">

    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; padding:20px 0; font-family:'Poppins', Arial, sans-serif;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; padding:20px; font-family:'Poppins', Arial, sans-serif;">

            <!-- Header -->
            <tr>
              <td align="center" style="padding:20px 0; font-family:'Poppins', Arial, sans-serif;">
                <h2 style="margin:0; color:#333333; font-size:24px; font-family:'Poppins', Arial, sans-serif;">
                  Confirme seu cadastro
                </h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="color:#555555; font-size:16px; line-height:24px; padding:0 20px 20px 20px; font-family:'Poppins', Arial, sans-serif;">
                <p style="margin:0 0 16px 0; font-family:'Poppins', Arial, sans-serif;">
                  Olá,
                </p>
                <p style="margin:0 0 16px 0; font-family:'Poppins', Arial, sans-serif;">
                  Obrigado por se cadastrar em nossa plataforma. Antes de prosseguir, precisamos confirmar que este e-mail realmente pertence a você.
                </p>
                <p style="margin:0 0 16px 0; font-family:'Poppins', Arial, sans-serif;">
                  Clique no botão abaixo para validar sua conta:
                </p>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding:10px 20px 30px 20px; font-family:'Poppins', Arial, sans-serif;">
                <a href="${linkConfirmation}"
                   style="background-color:#4CAF50; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-size:16px; display:inline-block; font-family:'Poppins', Arial, sans-serif;">
                  Confirmar cadastro
                </a>
              </td>
            </tr>

            <tr>
              <td style="color:#888888; font-size:13px; line-height:18px; padding:0 20px 10px 20px; font-family:'Poppins', Arial, sans-serif;">
                <p style="margin:0; font-family:'Poppins', Arial, sans-serif;">
                  Caso você não tenha solicitado este cadastro, apenas ignore este e-mail.
                </p>
                <p style="margin:8px 0 0 0; font-family:'Poppins', Arial, sans-serif;">
                  © ${yearNow} Sua Empresa — Todos os direitos reservados.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;
  }
}
