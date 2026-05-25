import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle, AlertTriangle, Shield, Mail, Phone, MapPin, Terminal, Activity } from "lucide-react";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export const Contact = () => {
  const visitorId = useVisitorTracking();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const validate = () => {
    const newErrors = {
      name: name.trim().length < 2 ? 'Name must be at least 2 characters' : '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please enter a valid email address' : '',
      subject: subject.trim().length < 5 ? 'Subject must be at least 5 characters' : '',
      message: message.trim().length < 10 ? 'Message must be at least 10 characters' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(err => err !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const visitorIdToSend = visitorId || null;

    try {
      // 1. Direct database insert into 'messages' table
      const { data, error: insertError } = await supabase
        .from('messages')
        .insert([
          {
            name,
            email,
            phone: phone || null,
            subject,
            message,
            visitor_id: visitorIdToSend
          }
        ])
        .select('id')
        .single();

      if (insertError) {
        console.error('Database Insert Error:', insertError);
        throw new Error(insertError.message || "Database insert failed");
      }

      // 2. Invoke notification edge function
      const message_id = data.id;
      const { error: notificationError } = await supabase.functions.invoke('send-notifications', {
        body: { message_id },
      });

      if (notificationError) {
        console.warn('Notification notificationError:', notificationError);
        toast.warning("Message logged in DB, but notifications are queued. I will see it!");
      } else {
        toast.success("Connection transaction committed successfully!");
      }

      setIsSubmitted(true);
      
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (err: any) {
      console.error("Connection transaction aborted:", err);
      
      // Standalone fallback: Try using secure insert RPC if direct insert fails
      try {
        console.log("Attempting fallback RPC insertion...");
        const { data: rpcData, error: rpcError } = await supabase.rpc('secure_insert_message_v2', {
          p_name: name,
          p_email: email,
          p_subject: subject,
          p_message: message,
          p_phone: phone || null,
          p_visitor_id: visitorIdToSend
        });

        if (rpcError) throw rpcError;
        
        if (typeof rpcData === 'string' && rpcData.startsWith('Error:')) {
          throw new Error(rpcData.replace('Error: ', ''));
        }
        
        toast.success("Connection transaction completed via fallback routing!");
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        
        setTimeout(() => setIsSubmitted(false), 5000);
      } catch (fallbackErr: any) {
        console.error("All messaging protocols failed:", fallbackErr);
        toast.error(fallbackErr.message || "Messaging service offline. Please try LinkedIn connection!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-6 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white">
            Establish Connection
          </h2>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            Submit a message directly to Ajay's Supabase instance to initiate collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Metadata & Quick Info Card (5/12 Width) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <Card className="bg-slate-950/65 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl relative overflow-hidden group flex-1 text-left flex flex-col justify-between">
              {/* Purple corner glow */}
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-900 pb-3">
                  <Terminal size={12} className="text-cyan-400 animate-pulse" />
                  Routing Terminal Metrics
                </h3>

                <div className="space-y-4 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <Mail className="text-cyan-400 flex-shrink-0" size={16} />
                    <div>
                      <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Email Direct</span>
                      <span className="text-white hover:text-cyan-300 transition-colors font-medium">ajay.bervanshi@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="text-purple-400 flex-shrink-0" size={16} />
                    <div>
                      <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Mobile Link</span>
                      <span className="text-white font-medium">+91 76200 85260</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="text-emerald-400 flex-shrink-0" size={16} />
                    <div>
                      <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Operations Hub</span>
                      <span className="text-white font-medium">Nagpur / Pune, India</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 mt-6 space-y-3 font-mono text-[10px]">
                <div className="flex justify-between items-center text-slate-500">
                  <span>SSL HANDSHAKE</span>
                  <span className="text-emerald-400 font-bold">SECURED</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>CATALOG TARGET</span>
                  <span className="text-cyan-400 font-bold">SUPABASE.MESSAGES</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>DR ESCAPE ROUTING</span>
                  <span className="text-purple-400 font-bold">RPC_v2 ACTIVE</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Glowing Contact Form Panel (7/12 Width) */}
          <div className="md:col-span-7 w-full">
            <Card className="bg-slate-950/65 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group w-full text-left">
              {/* Cyan corner glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Commander Name *</Label>
                    <Input
                      placeholder="e.g. Elon Musk"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`bg-slate-900 border ${
                        errors.name ? 'border-rose-500/50' : 'border-slate-800'
                      } hover:border-cyan-500/40 focus:border-cyan-400 text-xs font-mono rounded-xl h-10 text-white placeholder-slate-700`}
                    />
                    {errors.name && <span className="text-[9px] font-mono text-rose-400 block">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Email Binding *</Label>
                    <Input
                      type="email"
                      placeholder="e.g. elon@spacex.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`bg-slate-900 border ${
                        errors.email ? 'border-rose-500/50' : 'border-slate-800'
                      } hover:border-cyan-500/40 focus:border-cyan-400 text-xs font-mono rounded-xl h-10 text-white placeholder-slate-700`}
                    />
                    {errors.email && <span className="text-[9px] font-mono text-rose-400 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Phone Connection (Optional)</Label>
                    <Input
                      placeholder="e.g. +91 99999 88888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 focus:border-cyan-400 text-xs font-mono rounded-xl h-10 text-white placeholder-slate-700"
                    />
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Access Subject *</Label>
                    <Input
                      placeholder="e.g. Production Oracle to MS SQL Migration"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`bg-slate-900 border ${
                        errors.subject ? 'border-rose-500/50' : 'border-slate-800'
                      } hover:border-cyan-500/40 focus:border-cyan-400 text-xs font-mono rounded-xl h-10 text-white placeholder-slate-700`}
                    />
                    {errors.subject && <span className="text-[9px] font-mono text-rose-400 block">{errors.subject}</span>}
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Payload Message *</Label>
                  <Textarea
                    placeholder="Describe transaction specifications, project parameters, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`bg-slate-900 border ${
                      errors.message ? 'border-rose-500/50' : 'border-slate-800'
                    } hover:border-cyan-500/40 focus:border-cyan-400 text-xs font-mono rounded-xl h-24 text-white placeholder-slate-700 resize-none leading-relaxed`}
                  />
                  {errors.message && <span className="text-[9px] font-mono text-rose-400 block">{errors.message}</span>}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-mono text-xs uppercase tracking-widest font-black py-4 rounded-xl shadow-lg border border-cyan-400/20 flex items-center justify-center gap-2 h-11"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border border-t-transparent border-white rounded-full animate-spin" />
                        COMMITTING TRANSACTION...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle size={14} className="text-emerald-400" />
                        TRANSACTION COMMITTED
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        EXECUTE COMMIT
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};