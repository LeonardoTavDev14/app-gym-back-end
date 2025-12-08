import { IWelcomeUserAccountTEMPLATE } from "./IWelcomeUserAccountTEMPLATE";

import dayjs from "dayjs";

const yearNow = dayjs().year();

export class WelcomeUserAccountTEMPLATE implements IWelcomeUserAccountTEMPLATE {
  welcomeUserAccount(name: string, linkPlataform: string): string {
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

            <!-- TÍTULO -->
            <tr>
              <td align="center" style="padding:20px 0;">
                <h2 style="margin:0; color:#333333; font-size:24px; font-weight:600;">
                  Bem-vindo ao APP-GYM
                </h2>
              </td>
            </tr>

            <!-- TEXTO PRINCIPAL -->
            <tr>
              <td style="color:#555555; font-size:16px; line-height:24px; padding:0 20px 20px;">
                <p style="margin:0 0 16px 0;">
                  Olá, ${name}
                </p>

                <p style="margin:0 0 16px 0;">
                  Estamos muito felizes em ter você conosco. Seu acesso foi criado com sucesso e agora você já pode aproveitar todos os recursos disponíveis.
                </p>

                <p style="margin:0 0 16px 0;">
                  Para começar, clique no botão abaixo para acessar sua conta:
                </p>
              </td>
            </tr>

            <!-- BOTÃO -->
            <tr>
              <td align="center" style="padding:10px 20px 30px;">
                <a href="${linkPlataform}"
                   style="background-color:#4CAF50; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-size:16px; display:inline-block; font-weight:500;">
                  Acessar sistema
                </a>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="color:#888888; font-size:13px; line-height:18px; padding:0 20px 10px;">
                <p style="margin:0;">
                  Se você não reconhece esta ação, desconsidere este e-mail.
                </p>
                <p style="margin:8px 0 0 0;">
                  © ${yearNow} — Todos os direitos reservados.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>`;
  }
}
