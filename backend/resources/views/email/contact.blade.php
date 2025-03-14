<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Contact Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }

        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }

        .content {
            margin: 20px 0;
        }

        .footer {
            text-align: center;
            color: #777777;
            font-size: 12px;
            margin-top: 20px;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Contact Email</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You have recieved a contact enquiry.</p>
            <p><strong>Name:</strong> {{ $mailData['name'] }}</p>
            <p><strong>Email:</strong> {{ $mailData['email'] }}</p>
            <p><strong>Phone:</strong> {{ $mailData['phone'] }}</p>
            <p><strong>Subject:</strong> {{ $mailData['subject'] }}</p>
            <p><strong>Message:</strong>{{ $mailData['message'] }}</p>
            <p></p>
            <p>Thanks</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
