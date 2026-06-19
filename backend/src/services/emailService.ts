import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const baseTemplate = (content: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DebugMeLater</title>
  <style>
    body { background: #0A0C12; color: #F8FAFC; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; padding: 0 20px; }
    .logo { font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #7C3AED, #3B82F6, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 32px; }
    .card { background: #0F1118; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7C3AED, #3B82F6); color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; margin: 24px 0; }
    .footer { color: #475569; font-size: 13px; margin-top: 32px; text-align: center; }
    h1 { font-size: 28px; font-weight: 700; margin: 0 0 16px; color: #F8FAFC; }
    p { color: #94A3B8; line-height: 1.7; margin: 0 0 16px; }
    .highlight { color: #A78BFA; font-weight: 600; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">DebugMeLater</div>
    <div class="card">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} DebugMeLater. Premium Source Code Marketplace.</p>
      <p>Where code becomes craft.</p>
    </div>
  </div>
</body>
</html>
`;

export const sendOrderReceivedEmail = async (
  to: string,
  customerName: string,
  orderId: string,
  projectTitle: string,
  amount: number
): Promise<void> => {
  const content = `
    <h1>Order Received! 🎉</h1>
    <p>Hey <span class="highlight">${customerName}</span>,</p>
    <p>We've received your order and our team is reviewing your payment. You'll receive the download link within <strong>2–4 hours</strong>.</p>
    <hr class="divider" />
    <p><strong>Order ID:</strong> <span class="highlight">${orderId}</span></p>
    <p><strong>Project:</strong> ${projectTitle}</p>
    <p><strong>Amount:</strong> ₹${amount}</p>
    <hr class="divider" />
    <p>If you have any questions, feel free to reply to this email.</p>
    <p style="color: #475569; font-size: 13px;">Please keep this order ID for your records.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'DebugMeLater <noreply@debugmelater.com>',
    to,
    subject: `Order Received — ${orderId} | DebugMeLater`,
    html: baseTemplate(content),
  });
};

export const sendDownloadLinkEmail = async (
  to: string,
  customerName: string,
  projectTitle: string,
  downloadUrl: string,
  orderId: string
): Promise<void> => {
  const content = `
    <h1>Your Download is Ready! ⚡</h1>
    <p>Hey <span class="highlight">${customerName}</span>,</p>
    <p>Great news — your payment has been verified and your source code is ready to download!</p>
    <hr class="divider" />
    <p><strong>Project:</strong> ${projectTitle}</p>
    <p><strong>Order ID:</strong> <span class="highlight">${orderId}</span></p>
    <hr class="divider" />
    <p>⚠️ <strong>Important:</strong> This download link expires in <strong>24 hours</strong> and can only be used <strong>3 times</strong>. Download and save the file immediately.</p>
    <a href="${downloadUrl}" class="btn">Download Source Code →</a>
    <p style="color: #475569; font-size: 13px;">If the button doesn't work, copy this URL: ${downloadUrl}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'DebugMeLater <noreply@debugmelater.com>',
    to,
    subject: `Download Ready — ${projectTitle} | DebugMeLater`,
    html: baseTemplate(content),
  });
};

export const sendOrderRejectedEmail = async (
  to: string,
  customerName: string,
  orderId: string,
  projectTitle: string,
  note?: string
): Promise<void> => {
  const content = `
    <h1>Order Update</h1>
    <p>Hey <span class="highlight">${customerName}</span>,</p>
    <p>Unfortunately, we were unable to verify your payment for the following order:</p>
    <hr class="divider" />
    <p><strong>Order ID:</strong> <span class="highlight">${orderId}</span></p>
    <p><strong>Project:</strong> ${projectTitle}</p>
    ${note ? `<p><strong>Note:</strong> ${note}</p>` : ''}
    <hr class="divider" />
    <p>Please contact us if you believe this is a mistake or need assistance with your payment.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'DebugMeLater <noreply@debugmelater.com>',
    to,
    subject: `Order Update — ${orderId} | DebugMeLater`,
    html: baseTemplate(content),
  });
};
