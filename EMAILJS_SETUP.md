# 📧 EmailJS Setup Guide for Portfolio Contact Form

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email address

### 2. Create Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose "Gmail" (or your preferred email provider)
- Connect your Gmail account (ajay.bervanshi@gmail.com)
- Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template structure:

#### Template for You (Ajay):
```html
Subject: Portfolio Contact: {{subject}}

New message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

#### Template for Sender (Confirmation):
```html
Subject: Thank you for contacting me - Ajay Bervanshi

Dear {{from_name}},

Thank you for reaching out to me through my portfolio website. I have received your message and will get back to you within 24-48 hours.

Your Message Details:
Subject: {{subject}}
Message: {{message}}

In the meantime, feel free to:
• Connect with me on LinkedIn: https://www.linkedin.com/in/ajay-bervanshi
• Check out my technical skills and experience on my portfolio

Best regards,
Ajay Bervanshi
MS SQL Server Database Administrator
Wipro Limited

---
This is an automated response from my portfolio contact form.
```

- Save the template and note down the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
- Go to "Account" → "API Keys"
- Copy your **Public Key** (e.g., `user_abc123def456`)

### 5. Update Portfolio Code
- Open `src/components/Contact.tsx`
- Replace these placeholder values:

```typescript
// EmailJS configuration
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";        // Replace with your actual Service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";      // Replace with your actual Template ID
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";        // Replace with your actual Public Key
```

### 6. Test the Form
- Save the file
- Refresh your portfolio
- Fill out the contact form
- Check both emails are sent:
  - You receive the message at ajay.bervanshi@gmail.com
  - Sender receives confirmation at their email

## 🔧 Advanced Configuration

### Custom Email Templates
You can customize the email templates with:
- HTML formatting
- Company branding
- Professional signatures
- Call-to-action buttons

### Rate Limiting
- Free plan: 200 emails/month
- Paid plans: Higher limits available
- Consider upgrading for business use

### Security
- Public key is safe to expose in frontend code
- Service credentials are stored securely on EmailJS servers
- No sensitive information in your portfolio code

## 🚨 Troubleshooting

### Common Issues:
1. **"Service not found"**: Check Service ID is correct
2. **"Template not found"**: Check Template ID is correct
3. **"Authentication failed"**: Verify Public Key
4. **Emails not sending**: Check Gmail connection in EmailJS

### Testing:
- Use EmailJS dashboard to test templates
- Check browser console for error messages
- Verify email service connection

## 💡 Pro Tips

1. **Professional Templates**: Use consistent branding across all emails
2. **Auto-Reply**: Set up professional auto-replies for better user experience
3. **Analytics**: Monitor email delivery rates in EmailJS dashboard
4. **Backup**: Keep a backup of your EmailJS configuration

## 📞 Support

- EmailJS Documentation: [docs.emailjs.com](https://docs.emailjs.com/)
- EmailJS Community: [community.emailjs.com](https://community.emailjs.com/)
- Portfolio Issues: Check browser console and EmailJS dashboard

---

**Your contact form will be fully functional once you complete these steps!** 🎯✨
