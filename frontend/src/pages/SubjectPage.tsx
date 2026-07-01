import React, { useState } from "react";
import {
  Search,
  Calendar,
  Image as ImageIcon,
  Copy,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Note {
  id: string;
  topic: string;
  summary: string;
  createdAt: string;
  imageUrl: string;
}

const mockSubject = {
  title: "Cloud Computing Architectures",
  generatedNotes: 12,
  notes: [
    {
      id: "1",
      topic: "AWS EC2 & Instance Types",
      createdAt: "Jun 15, 2026",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      summary: `
Amazon EC2 provides scalable computing capacity.

Key Points:

• Compute Optimized instances are designed for CPU intensive workloads.

• Memory Optimized instances are designed for applications requiring large memory.

• Auto Scaling Groups help maintain application availability.

• Elastic Load Balancer distributes traffic across multiple instances.

Exam Notes:

1. EC2 = Elastic Compute Cloud
2. Auto Scaling improves fault tolerance
3. ELB prevents single point failure
      `,
    },
    {
      id: "2",
      topic: "Load Balancing",
      createdAt: "Jun 14, 2026",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
      summary: `
Load balancing distributes incoming requests among servers.

Types:

• Layer 4 Load Balancer
• Layer 7 Load Balancer

Advantages:

• Better availability
• High scalability
• Fault tolerance
• Better performance
      `,
    },
  ],
};

export default function SubjectPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredNotes = mockSubject.notes.filter(
    (note) =>
      note.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const copyNote = async (content: string) => {
    await navigator.clipboard.writeText(content);
    toast.success("Notes copied");
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* ================= HEADER ================= */}

        <div className="border-b pb-6 mb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Side */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles size={14} />
                AI Generated Notes
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {mockSubject.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen size={16} />
                {mockSubject.generatedNotes} notes available
              </div>
            </div>

            {/* Right Side */}
            <div className="relative w-full lg:w-[340px]">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="
                  w-full
                  h-11
                  pl-10
                  pr-4
                  rounded-xl
                  border
                  bg-background
                  outline-none
                  transition-all
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            </div>
          </div>
        </div>

        {/* ================= NOTES ================= */}

        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search size={40} className="text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No notes found.</p>
          </div>
        ) : (
          <div>
            {filteredNotes.map((note, index) => (
              <article key={note.id} className="py-8 border-b last:border-b-0">
                {/* ===== TOP SECTION ===== */}

                <div className="flex flex-col gap-5 mb-6">
                  {/* Title + Actions */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-3">
                      {/* Number */}
                      <span className="text-xl md:text-2xl font-bold text-primary shrink-0">
                        {index + 1}.
                      </span>

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-semibold leading-tight">
                        {note.topic}
                      </h2>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyNote(note.summary)}
                      >
                        <Copy size={14} />
                        Copy Notes
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedImage(note.imageUrl)}
                      >
                        <ImageIcon size={14} />
                        View Image
                      </Button>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    {note.createdAt}
                  </div>
                </div>

                {/* ===== NOTE CONTENT ===== */}

                <div
                  className="
                    bg-muted/40
                    border
                    rounded-2xl
                    p-5
                    md:p-7
                    whitespace-pre-wrap
                    leading-8
                    text-sm
                    md:text-base
                  "
                >
                  {note.summary}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ================= IMAGE MODAL ================= */}

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl p-2">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Original Upload"
              className="
                w-full
                rounded-lg
                max-h-[85vh]
                object-contain
              "
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
