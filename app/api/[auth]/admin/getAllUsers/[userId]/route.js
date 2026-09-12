import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import nodemailer from 'nodemailer'

// FETCH USERS 
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

  try {
    await connect();

    // Fetch all transactions, newest first
    const users = await User.find({ role: type }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connect();

    const deletedUser = await User.findOneAndDelete(
      { _id: id },
    );


    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in deleting user " + error.message, {
      status: 500,
    });
}}


function money(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function createApprovalEmail({
  user,
  accountNumber,
  initialDeposit,
}) {
  const firstName = "Customer";

  const bankName = "Ziraat Bank";

  return `
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f6f7f9;padding:35px 15px;"
>

<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:620px;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #eeeeee;
  "
>

<!-- HEADER -->

<tr>

<td
  style="
    background:#e30613;
    color:#fff;
    padding:28px 30px;
  "
>

<table width="100%">

<tr>

<td>

<table>

<tr>

<td style="padding-left:12px;">

<div
  style="
    font-size:19px;
    font-weight:800;
    color:#fff;
  "
>
  ${bankName}
</div>

<div
  style="
    font-size:10px;
    color:#000;
    text-transform:uppercase;
    letter-spacing:1.5px;
    margin-top:3px;
  "
>
  Secure Banking
</div>

</td>

</tr>

</table>

</td>

<td
  align="right"
  style="
    font-size:10px;
    color:#000;
  "
>
  <img
  src="https://jervd7yzld.ufs.sh/f/tLWByCb5iMVad6dYxx0e6AUlh7gFxnTDVioNqzb58fWsPSY9"
  alt="Ziraat Bank Logo"
  width="30"
  style="
    display:block;
  "
>
</td>

</tr>

</table>

</td>

</tr>

<!-- HERO -->

<tr>

<td
  style="
    padding:35px 30px 25px;
  "
>

<div
  style="
    display:inline-block;
    background:#ecfdf3;
    color:#15803d;
    border-radius:50px;
    padding:7px 12px;
    font-size:10px;
    font-weight:bold;
  "
>
  ACCOUNT APPROVED
</div>

<h1
  style="
    margin:18px 0 8px;
    font-size:28px;
    line-height:1.2;
    color:#111827;
  "
>
  Your bank account has been approved
</h1>

<p
  style="
    margin:0;
    font-size:14px;
    line-height:1.7;
    color:#6b7280;
  "
>
  Dear valued ${firstName}, your bank account application
  has successfully passed the approval process.
</p>

</td>

</tr>

<!-- ACCOUNT CARD -->

<tr>

<td style="padding:0 30px 25px;">

<table
  width="100%"
  style="
    background:#f9fafb;
    border:1px solid #eeeeee;
    border-radius:14px;
  "
>

<tr>

<td style="padding:20px;">

<div
  style="
    font-size:10px;
    color:#9ca3af;
    text-transform:uppercase;
    letter-spacing:1px;
  "
>
  ACCOUNT NUMBER
</div>

<div
  style="
    margin-top:7px;
    font-size:20px;
    font-weight:800;
    letter-spacing:1px;
    color:#111827;
  "
>
  ${accountNumber}
</div>

<div
  style="
    margin-top:16px;
    font-size:10px;
    color:#9ca3af;
  "
>
  ACCOUNT STATUS
</div>

<div
  style="
    margin-top:5px;
    font-size:12px;
    font-weight:bold;
    color:#16a34a;
  "
>
  Approved
</div>

</td>

</tr>

</table>

</td>

</tr>

<!-- DEPOSIT INFORMATION -->

<tr>

<td style="padding:0 30px 25px;">

<table
  width="100%"
  style="
    border:1px solid #fee2e2;
    border-radius:14px;
    background:#fffafa;
  "
>

<tr>

<td style="padding:22px;">

<div
  style="
    font-size:16px;
    font-weight:800;
    color:#111827;
  "
>
  Initial funding requirement
</div>

<p
  style="
    margin:9px 0 0;
    font-size:13px;
    line-height:1.7;
    color:#6b7280;
  "
>
  To complete the account-opening process, an initial
  deposit of <strong>${money(initialDeposit)}</strong>
  is required in accordance with the applicable account
  terms and fee schedule.
</p>

<table
  width="100%"
  style="margin-top:18px;"
>

<tr>

<td
  style="
    padding:12px;
    background:#ffffff;
    border:1px solid #eeeeee;
    border-radius:10px;
  "
>

<div
  style="
    font-size:9px;
    color:#9ca3af;
    text-transform:uppercase;
  "
>
  Initial Deposit
</div>

<div
  style="
    margin-top:4px;
    font-size:17px;
    font-weight:800;
    color:#111827;
  "
>
  ${money(initialDeposit)}
</div>

</td>

</tr>

</table>

<p
  style="
    margin:14px 0 0;
    font-size:11px;
    line-height:1.6;
    color:#6b7280;
  "
>
  Please review your account agreement and the bank's
  current fee schedule for details regarding any ATM-card,
  maintenance, or other applicable charges before making
  a payment.
</p>

</td>

</tr>

</table>

</td>

</tr>

<!-- NEXT STEPS -->

<tr>

<td style="padding:0 30px 30px;">

<h2
  style="
    margin:0 0 12px;
    font-size:16px;
    color:#111827;
  "
>
  Next steps
</h2>

<table width="100%">

<tr>

<td
  style="
    padding:10px 0;
    border-bottom:1px solid #f3f4f6;
  "
>

<table>

<tr>

<td
  style="
    width:28px;
    height:28px;
    background:#fff1f2;
    color:#e30613;
    border-radius:50%;
    text-align:center;
    font-weight:bold;
    font-size:12px;
  "
>
  1
</td>

<td
  style="
    padding-left:10px;
    font-size:12px;
    color:#4b5563;
  "
>
  Review your account approval and account terms.
</td>

</tr>

</table>

</td>

</tr>

<tr>

<td
  style="
    padding:10px 0;
    border-bottom:1px solid #f3f4f6;
  "
>

<table>

<tr>

<td
  style="
    width:28px;
    height:28px;
    background:#fff1f2;
    color:#e30613;
    border-radius:50%;
    text-align:center;
    font-weight:bold;
    font-size:12px;
  "
>
  2
</td>

<td
  style="
    padding-left:10px;
    font-size:12px;
    color:#4b5563;
  "
>
  Complete the initial funding requirement using
  an approved bank payment method.
</td>

</tr>

</table>

</td>

</tr>

<tr>

<td
  style="
    padding:10px 0;
  "
>

<table>

<tr>

<td
  style="
    width:28px;
    height:28px;
    background:#fff1f2;
    color:#e30613;
    border-radius:50%;
    text-align:center;
    font-weight:bold;
    font-size:12px;
  "
>
  3
</td>

<td
  style="
    padding-left:10px;
    font-size:12px;
    color:#4b5563;
  "
>
  Follow the bank's instructions for ATM-card
  issuance and account activation.
</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>

<!-- SECURITY NOTICE -->

<tr>

<td
  style="
    padding:20px 30px;
    background:#f9fafb;
    border-top:1px solid #eeeeee;
  "
>

<p
  style="
    margin:0;
    font-size:10px;
    line-height:1.7;
    color:#9ca3af;
  "
>
  Security notice: ${bankName} will never ask you to send
  your password, PIN, one-time authentication code, or
  other confidential login information by email. Verify
  payment instructions through your official banking
  channel before making any payment.
</p>

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
  align="center"
  style="
    padding:24px 30px;
    background:#ffffff;
  "
>

<div
  style="
    font-size:10px;
    color:#9ca3af;
  "
>
  © ${new Date().getFullYear()} ${bankName}
</div>

<div
  style="
    margin-top:5px;
    font-size:9px;
    color:#c4c7cc;
  "
>
  This is an automated account notification.
  Please do not reply to this email.
</div>

</td>

</tr>

</table>

</td>
</tr>

</table>
`;
}

// APPROVE/UNAPPROVED USER 
export const PATCH = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("userId");
    const body = await req.json();
    const { userID, isVerified } = body;

    

    if (!adminId) {
      return new NextResponse(
        JSON.stringify({
          message: "ID not found",
        }),
        { status: 400 }
      );
    }

    await connect();

    // Find the user by ID
            const admin = await User.findById({ _id: adminId });
        
            if (!admin) {
              return NextResponse.json(
                { message: "You have not registered yet" },
                { status: 404 } // NOT_FOUND
              );
            }
    
            if (admin.role !== "admin") {
              return NextResponse.json(
                { message: "You are not an Admin" },
                { status: 400 } // BAD_REQUEST
              );
            }

    // Update user's transaction status
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { isVerified },
      { new: true }
    );
    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    if (updatedUser.isVerified === true) {
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

        const initialDeposit = 1000;
    
        // Send email notification
        const html =
      createApprovalEmail({
        updatedUser,
        accountNumber:
          updatedUser.accountNumber,
        initialDeposit,
      });

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
     
        // Set up email data
        let mailOptions = {
          from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
          to: `${updatedUser.email}`,
          subject: `Ziraat Bank KYC Approval - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your KYC verification has been successfully Approved. Thank you for using ${process.env.NEXT_PUBLIC_COMPANY_NAME}. ${formatter.format(
            now
          )}`,
          html,
        };
    
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
    }

    return new NextResponse(
      JSON.stringify({
        message: "User account updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in updating user account" + error.message, {
      status: 500,
    });
  }
};

/*
<img
  src="https://jervd7yzld.ufs.sh/f/tLWByCb5iMVad6dYxx0e6AUlh7gFxnTDVioNqzb58fWsPSY9"
  alt="Ziraat Bank Logo"
  width="100"
  style="
    display:block;
    margin-bottom:20px;
  "
>
*/