exports.purchaseConfirmationTemplate = (orderId) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Confirmation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333;
            text-align: center;
        }

        p {
            color: #666;
            text-align: center;
        }

        .product-details {
            margin-top: 20px;
            padding: 15px;
            background-color: #f0f0f0;
            border-radius: 5px;
        }

        .product-details strong {
            color: #333;
        }

        .thank-you-message {
            margin-top: 20px;
            text-align: center;
            font-size: 18px;
            color: #008000;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Purchase Confirmation</h2>
        <div class="product-details">
            <p>Thank you for your purchase of products <strong>${"ProductName"}</strong>. Your order id is <strong>${orderId}</strong>.</p>
        </div>
        <p class="thank-you-message">Thank you for shopping with us!</p>
        <p class="footer">© 2024 e-commerce. All rights reserved.</p>
    </div>
</body>

</html>
`;
