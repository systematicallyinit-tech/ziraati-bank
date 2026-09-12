import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import nodemailer from 'nodemailer'


export async function PATCH (req) {
    
    const body = await req.json();

  try {
         connect();

    const user = await User.findById(body._id);
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userId = user._id;

    // Update user
    const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        body,
      },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!updatedUser) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found in database",
          }),
          { status: 404 }
        );
      }

    return new Response(
      JSON.stringify({ message: 'Profile updated successfully!'}),
      { status: 200 }
    );
  } catch (err) {
    console.error('API error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}