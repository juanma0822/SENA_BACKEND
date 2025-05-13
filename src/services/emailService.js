const transporter = require('../config/nodemailer');

// Función para generar la plantilla genérica del correo
const generateEmailTemplate = (mainContent, footerContent) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; text-align: center; background-color: #f5f5f5; padding: 20px;">

      <!-- Barra superior morada con fondo verde -->
      <div style="background-color: #00AF00; padding: 40px 20px; text-align: center;">
        <!-- Logo dentro de un div con fondo blanco -->
        <div style="background-color: #ffffff; display: inline-block; padding: 20px; border-radius: 12px;">
          <img src="https://sena-backend-v5t4.onrender.com/LogosenaGo.png" 
               alt="Logo SenaGo" 
               style="max-width: 180px; display: block; margin: 0 auto;" />
        </div>
      </div>

      <!-- Contenido principal -->
      <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); width: 80%; margin: 20px auto;">
        <h2 style="color: #333; font-size: 24px; font-weight: bold;">Recuperación de Contraseña</h2>
        <p style="font-size: 16px; color: #666;">¡Hola ${mainContent.nombre} ${mainContent.apellido}!</p>
        <p style="font-size: 16px; color: #666;">Hemos recibido una solicitud para recuperar tu contraseña. Se ha generado una nueva contraseña temporal para que puedas acceder a tu cuenta:</p>
        <p style="font-size: 18px; color: #333; font-weight: bold;">${mainContent.nuevaContrasena}</p>
        <p style="font-size: 16px; color: #666;">Por favor, utiliza esta contraseña para iniciar sesión y cámbiala inmediatamente una vez dentro.</p>
      </div>

      <!-- Barra inferior negra -->
      <div style="background-color: #333333; color: #fff; padding: 20px; text-align: center; margin-top: 30px;">
        <p style="font-size: 14px; color: #fff;">Aplicación SenaGo - Plataforma de Registro Académico</p>
        <p style="font-size: 12px; color: #aaa;">${footerContent}</p>
        <p style="font-size: 12px; color: #aaa;">© 2025 SenaGo - Todos los derechos reservados</p>
      </div>
    </div>
  `;
};





// Función para enviar correos
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `SenaGo - Aplicación de registro <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      headers: {
        'X-Mailer': 'Nodemailer', // Identifica el software de envío
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ', info.response);
    return info;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
};

module.exports = { sendEmail, generateEmailTemplate };