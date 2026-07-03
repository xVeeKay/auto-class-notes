import React, { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  Image as ImageIcon,
  Copy,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import removeMarkdown from "remove-markdown";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  isDone?: boolean;
}

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
      const mappedNotes = res.data.map((n: Note) => ({
        ...n,
        isDone: n.isDone || false,
      }));
      setNotes(mappedNotes);
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
    const plaintText = removeMarkdown(content);
    await navigator.clipboard.writeText(plaintText);
    toast.success("Notes copied");
  };

  const toggleDone = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n._id === noteId ? { ...n, isDone: !n.isDone } : n)),
    );
    toast.success("Note status updated");
  };

  const deleteNote = (noteId: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setNotes((prev) => prev.filter((n) => n._id !== noteId));
    toast.success("Note deleted");
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
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

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* ================= HEADER ================= */}
        <div className="border-b pb-6 mb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
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
            <div className="relative w-full lg:w-[340px]">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background outline-none transition-all focus:ring-2 focus:ring-primary/20"
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
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
                  {/* Title & Date (Grouped together for mobile logic) */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xl md:text-2xl font-bold shrink-0 ${note.isDone ? "text-muted-foreground/50" : "text-primary"}`}
                      >
                        {index + 1}.
                      </span>
                      <h2
                        className={`text-xl md:text-2xl font-semibold leading-tight ${note.isDone ? "line-through text-muted-foreground" : ""}`}
                      >
                        {note.title}
                      </h2>
                    </div>

                    {/* Date properly aligned under title on mobile */}
                    <div className="flex items-center gap-2 mt-2 ml-7 text-xs font-medium text-muted-foreground">
                      <Calendar size={14} />
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* SHADCN SEGMENTED BUTTON GROUP
                    ✅ ADDED: 'self-start' and 'w-fit' to prevent stretching on mobile
                  */}
                  <div className="inline-flex -space-x-px rounded-md shadow-sm shrink-0 ml-7 lg:ml-0 self-start w-fit mt-2 lg:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-r-none h-9 focus:z-10 px-3 md:px-4"
                      onClick={() => copyNote(note.aiContent ?? "")}
                    >
                      <Copy size={14} className="md:mr-2 shrink-0" />
                      <span className="hidden md:inline">Copy</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none h-9 focus:z-10 px-3 md:px-4"
                      onClick={() => setSelectedImage(note.imageUrl)}
                    >
                      <ImageIcon size={14} className="md:mr-2 shrink-0" />
                      <span className="hidden md:inline">Image</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className={`rounded-none h-9 focus:z-10 px-3 md:px-4 transition-colors ${
                        note.isDone
                          ? "bg-primary/10 text-primary border-primary/30"
                          : ""
                      }`}
                      onClick={() => toggleDone(note._id)}
                    >
                      <CheckCircle2 size={14} className="md:mr-2 shrink-0" />
                      <span className="hidden md:inline">
                        {note.isDone ? "Done" : "Mark Done"}
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-l-none h-9 text-destructive hover:bg-destructive/10 focus:z-10 px-3 md:px-4"
                      onClick={() => deleteNote(note._id)}
                    >
                      <Trash2 size={14} className="md:mr-2 shrink-0" />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                </div>

                {/* ===== NOTE CONTENT ===== */}
                <div
                  className={`transition-opacity duration-300 ${note.isDone ? "opacity-40 pointer-events-none" : ""}`}
                >
                  <NoteContent
                    content={
                      note.isEdited
                        ? (note.editedContent ?? "")
                        : (note.aiContent ?? "")
                    }
                  />
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
              className="w-full rounded-lg max-h-[85vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
