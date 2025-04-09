// components/skills/skill-modal.tsx
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { categoryColors, skillDescriptions } from "./skills-data";

interface SkillModalProps {
  selectedSkill: string | null;
  activeCategory: string;
  setSelectedSkill: (skill: string | null) => void;
}

export function SkillModal({ selectedSkill, activeCategory, setSelectedSkill }: SkillModalProps) {
  return (
    <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
      <DialogContent className="max-w-md rounded-lg">
        {selectedSkill && (
          <div className="space-y-4">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",

            )}>
              <p className="text-white font-medium text-lg">
                {selectedSkill[0]}
              </p>
            </div>
            <h3 className="text-lg font-semibold">{selectedSkill}</h3>
            <p className="text-sm text-muted-foreground">
              {skillDescriptions[selectedSkill] || "Description coming soon..."}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}