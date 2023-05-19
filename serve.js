const jsonServer = require('json-server');
const nodemailer = require('nodemailer');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/send-email', (req, res) => {
  const { email, quantity } = req.body;

  // Tạo transporter với cấu hình máy chủ email của bạn
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user:'vinh.dang23@student.passerellesnumeriques.org',
      pass: 'vlwkakeaqkdemdet',
    },
  });

  // Tạo nội dung email
  const mailOptions = {
    from: 'vinh.dang23@student.passerellesnumeriques.org',
    to: email,
    subject: 'Cable Drum Request',
    text: `You have a new Cable Drum Request for ${quantity} cable drums.`,
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

server.use(router);

const port = 3004; // Port cho máy chủ
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

  