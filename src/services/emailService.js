const transporter = require('../config/nodemailer');

// Función para generar la plantilla genérica del correo
const generateEmailTemplate = (mainContent, footerContent) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; text-align: center;">
      <!-- Barra azul superior -->
      <div style="background-color: #00AF00; height: 30px; width: 100%;"></div>

      <!-- Logo al principio del contenido -->
      <div style="text-align: center; margin: 20px 0;">
        <img src="https://sena-backend-v5t4.onrender.com/LogoSenaGo.png" 
             alt="Logo SenaGo" 
             style="max-width: 150px; margin-bottom: 20px;" />
      </div>

      <!-- Contenido principal -->
      <div style="text-align: center;">
        ${mainContent}
      </div>

      <!-- Footer específico -->
      <div style="text-align: center;">
        ${footerContent}
      </div>

      <!-- Barra azul inferior -->
      <div style="background-color: #00AF00; height: 30px; width: 100%;"></div>

      <!-- Texto adicional -->
      <div style="text-align: center; padding: 20px;">
        <p style="font-size: 14px; color: #666;">Plataforma de Registro Académico Estudiantil</p>
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