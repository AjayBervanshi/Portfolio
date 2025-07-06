
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email (you can integrate with EmailJS, Formspree, or similar service)
    try {
      // Create mailto link as fallback
      const mailtoLink = `mailto:ajay.bervanshi@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      
      // Open mail client
      window.location.href = mailtoLink;
      
      // Show success message
      toast.success("Email client opened! Your message is ready to send.");
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      
    } catch (error) {
      toast.error("Failed to open email client. Please send email manually to ajay.bervanshi@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/ajay-bervanshi", "_blank");
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-cyan-400 mb-4">
                  Let's Connect
                </CardTitle>
                <p className="text-slate-300 leading-relaxed">
                  Interested in discussing database optimization strategies, SQL Server solutions, 
                  or potential collaboration opportunities? I'd love to hear from you!
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 text-slate-300 p-3 bg-slate-700/30 rounded-lg">
                    <MapPin className="text-cyan-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p>Nagpur, Maharashtra, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-slate-300 p-3 bg-slate-700/30 rounded-lg">
                    <Mail className="text-cyan-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <a 
                        href="mailto:ajay.bervanshi@gmail.com" 
                        className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                      >
                        ajay.bervanshi@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-slate-300 p-3 bg-slate-700/30 rounded-lg">
                    <Phone className="text-cyan-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <a 
                        href="tel:+917620085260" 
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        +91 7620 085260
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-slate-300 p-3 bg-slate-700/30 rounded-lg">
                    <Linkedin className="text-cyan-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-white">LinkedIn</p>
                      <button 
                        onClick={handleLinkedInClick}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Connect on LinkedIn
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-3">Professional Services</h4>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Database Performance Optimization</li>
                    <li>• SQL Server Health Assessments</li>
                    <li>• High Availability Implementation</li>
                    <li>• Database Migration Services</li>
                    <li>• Custom Database Solutions</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <p className="text-slate-400 text-sm">
                    © 2024 Ajay Bervanshi. All rights reserved.
                  </p>
                </div>
              </CardContent>
            </Card>
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
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400 mt-1"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400 mt-1"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-slate-300">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400 mt-1"
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-slate-300">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400 resize-none mt-1"
                    placeholder="Tell me more about your project or inquiry..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2" size={18} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                <p className="text-xs text-slate-400 text-center">
                  This will open your email client with the message pre-filled
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
