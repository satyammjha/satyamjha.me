"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { VoiceRecorderSection } from "../components/recorder";

export function ContactTabs() {
  const [activeTab, setActiveTab] = useState<"form" | "voice">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl border bg-background shadow-lg">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "form" | "voice")}>
        <TabsList className="grid w-full grid-cols-2 rounded-t-lg rounded-b-none h-14">
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
                onChange={(e: { target: { value: any; }; }) => setFormData({...formData, name: e.target.value})}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e: { target: { value: any; }; }) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e: { target: { value: any; }; }) => setFormData({...formData, message: e.target.value})}
                placeholder="Type your message here..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
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