import connect from "@/lib/db";
import FormUpload from "@/lib/models/accountOpeningForm";
import User from "@/lib/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'
import { cookies } from "next/headers";

export const POST = async (req) => {
  await connect();
  try {
    const body = await req.json();
    const admin = await User.findOne({ role: "admin" });

    const { fullName, email, phone, accountOpeningForm } = body;

    // ---------------------------------------------------
    // Validate request
    // ---------------------------------------------------

    if (!fullName || !email || !phone || !accountOpeningForm) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, phone number and account opening form are required.",
        },
        {
          status: 400,
        },
      );
    }

    const newFormUpload = FormUpload(body);
    await newFormUpload.save();

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

    // Send mail with defined transport object
    //await transporter.sendMail(mailOptions);

    // If OTP is valid, proceed TO SIGNUP
    if (admin) {
      let mailOptions = {
        from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
        to: `${admin.email}`,
        subject: `Account Form Upload - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
        text: `You have a new form upload on ${process.env.NEXT_PUBLIC_COMPANY_NAME}.`,
        html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Account Onboarding</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
      ">

        <div style="
          max-width: 650px;
          margin: 30px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        ">

          <!-- Header -->
          <div style="
            background-color: #e30613;
            padding: 24px 30px;
            color: #ffffff;
          ">
            <h1 style="
              margin: 0;
              font-size: 22px;
              font-weight: 600;
            ">
              New Account Form Upload
            </h1>

            <p style="
              margin: 8px 0 0;
              font-size: 14px;
              color: #d1d5db;
            ">
              A new account opening form has been submitted.
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">

            <p style="
              margin: 0 0 24px;
              font-size: 15px;
              line-height: 1.6;
            ">
              Hello Admin,
              <br /><br />
              You have received a new account onboarding submission.
              Below are the details provided by the applicant.
            </p>

            <!-- Applicant Information -->
            <h2 style="
              margin: 0 0 12px;
              font-size: 17px;
              color: #111827;
            ">
              Applicant Information
            </h2>

            <table style="
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 28px;
            ">

              <tr>
                <td style="
                  padding: 12px;
                  background-color: #f9fafb;
                  border: 1px solid #e5e7eb;
                  font-weight: 600;
                  width: 35%;
                ">
                  Full Name
                </td>

                <td style="
                  padding: 12px;
                  border: 1px solid #e5e7eb;
                ">
                  ${fullName}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px;
                  background-color: #f9fafb;
                  border: 1px solid #e5e7eb;
                  font-weight: 600;
                ">
                  Email
                </td>

                <td style="
                  padding: 12px;
                  border: 1px solid #e5e7eb;
                ">
                  <a
                    href="mailto:${email}"
                    style="color: #e30613; text-decoration: none;"
                  >
                    ${email}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px;
                  background-color: #f9fafb;
                  border: 1px solid #e5e7eb;
                  font-weight: 600;
                ">
                  Phone
                </td>

                <td style="
                  padding: 12px;
                  border: 1px solid #e5e7eb;
                ">
                  ${phone}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px;
                  background-color: #f9fafb;
                  border: 1px solid #e5e7eb;
                  font-weight: 600;
                ">
                  Submitted
                </td>

                <td style="
                  padding: 12px;
                  border: 1px solid #e5e7eb;
                ">
                  ${formatter.format(now)}
                </td>
              </tr>

            </table>

            <!-- Uploaded Document -->
            <h2 style="
              margin: 0 0 12px;
              font-size: 17px;
              color: #111827;
            ">
              Uploaded Document
            </h2>

            <div style="
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 18px;
              background-color: #f9fafb;
              margin-bottom: 28px;
            ">

              <p style="
                margin: 0 0 8px;
                font-size: 14px;
              ">
                <strong>File:</strong>
                ${accountOpeningForm.name}
              </p>

              <p style="
                margin: 0 0 8px;
                font-size: 14px;
              ">
                <strong>Size:</strong>
                ${(accountOpeningForm.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

            <!-- View Document Button -->
            <div style="
              text-align: center;
              margin-bottom: 30px;
            ">

              <a
                href="${accountOpeningForm.url}"
                target="_blank"
                style="
                  display: inline-block;
                  padding: 13px 24px;
                  background-color: #e30613;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 6px;
                  font-size: 14px;
                  font-weight: 600;
                "
              >
                View Uploaded Document
              </a>

            </div>

            <p style="
              margin: 0;
              font-size: 13px;
              line-height: 1.6;
              color: #6b7280;
            ">
              Please review the submitted information and uploaded document
              before proceeding with the applicant's account onboarding.
            </p>

          </div>

          <!-- Footer -->
          <div style="
            padding: 20px 30px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          ">

            <p style="
              margin: 0;
              font-size: 12px;
              color: #9ca3af;
            ">
              This notification was automatically generated by
              ${process.env.NEXT_PUBLIC_COMPANY_NAME}.
            </p>

          </div>

        </div>

      </body>
    </html>
  `,
      };

      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
    }

    return new NextResponse(
      JSON.stringify({
        message: "Successfully uploaded form",
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse("Error in uploading form " + error.message, {
      status: 500,
    });
  }
};
