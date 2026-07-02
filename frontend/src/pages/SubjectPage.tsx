import React, { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  Image as ImageIcon,
  Copy,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useParams } from "react-router-dom";
import removeMarkdown from "remove-markdown"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton import
import { toast } from "sonner";
import { apiFetch } from "@/api/fetchClient.ts";
import NoteContent from "@/components/NoteContent.tsx";

interface Note {
  _id: string;
  userId: string;
  subjectId: {
    _id: string;
    title: string;
  };
  title: string;
  detectedSubject?: string;
  imageUrl: string;
  aiContent?: string;
  editedContent?: string;
  isEdited: boolean;
  status: "queued" | "processing" | "completed" | "failed";
  mimeType: string;
  errorMessage?: string;
  processingStartedAt?: string;
  processingCompletedAt?: string;
  createdAt: string;
}

const mockSubject = {
  title: "Cloud Computing Architectures",
  generatedNotes: 12,
  // ... (keeping your mock notes intact if you still need them elsewhere)
};

export default function SubjectPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const { subjectId } = useParams();

  useEffect(() => {
    fetchNotes();
  }, [subjectId]);

  const fetchNotes = async () => {
    try {
      const res = await apiFetch(`/notes/subject/${subjectId}`);
      setNotes(res.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter(
    (note: Note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.aiContent ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const copyNote = async (content: string) => {
    const plaintText=removeMarkdown(content)
    await navigator.clipboard.writeText(plaintText);
    toast.success("Notes copied");
  };

  // ================= LOADING SKELETON =================
  if (loading) {
    return (
      <div className="h-full overflow-y-auto bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          {/* Header Skeleton */}
          <div className="border-b pb-6 mb-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <Skeleton className="h-6 w-40 rounded-full" />
                <Skeleton className="h-10 w-64 md:w-96" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-11 w-full lg:w-[340px] rounded-xl" />
            </div>
          </div>

          {/* Notes List Skeleton */}
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-8 border-b last:border-b-0">
                <div className="flex flex-col gap-5 mb-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-8 w-8 shrink-0" />
                      <Skeleton className="h-8 w-48 md:w-72" />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Skeleton className="h-9 w-28" />
                      <Skeleton className="h-9 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-48 w-full rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN CONTENT =================
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
                {notes.length > 0
                  ? notes[0].subjectId.title
                  : "Untitled Subject"}
              </h1>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen size={16} />
                {notes.length} notes available
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
              <article key={note._id} className="py-8 border-b last:border-b-0">
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
                        {note.title}
                      </h2>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyNote(note.aiContent ?? "")}
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
                    {new Date(note.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* ===== NOTE CONTENT ===== */}
                <NoteContent content={note.isEdited?note.editedContent ?? "":note.aiContent ?? ""}/>
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
