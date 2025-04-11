"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { VoiceRecorderSection } from "../components/recorder";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"

export function ContactTabs() {
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
      setFormData({
        name: "",
        email: "",
        message: "",
        subject: ""
      });
      if (response.status === 200) {
        toast({
          title: "✅ Message Sent!",
          description: `${response.data.message || "We’ll get back to you soon."}`,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "❌ Failed to send",
        description: "Please try again later.",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
    } finally {
      setIsSending(false); // Stop loading
    }
  };


  return (
    <div className="w-[60vw] mx-auto rounded-xl border bg-background shadow-lg">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "form" | "voice")}>
        <TabsList className="grid grid-cols-2 rounded-t-lg rounded-b-none h-14">
          <TabsTrigger
            value="form"
            className="data-[state=active]:bg-muted data-[state=active]:shadow-sm"
          >
            📝 Text Message
          </TabsTrigger>
          <TabsTrigger
            value="voice"
            className="data-[state=active]:bg-muted data-[state=active]:shadow-sm"
          >
            🎤 Voice Message
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                type="text"
                value={formData.subject}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="subject"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message here..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="voice" className="p-6">
          <VoiceRecorderSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}