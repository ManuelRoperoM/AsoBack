export const resetPasswordTemplate = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nueva contraseña generada</title>
    <style>
      body {
        background-color: #f6f9fc;
        font-family: Roboto, Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #202124;
      }

      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .header {
        background-color: #4285f4;
        color: white;
        padding: 24px;
        text-align: center;
      }

      .header h1 {
        font-size: 22px;
        margin: 0;
        font-weight: 500;
      }

      .content {
        padding: 30px 40px;
      }

      .content h2 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 16px;
      }

      .content p {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 24px;
      }

      .password-box {
        background-color: #f1f3f4;
        border-left: 4px solid #1a73e8;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        border-radius: 4px;
        color: #202124;
        letter-spacing: 0.5px;
      }

      .footer {
        background-color: #f1f3f4;
        text-align: center;
        padding: 16px;
        font-size: 13px;
        color: #5f6368;
      }

      .footer a {
        color: #1a73e8;
        text-decoration: none;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h1>Tu nueva contraseña</h1>
      </div>

      <div class="content">
        <h2>Hola {{nombre}},</h2>
        <p>
          Se ha generado una nueva contraseña temporal para tu cuenta. Por motivos de seguridad, te recomendamos cambiarla una vez que inicies sesión.
        </p>

        <div class="password-box">
          {{nueva_contrasena}}
        </div>

        <p>
          Si no solicitaste este cambio, te recomendamos actualizar tu contraseña inmediatamente desde tu cuenta.
        </p>
      </div>

      <div class="footer">
        <p>Este mensaje se envió automáticamente, por favor no respondas.</p>
        <p>
          © {{año}} Tu Empresa. Todos los derechos reservados. |
          <a href="{{sitio}}">Visita nuestro sitio</a>
        </p>
      </div>
    </div>
  </body>
</html>`;
