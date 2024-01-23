exports.emailOtpTemplate = (otp) => `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>OTP</title>
          <style>
            body {
              font-family: "Arial", sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
    
            .container {
              max-width: 400px;
              width: 100%;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              text-align: center;
            }
            .logo {
              width: 80px;
              height: 80px;
              margin-bottom: 20px;
            }
    
            h2 {
              color: #333;
            }
    
            p {
              color: #666;
              margin-bottom: 20px;
            }
    
            .otp {
              font-size: 1.5rem;
              color: #3498db;
              margin-bottom: 20px;
            }
    
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #3498db;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }
    
            .button:hover {
              background-color: #2980b9;
            }
    
            .footer {
              margin-top: 20px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img class="logo" src="https://your-ecommerce-logo-url.png" alt="Logo" />
            <h2>OTP</h2>
            <p>
             Your OTP for password reset.Do not with others
            </p>
            <span class="otp"
              >${otp}</span>
    <p class="footer">
      If you didn't sign up for an account, please ignore this email.
    </p>
          </div >
        </body >
      </html >
      `;
