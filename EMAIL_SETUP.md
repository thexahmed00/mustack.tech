# Email Setup Guide for Contact Form

This guide will help you set up the email functionality for the contact form in the Mustack.ai website.

## Overview

The contact form uses EmailJS to send emails directly from the client-side without needing a backend server. This is secure, reliable, and easy to set up.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

```html
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} ({{from_email}})
Company: {{company}}

Message:
{{message}}

---
This message was sent from the Mustack.ai contact form.
Reply directly to this email to respond to the sender.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section
3. Copy this key

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```

## Step 6: Test the Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section on your website
3. Fill out and submit the form
4. Check your email inbox for the test message

## Features Implemented

✅ **Dark Theme**: Form matches the black background with white text
✅ **Email Integration**: Uses EmailJS for reliable email delivery
✅ **Form Validation**: Client-side validation for required fields
✅ **Loading States**: Visual feedback during form submission
✅ **Success/Error Messages**: User feedback after form submission
✅ **Responsive Design**: Works across all device sizes
✅ **Security**: No sensitive credentials exposed to client

## Troubleshooting

### Form not sending emails
- Check that all environment variables are set correctly
- Verify your EmailJS service is active
- Check browser console for error messages

### Styling issues
- The form automatically adapts to dark/light themes
- All styling is consistent with the site's design system

### Performance
- EmailJS is optimized for fast delivery
- Form includes loading states to prevent multiple submissions

## Security Notes

- EmailJS public keys are safe to expose in client-side code
- No server-side code required
- All email sending happens through EmailJS's secure servers
- Rate limiting is handled automatically by EmailJS

## Support

If you encounter any issues:
1. Check the EmailJS documentation
2. Verify your environment variables
3. Test with a simple form first
4. Check browser developer tools for errors

The contact form is now fully functional with professional email integration!
