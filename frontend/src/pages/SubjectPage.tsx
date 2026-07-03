import React, { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  Image as ImageIcon,
  Copy,
  BookOpen,
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
import { useSubjects } from "@/context/SubjectContext.tsx";

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
  const { subjects } = useSubjects();

  const subject = subjects.find((s: any) => s._id === subjectId);

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

  const toggleDone = async (note: Note) => {
    const updated = !note.isDone;

    // 1. Optimistically update UI
    setNotes((prev) =>
      prev.map((n) => (n._id === note._id ? { ...n, isDone: updated } : n)),
    );

    try {
      // 2. Sync with backend
      await apiFetch(`/notes/${note._id}/done`, {
        method: "PATCH",
        body: {
          isDone: updated,
        },
      });
    } catch (error) {
      // 3. Roll back if request fails
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? { ...n, isDone: !updated } : n)),
      );

      toast.error("Couldn't update note status.");
    }
  };  

  const deleteNote = (noteId: string, title: string) => {
    toast.error(`Delete "${title}"?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await apiFetch(`/notes/${noteId}`, {
              method: "DELETE",
            });
            setNotes((prev) => prev.filter((n) => n._id !== noteId));
            toast.success("Note deleted");
          } catch (error: any) {
            toast.error(
              error.response?.data?.message || "Failed to delete note",
            );
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  // --- Progress Calculations ---
  const totalNotes = notes.length;
  const completedNotes = notes.filter((n) => n.isDone).length;
  const progressPercentage =
    totalNotes === 0 ? 0 : Math.round((completedNotes / totalNotes) * 100);

  // ================= LOADING SKELETON =================
  if (loading) {
    return (
      <div className="h-full overflow-y-auto bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          {/* SKELETON HEADER */}
          <div className="border-b border-border/50 pb-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <Skeleton className="h-10 w-64 md:w-96" />
              <Skeleton className="h-11 w-full lg:w-[340px] rounded-xl" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 p-4 border border-border/40 rounded-2xl bg-muted/10">
              <Skeleton className="h-5 w-48 shrink-0" />
              <Skeleton className="h-2.5 w-full rounded-full" />
            </div>
          </div>

          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="py-8 border-b border-border/40 last:border-0"
              >
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
        {/* ================= DYNAMIC HEADER ================= */}
        <div className="border-b border-border/50 pb-8 mb-8">
          {/* Top Row: Title & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {subject?.title ?? "Subject"}
            </h1>

            <div className="relative w-full lg:w-[340px] shrink-0">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/50 bg-muted/20 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:bg-background shadow-sm text-sm"
              />
            </div>
          </div>

          {/* Bottom Row: Stats & Stretchy Progress Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 bg-muted/10 p-4 md:px-5 rounded-2xl border border-border/40">
            {/* Stats Text (Fixed Width) */}
            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground shrink-0">
              <span className="flex items-center gap-1.5 text-foreground">
                <BookOpen size={16} className="text-primary" />
                {totalNotes} Notes
              </span>
              <span className="text-border/60">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2
                  size={16}
                  className={
                    completedNotes > 0
                      ? "text-primary"
                      : "text-muted-foreground/60"
                  }
                />
                <span className={completedNotes > 0 ? "text-foreground" : ""}>
                  {completedNotes} Completed
                </span>
              </span>
            </div>

            {/* Progress Bar (flex-1 lets it stretch beautifully across the rest of the PC screen) */}
            <div className="flex items-center gap-4 flex-1">
              <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden flex-1">
                <div
                  className={`h-full transition-all duration-700 ease-out rounded-full ${
                    progressPercentage === 100 ? "bg-green-500" : "bg-primary"
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span
                className={`text-sm font-bold w-12 text-right ${
                  progressPercentage === 100
                    ? "text-green-500"
                    : "text-foreground"
                }`}
              >
                {progressPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* ================= NOTES ================= */}
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search size={40} className="text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">
              No notes found matching your search.
            </p>
          </div>
        ) : (
          <div>
            {filteredNotes.map((note, index) => (
              <article
                key={note._id}
                className="py-8 border-b border-border/40 last:border-0"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
                  {/* Title & Date */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xl md:text-2xl font-bold shrink-0 transition-colors ${
                          note.isDone
                            ? "text-muted-foreground/40"
                            : "text-primary"
                        }`}
                      >
                        {index + 1}.
                      </span>
                      <h2
                        className={`text-xl md:text-2xl font-semibold leading-tight tracking-tight transition-all ${
                          note.isDone
                            ? "line-through text-muted-foreground/60"
                            : "text-foreground"
                        }`}
                      >
                        {note.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 mt-2 ml-7 text-xs font-medium text-muted-foreground">
                      <Calendar size={14} />
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Segmented Button Group */}
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
                          ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                          : ""
                      }`}
                      onClick={() => toggleDone(note)}
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
                      onClick={() => deleteNote(note._id, note.title)}
                    >
                      <Trash2 size={14} className="md:mr-2 shrink-0" />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                </div>

                {/* NOTE CONTENT */}
                <div
                  className={`pl-0 lg:pl-7 transition-opacity duration-300 ${
                    note.isDone ? "opacity-30 pointer-events-none" : ""
                  }`}
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
        <DialogContent className="max-w-5xl p-2 bg-background border-border/50 shadow-2xl rounded-xl">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Original Upload"
              className="w-full rounded-lg max-h-[85vh] object-contain bg-muted/20"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
