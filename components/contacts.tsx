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
    try {
      const response = await axios.post("http://localhost:5000/sendMsg", formData);
      setFormData({ name: "", email: "", message: "", subject: "" });
      if (response.status === 200) {
        toast({
          title: "Message Sent",
          description: response.data.message || "We'll get back to you soon.",
        });
      }
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
    <div className="w-full max-w-md space-y-6">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "form" | "voice")}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="form" 
            className="data-[state=active]:bg-muted"
          >
            Text Form
          </TabsTrigger>
          <TabsTrigger 
            value="voice" 
            className="data-[state=active]:bg-muted"
          >
            Voice Message
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                required
                className="focus-visible:ring-1"
              />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                required
                className="focus-visible:ring-1"
              />
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject"
                required
                className="focus-visible:ring-1"
              />
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                rows={4}
                required
                className="resize-none focus-visible:ring-1"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="voice">
          <div className="rounded-lg border bg-muted/50 p-6">
            <VoiceRecorderSection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}