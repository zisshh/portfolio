import { NextResponse } from "next/server";
import { Resend } from "resend";
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();
    
    // Validate required fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: email, subject, or message" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [process.env.FROM_EMAIL, email],
      subject: subject,
      react: React.createElement(
        React.Fragment,
        null,
        React.createElement('h1', null, subject),
        React.createElement('p', null, 'Thank you for contacting us!'),
        React.createElement('p', null, 'New message submitted:'),
        React.createElement('p', null, message)
      ),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}