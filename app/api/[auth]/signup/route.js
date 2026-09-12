import connect from "@/lib/db";
import User from "@/lib/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'
import { cookies } from "next/headers";
import path from "path";
import crypto from "crypto";

function generateAccountNumber() {
  return crypto.randomInt(1000000000, 10000000000).toString();
}

export const POST = async (req) => {
  await connect();
  try {
    const body = await req.json();
    const { email, fullname, password, phone } = body;
    const user = await User.findOne({ email });
    const admin = await User.findOne({ role: "admin" });

    // ---------------------------------------------------
    // Validate request
    // ---------------------------------------------------

    if (!fullname || !email || !password || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, phone number and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (user) {
      return new NextResponse(
        JSON.stringify({
          message: "User already exit with this email.",
        }),
        { status: 400 },
      );
    }

     const accountNumber = generateAccountNumber();

    const newUser = User(body);
    newUser.accountNumber = accountNumber;
    await newUser.save();

    // Send a welcome email message to the new user
    const now = new Date();

    // Create a formatter instance
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Send email notification
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // ---------------------------------------------------
    // PDF location
    // ---------------------------------------------------

    const pdfPath = path.join(
      process.cwd(),
      "public",
      "docs",
      "Ziraat-Account-Opening-Form.pdf",
    );

    // Set up email data
    let welcomeEmail = {
      from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
      to: `${newUser.email}`,
      subject: `Welcome to Ziraat Bank - Your Banking Account`,
      html: createWelcomeEmail({
        fullname,
        email,
        password,
      }),
    };

    let accountFormEmail = {
      from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
      to: `${newUser.email}`,
      subject: `Ziraat Bank - Bank Account Opening Form`,
      html: createFormEmail({
        fullname,
      }),
      attachments: [
        {
          filename: "Ziraat-Account-Opening-Form.pdf",

          path: pdfPath,

          contentType: "application/pdf",
        },
      ],
    };

    // ---------------------------------------------------
    // Send first email
    // ---------------------------------------------------

    await transporter.sendMail(welcomeEmail);

    // ---------------------------------------------------
    // Send second email
    // ---------------------------------------------------

    await transporter.sendMail(accountFormEmail);

    // Send mail with defined transport object
    //await transporter.sendMail(mailOptions);

    // If OTP is valid, proceed TO SIGNUP
    if (admin) {
      let mailOptions = {
        from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
        to: `${admin.email}`,
        subject: `Account Onboarding - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
        text: `You have a new user signup on ${process.env.NEXT_PUBLIC_COMPANY_NAME}.`,
        html: `
                    
                    <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            background:#f4f4f7;
          "
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width:600px;
                  background:#ffffff;
                  border-radius:20px;
                  overflow:hidden;
                "
              >

                <!-- Paste OTP sections here -->

          <!-- ========================= -->

        <!-- HERO HEADER -->

        <!-- ========================= -->

        <tr>
          <td
            align="center"
            style="
              background:#e30613;
              padding:50px 40px;
            "
          >


        <img
          src="${process.env.NEXT_PUBLIC_SITE_URL}/public/icons/logoMain2.png"
          alt="${process.env.NEXT_PUBLIC_COMPANY_NAME}"
          width="70"
          style="
            display:block;
            margin-bottom:20px;
          "
        >

        <div
          style="
            width:72px;
            height:72px;
            line-height:72px;
            border-radius:50%;
            background:#ffffff;
            color:#00ff00;
            font-size:36px;
            font-weight:bold;
            margin:0 auto 20px;
          "
        >
          ✓
        </div>

        <h1
          style="
            color:#ffffff;
            margin:0;
            font-size:32px;
            font-weight:700;
            line-height:42px;
          "
        >
          You have a new user signup on ${process.env.NEXT_PUBLIC_COMPANY_NAME}.
        </h1>

        <p
          style="
            color:rgba(255,255,255,.85);
            font-size:16px;
            line-height:28px;
            margin-top:15px;
          "
        >
          A new user has signed up on ${process.env.NEXT_PUBLIC_COMPANY_NAME}.
        </p>


          </td>
        </tr>

        <!-- ========================= -->

        <!-- WELCOME CARD -->

        <!-- ========================= -->

        <tr>
          <td style="padding:0 30px;">


        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            margin-top:-30px;
            background:#ffffff;
            border-radius:20px;
            box-shadow:0 10px 30px rgba(5,0,255,.08);
          "
        >

          <tr>
            <td
              align="center"
              style="
                padding:40px 30px;
              "
            >

              <p
                style="
                  color:#6b7280;
                  margin:0;
                  font-size:14px;
                  text-transform:uppercase;
                  letter-spacing:1px;
                  font-weight:600;
                "
              >
                Account Created
              </p>

              <h2
                style="
                  color:#111827;
                  font-size:28px;
                  margin:15px 0;
                "
              >
                You're Ready to Get Started
              </h2>

              <p
                style="
                  color:#6b7280;
                  font-size:15px;
                  line-height:26px;
                  margin:0;
                "
              >
                Created on ${new Date().toLocaleString()}
              </p>

            </td>
          </tr>

        </table>


          </td>
        </tr>

        <!-- ========================= -->

        <!-- MESSAGE -->

        <!-- ========================= -->

        <tr>
          <td
            style="
              padding:40px;
            "
          >


        <p
          style="
            color:#111827;
            font-size:18px;
            margin-top:0;
          "
        >
          Admin, ${admin.fullname},
        </p>

        <p
          style="
            color:#6b7280;
            font-size:16px;
            line-height:30px;
          "
        >
          You have a new user signup on ${process.env.NEXT_PUBLIC_COMPANY_NAME}.
        </p>

        <p
          style="
            color:#6b7280;
            font-size:16px;
            line-height:30px;
          "
        >
          A new user has signed up on ${process.env.NEXT_PUBLIC_COMPANY_NAME}.
        </p> 
        </p>


          </td>
        </tr>

        <!-- ========================= -->

        <!-- ACCOUNT DETAILS -->

        <!-- ========================= -->

        <tr>
          <td style="padding:0 40px 40px;">


        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            background:#f8fafc;
            border:1px solid #e5e7eb;
            border-radius:12px;
          "
        >

          <tr>
            <td
              style="
                padding:20px;
                color:#111827;
                font-weight:600;
              "
            >
              Account Information
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:0 20px 20px;
                color:#6b7280;
                line-height:28px;
              "
            >
              <strong>Name:</strong> ${newUser.fullname}
              <br>
              <strong>Email:</strong> ${newUser.email}
              <br>
              <strong>Registration Date:</strong> ${new Date().toLocaleString()}
            </td>
          </tr>

        </table>


          </td>
        </tr>

        <!-- ========================= -->

        <!-- CTA BUTTON -->

        <!-- ========================= -->

        <tr>
          <td align="center" style="padding:0 40px 50px;">


        <a
          href="${process.env.NEXT_PUBLIC_BASE_URL}/admin-panel"
          style="
            background:#e30613;
            color:#ffffff;
            text-decoration:none;
            padding:16px 36px;
            border-radius:12px;
            display:inline-block;
            font-weight:600;
            font-size:15px;
          "
        >
          Access Your Admin Panel →
        </a>


          </td>
        </tr>

        <!-- ========================= -->

        <!-- FOOTER -->

        <!-- ========================= -->

        <tr>
          <td
            align="center"
            style="
              background:#f8fafc;
              padding:35px;
              border-top:1px solid #e5e7eb;
            "
          >


        <p
          style="
            margin:0 0 10px;
            color:#111827;
            font-weight:600;
          "
        >
          Need Help?
        </p>

        <p style="margin:0 0 10px;">
          <a
            href="mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}"
            style="
              color:#e30613;
              text-decoration:none;
            "
          >
            ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
          </a>
        </p>

        <p style="margin:0 0 20px;">
          <a
            href="${process.env.NEXT_PUBLIC_BASE_URL}"
            style="
              color:#e30613;
              text-decoration:none;
            "
          >
            ${process.env.NEXT_PUBLIC_BASE_URL}
          </a>
        </p>

        <p
          style="
            color:#9ca3af;
            font-size:13px;
            line-height:22px;
          "
        >
          © ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_COMPANY_NAME}. All rights reserved.
          <br>
          Secure Crypto Investment Platform
          <br><br>
          This is an automated security email.
          Please do not reply directly to this message.
        </p>


          </td>
        </tr>


              </table>

            </td>
          </tr>
        </table>
                    
                      `,
      };

      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
    }

    // Generate JWT token
    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expiry
    });

    // Set cookies in the browser
    const cookieStore = await cookies();
    cookieStore.set("jwt", accessToken, { path: "/" });

    // Remove password from the returned user data
    const { password: userPassword, ...otherFields } = newUser.toObject();

    // Send success response with token and user info

    return new NextResponse(
      JSON.stringify({
        message: "User created successfully",
        token: accessToken,
        user: newUser.getAccountInfo(),
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": `jwt=${accessToken}`,
          Authorization: accessToken,
        },
      },
    );
  } catch (error) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
    });
  }
};

/*
|--------------------------------------------------------------------------
| WELCOME EMAIL TEMPLATE
|--------------------------------------------------------------------------
*/

function createWelcomeEmail({ fullname, email, password }) {
  return `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>
  Welcome to Ziraat Bank
</title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f6f7;
    font-family:Arial,Helvetica,sans-serif;
    color:#1f2937;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#f5f6f7;
    padding:35px 15px;
  "
>

<tr>

<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:650px;
    background:#ffffff;
    border-radius:20px;
    overflow:hidden;
    border:1px solid #e5e7eb;
  "
>

<!-- HEADER -->

<tr>

<td
  style="
    background:#ffffff;
    padding:25px 30px;
    border-bottom:1px solid #eeeeee;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td>

<table
  cellpadding="0"
  cellspacing="0"
>

<tr>

<img
  src="https://jervd7yzld.ufs.sh/f/tLWByCb5iMVad6dYxx0e6AUlh7gFxnTDVioNqzb58fWsPSY9"
  alt="Ziraat Bank Logo"
  width="100"
  style="
    display:block;
    margin-bottom:20px;
  "
>

</tr>

</table>

</td>

<td
  align="right"
  style="
    font-size:12px;
    color:#9ca3af;
  "
>
  Online Banking
</td>

</tr>

</table>

</td>

</tr>


<!-- RED HERO -->

<tr>

<td
  style="
    background:#e30613;
    padding:38px 30px;
    color:#ffffff;
  "
>

<div
  style="
    font-size:12px;
    font-weight:bold;
    letter-spacing:1px;
    text-transform:uppercase;
    color:#ffd9dc;
    margin-bottom:10px;
  "
>
  Welcome to Ziraat Bank
</div>

<h1
  style="
    margin:0;
    font-size:30px;
    line-height:1.25;
    color:#ffffff;
  "
>
  Welcome, ${escapeHtml(fullname)}!
</h1>

<p
  style="
    margin:14px 0 0;
    font-size:14px;
    line-height:1.7;
    color:#ffecef;
  "
>
  Your Ziraat Bank online banking account
  has been successfully created.
</p>

</td>

</tr>


<!-- CONTENT -->

<tr>

<td
  style="
    padding:32px 30px;
  "
>

<p
  style="
    margin:0 0 18px;
    font-size:14px;
    line-height:1.7;
    color:#4b5563;
  "
>

Dear ${escapeHtml(fullname)},

<br><br>

We are pleased to welcome you to Ziraat Bank.
You can now access your online banking account
using the login credentials below.

</p>


<!-- LOGIN BOX -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#f9fafb;
    border:1px solid #e5e7eb;
    border-radius:15px;
  "
>

<tr>

<td
  style="
    padding:22px;
  "
>

<div
  style="
    font-size:12px;
    font-weight:bold;
    color:#6b7280;
    margin-bottom:15px;
  "
>
  YOUR ONLINE BANKING LOGIN
</div>


<!-- EMAIL -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="margin-bottom:12px;"
>

<tr>

<td
  style="
    font-size:11px;
    color:#9ca3af;
    padding-bottom:4px;
  "
>
  EMAIL ADDRESS
</td>

</tr>

<tr>

<td
  style="
    font-size:14px;
    font-weight:bold;
    color:#111827;
    word-break:break-all;
  "
>
  ${escapeHtml(email)}
</td>

</tr>

</table>


<!-- PASSWORD -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td
  style="
    font-size:11px;
    color:#9ca3af;
    padding-bottom:4px;
  "
>
  PASSWORD
</td>

</tr>

<tr>

<td
  style="
    font-size:14px;
    font-weight:bold;
    color:#111827;
  "
>
  ${escapeHtml(password)}
</td>

</tr>

</table>

</td>

</tr>

</table>


<!-- BUTTON -->

<table
  cellpadding="0"
  cellspacing="0"
  style="margin:25px 0;"
>

<tr>

<td
  style="
    background:#e30613;
    border-radius:8px;
  "
>

<a
  href="${getDashboardUrl()}"
  style="
    display:inline-block;
    padding:13px 25px;
    color:#ffffff;
    text-decoration:none;
    font-size:12px;
    font-weight:bold;
  "
>
  Access Online Banking
</a>

</td>

</tr>

</table>


<!-- SECURITY NOTICE -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#fff7f7;
    border:1px solid #ffd7da;
    border-radius:12px;
  "
>

<tr>

<td
  style="
    padding:17px;
  "
>

<div
  style="
    font-size:12px;
    font-weight:bold;
    color:#b91c1c;
    margin-bottom:7px;
  "
>
  Security Reminder
</div>

<div
  style="
    font-size:11px;
    line-height:1.7;
    color:#6b7280;
  "
>
  For your security, please change your 
  password immediately after your
  first login. Never share your password,
  verification codes or banking credentials
  with anyone.
</div>

</td>

</tr>

</table>

</td>

</tr>


<!-- FOOTER -->

<tr>

<td
  style="
    background:#111827;
    padding:25px 30px;
    color:#ffffff;
  "
>

<div
  style="
    font-size:13px;
    font-weight:bold;
    margin-bottom:8px;
  "
>
  Ziraat Bank
</div>

<div
  style="
    font-size:10px;
    line-height:1.7;
    color:#9ca3af;
  "
>
  Secure digital banking for your everyday
  financial needs.
</div>

<div
  style="
    margin-top:18px;
    padding-top:15px;
    border-top:1px solid #374151;
    font-size:9px;
    line-height:1.6;
    color:#6b7280;
  "
>
  This is an automated message. Please do
  not reply directly to this email.
</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
}

/*
|--------------------------------------------------------------------------
| ACCOUNT OPENING FORM EMAIL
|--------------------------------------------------------------------------
*/

function createFormEmail({ fullname }) {
  return `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>
  Account Opening Form
</title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f6f7;
    font-family:Arial,Helvetica,sans-serif;
    color:#1f2937;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#f5f6f7;
    padding:35px 15px;
  "
>

<tr>

<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    max-width:600px;
    background:#ffffff;
    border-radius:20px;
    overflow:hidden;
    border:1px solid #e5e7eb;
  "
>

<!-- HEADER -->

<tr>

<td
  style="
    background:#eee;
    padding:28px 30px;
    color:#ffffff;
  "
>

<table
  cellpadding="0"
  cellspacing="0"
>

<tr>

<img
  src="https://jervd7yzld.ufs.sh/f/tLWByCb5iMVad6dYxx0e6AUlh7gFxnTDVioNqzb58fWsPSY9"
  alt="Ziraat Bank Logo"
  width="100"
  style="
    display:block;
    margin-bottom:20px;
  "
>

</tr>

</table>

</td>

</tr>


<!-- BODY -->

<tr>

<td
  style="
    padding:35px 30px;
  "
>

<div
  style="
    display:inline-block;
    background:#fff1f2;
    color:#e30613;
    padding:7px 10px;
    border-radius:20px;
    font-size:9px;
    font-weight:bold;
    text-transform:uppercase;
    letter-spacing:.5px;
  "
>
  Account Documentation
</div>

<h1
  style="
    margin:18px 0 10px;
    font-size:25px;
    color:#111827;
  "
>
  Account Opening Form
</h1>

<p
  style="
    margin:0;
    font-size:13px;
    line-height:1.7;
    color:#6b7280;
  "
>

Hello ${escapeHtml(fullname)},

<br><br>

Please find your Ziraat Bank account opening
form attached to this email as a PDF document.

</p>


<!-- ATTACHMENT CARD -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    margin-top:25px;
    background:#f9fafb;
    border:1px solid #e5e7eb;
    border-radius:15px;
  "
>

<tr>

<td
  style="
    padding:20px;
  "
>

<table
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td
  style="
    width:42px;
    height:42px;
    background:#fee2e2;
    border-radius:10px;
    text-align:center;
    vertical-align:middle;
    color:#e30613;
    font-weight:bold;
    font-size:12px;
  "
>
  PDF
</td>

<td
  style="
    padding-left:12px;
  "
>

<div
  style="
    font-size:12px;
    font-weight:bold;
    color:#374151;
  "
>
  Ziraat Bank-Account-Opening-Form.pdf
</div>

<div
  style="
    margin-top:4px;
    font-size:9px;
    color:#9ca3af;
  "
>
  PDF Document • Attached to this email
</div>

</td>

</tr>

</table>

</td>

</tr>

</table>


<p
  style="
    margin:25px 0 0;
    font-size:11px;
    line-height:1.7;
    color:#9ca3af;
  "
>
  Please complete the form carefully and
  follow the instructions provided by the bank.
</p>

</td>

</tr>


<!-- FOOTER -->

<tr>

<td
  style="
    background:#111827;
    padding:25px 30px;
  "
>

<div
  style="
    font-size:12px;
    font-weight:bold;
    color:#ffffff;
  "
>
  Ziraat Bank
</div>

<div
  style="
    margin-top:7px;
    font-size:9px;
    line-height:1.6;
    color:#9ca3af;
  "
>
  Secure digital banking.
</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
}

/*
|--------------------------------------------------------------------------
| BASIC HTML ESCAPE
|--------------------------------------------------------------------------
*/

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/*
|--------------------------------------------------------------------------
| DASHBOARD URL
|--------------------------------------------------------------------------
*/

function getDashboardUrl() {
  return (
    (process.env.NEXT_PUBLIC_BASE_URL || "https://ziraati-bank.vercel.app/") + "dashboard"
  );
}
