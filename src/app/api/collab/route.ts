import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      name,
      brand,
      email,
      collabType,
      budget,
      currency,
      projectDetails
    } = data;

    // Create a transporter using Brevo SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build the email content
    let budgetInfo = '';
    if (collabType === 'paid') {
      budgetInfo = `Estimated Budget: ${currency} ${budget}`;
    } else {
      budgetInfo = `Product / Service Offered: ${budget}`;
    }

    const mailOptions = {
      from: `"${name} (via Website)" <shubhankarsahu82@gmail.com>`, // Must be your verified Brevo sender email
      replyTo: email,
      to: 'shubhankarsahu82@gmail.com', // Recipient address
      subject: `New Collaboration Request: ${brand} - ${collabType === 'paid' ? 'Paid Collab' : 'Barter Collab'}`,
      text: `
        New Collaboration Request!
        
        Name: ${name}
        Brand / Company: ${brand}
        Email: ${email}
        Collaboration Type: ${collabType}
        ${budgetInfo}
        
        Project Details:
        ${projectDetails}
      `,
      html: `
        <h2>New Collaboration Request!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Brand / Company:</strong> ${brand}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Collaboration Type:</strong> ${collabType}</p>
        <p><strong>${collabType === 'paid' ? 'Estimated Budget' : 'Product / Service Offered'}:</strong> ${collabType === 'paid' ? `${currency} ${budget}` : budget}</p>
        <br/>
        <h3>Project Details:</h3>
        <p>${projectDetails.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
