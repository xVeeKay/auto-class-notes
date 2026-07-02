import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Image as ImageIcon,
  FileText,
  Send,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { apiFetch, uploadFetch } from "@/api/fetchClient.ts";
import { SpinnerCustom } from "@/components/ui/spinner.tsx";
import { useSubjects } from "@/context/SubjectContext.tsx";

// 1. Define types directly in the file
type QueueStatus = "queued" | "processing" | "completed" | "failed";

interface QueueItem {
  id: number;
  filename: string;
  file:File;
  status: QueueStatus;
  noteId?:string;
  errorMessage?:string;
  subjectId?:string;
}

const initialQueue: QueueItem[] = [];

export default function Dashboard() {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [isProcessing,setIsProcessing]=useState(false)
  const {fetchSubjects}=useSubjects()

  // 3. Type the refs as HTMLInputElement
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newItems: QueueItem[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      filename: file.name,
      file,
      status: "queued",
    }));

    setQueue((prev) => [...prev, ...newItems]);
    event.target.value = "";
  };

  const uploadFile=async(file:File)=>{
    const formData=new FormData()
    formData.append("file",file)
    const res=await uploadFetch("/notes/upload",formData)
    return res
  }

  useEffect(()=>{
    if(isProcessing) return
    const nextItem=queue.find((i)=>i.status==="queued")
    if(!nextItem) return
    processQueueItem(nextItem.id)
  },[queue,isProcessing])

const pollNoteStatus=async(noteId:string,queueItemId:number)=>{
  const interval=setInterval(async()=>{
    try {
      const res = await apiFetch(`/notes/${noteId}/status`);
      const note=res.data
      if(note.status=="completed"){
        setQueue((prev)=>prev.map((i)=>i.id==queueItemId?{...i,subjectId:note.subjectId,status:"completed",}:i))
        const completedTime = new Date(note.processingCompletedAt).getTime();
        const startedTime = new Date(note.processingStartedAt).getTime();
        const totalTimeInSeconds = (completedTime - startedTime) / 1000;
        toast.success(
          `Notes generated for: ${note.detectedSubject} in ${totalTimeInSeconds.toFixed(1)}s`,
        );
        await fetchSubjects()
        clearInterval(interval);
      }
      if(note.status=="failed"){
        setQueue((prev) =>
          prev.map((i) =>
            i.id == queueItemId ? { ...i, status: "failed",errorMessage:note.errorMessage } : i,
          ),
        );
        clearInterval(interval);
        toast.error(note.errorMessage || "Failed to generate notes");
      }

    } catch (error) {
      clearInterval(interval)
    }
  },2000)
}

  const processQueueItem = async(itemId: number) => {
    try {
      setIsProcessing(true)
      setQueue((prev)=>prev.map((i)=>i.id==itemId?{...i,status:"processing"}:i))
      const item=queue.find((i)=>i.id==itemId)
      if (!item) {
        throw new Error("Queue item not found");
      }
      const res=await uploadFile(item.file)
      const noteId=res.data?.note._id
      setQueue((prev) =>
        prev.map((i) => (i.id == itemId ? { ...i, noteId } : i)),
      );
      pollNoteStatus(noteId,itemId)
      toast.success("AI generation started...")
    } catch (error:any) {
      setQueue((prev) =>
        prev.map((i) => (i.id == itemId ? { ...i, status: "failed" } : i)),
      );
      toast.error( error.message|| "Failed to create note")
    }finally{
      setIsProcessing(false)
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground font-sans">
      {/* HIDDEN FILE INPUTS */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // Prioritizes rear camera on mobile
        ref={cameraInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        type="file"
        accept="image/*"
        multiple // Allow multiple image selection
        ref={galleryInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx,application/pdf"
        multiple
        ref={documentInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {queue.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center fade-in animate-in duration-500">
            <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Camera size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              AutoNotes
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Transform lecture photos into revision-ready notes.
            </p>
          </div>
        ) : (
          /* ACTIVITY FEED */
          <div className="max-w-3xl mx-auto w-full space-y-4 fade-in animate-in duration-300 pb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 px-1">
              Active Session Queue
            </h3>
            {queue.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 bg-card border border-border rounded-xl shadow-sm"
              >
                <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center mr-4 text-muted-foreground">
                  {item.filename.endsWith(".pdf") ? (
                    <FileText size={20} />
                  ) : (
                    <ImageIcon size={20} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.filename}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {item.status}{" "}
                    {item.errorMessage ? `: ${item.errorMessage}` : ""}
                  </p>
                </div>
                <div className="ml-4 shrink-0">
                  {item.status === "processing" && (
                    <Badge
                      variant="secondary"
                      className="flex gap-1.5 py-1 px-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border-none"
                    >
                      <SpinnerCustom /> Generating notes...
                    </Badge>
                  )}
                  {item.status === "queued" && (
                    <Badge
                      variant="outline"
                      className="flex gap-1.5 py-1 px-2.5 text-muted-foreground"
                    >
                      <Clock size={12} /> Waiting in queue...
                    </Badge>
                  )}
                  {item.status === "completed" && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="default"
                        className="flex gap-1.5 py-1 px-2.5 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-none"
                      >
                        <CheckCircle2 size={12} /> Completed
                      </Badge>

                      {item.subjectId && (
                        <Link
                          to={`/dashboard/${item.subjectId}`}
                          className="flex items-center gap-1.5 text-xs font-medium text-foreground bg-secondary/50 hover:bg-secondary px-2.5 py-1 rounded-md transition-colors"
                        >
                          View Subject <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  )}
                  {item.status === "failed" && (
                    <Badge
                      variant="default"
                      className="flex gap-1.5 py-1 px-2.5 bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-none"
                    >
                      <XCircle size={12} /> Failed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STATIC BOTTOM UPLOAD BAR */}
      <div className="shrink-0 bg-background px-4 pb-6 pt-2 md:px-8 md:pb-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2 p-2 bg-card border border-border shadow-sm rounded-full transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
            {/* Camera Action */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="h-10 w-10 flex items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ml-1"
              aria-label="Take Photo"
            >
              <Camera size={20} />
            </button>

            {/* Gallery Action */}
            <button
              onClick={() => galleryInputRef.current?.click()}
              className="h-10 w-10 flex items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              aria-label="Upload Gallery"
            >
              <ImageIcon size={20} />
            </button>

            {/* Document Action */}
            <button
              onClick={() => documentInputRef.current?.click()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              aria-label="Upload PDF"
            >
              <FileText size={20} />
            </button>

            {/* Clickable Text Area (Defaults to gallery upload for speed) */}
            <div
              onClick={() => galleryInputRef.current?.click()}
              className="flex-1 px-2 text-sm text-muted-foreground truncate cursor-pointer hover:text-foreground transition-colors"
            >
              Capture or select files...
            </div>

            {/* Upload Button (Also wired to Gallery for this fast-upload workflow) */}
            <button
              onClick={() => galleryInputRef.current?.click()}
              className="h-10 px-4 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm mr-1"
            >
              <span className="hidden sm:inline">Upload</span>
              <Send size={16} />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3 pb-1 hidden sm:block">
            AutoNotes AI automatically categorizes and summarizes your uploads.
          </p>
        </div>
      </div>
    </div>
  );
}
