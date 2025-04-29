"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VoiceRecorderSection from "../components/recorder";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

export default function ContactTabs() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "voice">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    console.log("Form data:", formData);
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill all the fields before submitting.",
      });
      setIsSending(false);
      return;
    }
    if (!formData.email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      setIsSending(false);
      return;
    }
    if (formData.message.length < 10) {
      toast({
        variant: "destructive",
        title: "Message Too Short",
        description: "Your message must be at least 10 characters long.",
      });
      setIsSending(false);
      return;
    }
    if (formData.subject.length < 5) {
      toast({
        variant: "destructive",
        title: "Subject Too Short",
        description: "Your subject must be at least 5 characters long.",
      });
      setIsSending(false);
      return;
    }
    if (formData.name.length < 3) {
      toast({
        variant: "destructive",
        title: "Name Too Short",
        description: "Your name must be at least 3 characters long.",
      });
      setIsSending(false);
      return;
    }
    if (formData.message.length > 500) {
      toast({
        variant: "destructive",
        title: "Message Too Long",
        description: "Your message cannot exceed 500 characters.",
      });
      setIsSending(false);
      return;
    }
    if (formData.subject.length > 100) {
      toast({
        variant: "destructive",
        title: "Subject Too Long",
        description: "Your subject cannot exceed 100 characters.",
      });
      setIsSending(false);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/sendMsg", formData);
      setFormData({ name: "", email: "", message: "", subject: "" });
      toast({
        title: "Message Sent",
        description: response.data.message || "We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please try again later.",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-full space-y-4">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "form" | "voice")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-12 bg-background">
          <TabsTrigger 
            value="form" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Text Form
          </TabsTrigger>
          <TabsTrigger 
            value="voice" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Voice Message
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                required
                className="bg-background"
              />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                required
                className="bg-background"
              />
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject"
                required
                className="bg-background"
              />
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                rows={4}
                required
                className="bg-background resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSending}
              aria-label="Send Message"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="voice" className="mt-6">
          <div className="rounded-xl border bg-background p-6">
            <VoiceRecorderSection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}