import nodemailer from 'nodemailer';
import { logDebug } from './logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const Mailer = async (to, type, options = {}) => {
  let subject, text;

  switch (type) {
    case 'login':
      subject = 'メールアドレスの確認';
      text = `下記のリンクを開いてメールアドレスを確認してください。有効期限は10分です。\n${process.env.URL}/#${options.id}\n\nIP: ${options.IP}\nUA: ${options.UA}`;
      break;
    default:
      throw new Error('not found type');
  }

  const info = await transporter.sendMail({
    from: process.env.SMTP_ADDRESS,
    to,
    subject: `${subject} | Room Console`,
    text: `${text}

--------------------
* このメールに心当たりがない場合はリンクをクリックせずに無視してください。
* このメールは自動配信です。お問い合わせはホームページに記載の連絡先よりお願いいたします。
${process.env.URL}/`
    // html: '<html></html>'
  });
  logDebug(info);
  if (info.rejected[0]) {
    throw new Error('mail rejected');
  }
};

export default Mailer;
