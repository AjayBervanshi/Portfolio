import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useState } from "react";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileCard } from "./ProfileCard";

// Validation Utility Functions
const validateName = (name: string) => {
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 100;
};
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};
const validateSubject = (subject: string) => {
  const trimmedSubject = subject.trim();
  return trimmedSubject.length >= 5 && trimmedSubject.length <= 200;
};
const validateMessage = (message: string) => {
  const trimmedMessage = message.trim();
  return trimmedMessage.length >= 10 && trimmedMessage.length <= 5000;
};

const validatePhone = (phone: string) => {
  const trimmedPhone = phone.trim();
  return trimmedPhone.length === 0 || trimmedPhone.length <= 20; // Allow empty or up to 20 chars
};

export const Contact = () => {
  const visitorId = useVisitorTracking();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Added phone state
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // New state for inline validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation on field blur
  const handleBlur = (field: string) => {
    switch(field) {
      case 'name':
        setErrors(prev => ({
          ...prev,
          name: validateName(name) ? '' : 'Name must be between 2 and 100 characters'
        }));
        break;
      case 'email':
        setErrors(prev => ({
          ...prev,
          email: validateEmail(email) ? '' : 'Please enter a valid email address'
        }));
        break;
      case 'subject':
        setErrors(prev => ({
          ...prev,
          subject: validateSubject(subject) ? '' : 'Subject must be between 5 and 200 characters'
        }));
        break;
      case 'message':
        setErrors(prev => ({
          ...prev,
          message: validateMessage(message) ? '' : 'Message must be between 10 and 5000 characters'
        }));
        break;
      case 'phone':
        setErrors(prev => ({
          ...prev,
          phone: validatePhone(phone) ? '' : 'Phone number too long'
        }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform full validation before submission
    const validationErrors = {
      name: !validateName(name) ? 'Name must be between 2 and 100 characters' : '',
      email: !validateEmail(email) ? 'Please enter a valid email address' : '',
      subject: !validateSubject(subject) ? 'Subject must be between 5 and 200 characters' : '',
      message: !validateMessage(message) ? 'Message must be between 10 and 5000 characters' : '',
      phone: !validatePhone(phone) ? 'Phone number too long' : ''
    };
    setErrors(validationErrors);

    // Check if any errors exist
    if (Object.values(validationErrors).some(error => error !== '')) {
      return; // Prevent submission
    }

    setIsSubmitting(true);

    try {
      console.log('Original visitorId:', visitorId);
      const visitorIdToSend = visitorId === '' || visitorId === undefined ? null : visitorId;
      console.log('Processed visitorId:', visitorIdToSend);
      console.log('visitorId type:', typeof visitorIdToSend);
      const { data: messageData, error: insertError } = await supabase.rpc('secure_insert_message_v2', {
        p_name: name,
        p_email: email,
        p_subject: subject,
        p_message: message,
        p_phone: phone,
        p_visitor_id: visitorIdToSend
      });
      console.log('RPC Response:', { messageData, insertError });

      // Prioritize specific error message from RPC if available
      if (typeof messageData === 'string' && messageData.startsWith('Error:')) {
        toast.error(messageData.replace('Error: ', '')); // Display the specific error message
        throw new Error(messageData); // Re-throw to stop further processing
      }

      // If insertError exists AND messageData is NOT a specific error, then it's a generic RPC/network error
      if (insertError) {
        console.error('Insert Error Details:', insertError);
        // Check if insertError has a specific message we can use, otherwise use generic
        const errorMessage = insertError.message || "Failed to save message.";
        toast.error(errorMessage); // Display the error from insertError or generic
        throw new Error(errorMessage); // Re-throw
      }

      const message_id = messageData;

      // 2. Trigger the notification edge function
      const { error: notificationError } = await supabase.functions.invoke('send-notifications', {
        body: { message_id },
      });

      if (notificationError) {
        console.error('Notification error:', notificationError);
        // Even if notifications fail, the message is saved.
        toast.warning("Message sent, but couldn't send a confirmation. I'll get back to you.");
      } else {
        toast.success("Message sent successfully! You'll receive a confirmation, and I'll get back to you soon.");
      }

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setErrors({ name: '', email: '', subject: '', message: '', phone: '' });

    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message. Please try again or contact me directly at ajay.bervanshi@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Profile Card */}
          <div>
            <ProfileCard />
          </div>

          {/* Contact Form */} 
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Send a Message</CardTitle>
              <p className="text-slate-300 text-sm">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur('name')}
                      className={`bg-slate-700 border-slate-600 text-white focus:border-cyan-400 mt-1 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your full name"
                      required
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`bg-slate-700 border-slate-600 text-white focus:border-cyan-400 mt-1 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                      required
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`bg-slate-700 border-slate-600 text-white focus:border-cyan-400 mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-slate-300">Subject *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onBlur={() => handleBlur('subject')}
                    className={`bg-slate-700 border-slate-600 text-white focus:border-cyan-400 mt-1 ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                    {errors.subject && <span className="text-red-500 text-xs mt-1">{errors.subject}</span>}
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-slate-300">Message *</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => handleBlur('message')}
                    rows={6}
                    className={`bg-slate-700 border-slate-600 text-white focus:border-cyan-400 resize-none mt-1 ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell me more about your project or inquiry..."
                    required
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    {errors.message && <span className="text-red-500">{errors.message}</span>}
                    <span>{message.length}/5000 characters</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2" size={18} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                <p className="text-xs text-slate-400 text-center">
                  Your message will be sent via email and SMS notifications
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};