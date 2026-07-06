import React, { useState } from "react";
import {
  Sparkles,
  Bug,
  Lightbulb,
  Palette,
  Gauge,
  MessageSquare,
  Send,
  Lock,
  CheckCircle2,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/api/fetchClient.ts";
import { Link } from "react-router-dom";

// --- Types & Data ---
type CategoryId = "ai" | "bug" | "feature" | "ui" | "performance" | "general";

interface FeedbackCategory {
  id: CategoryId;
  label: string;
  icon: React.ElementType;
}

const CATEGORIES: FeedbackCategory[] = [
  { id: "ai", label: "AI Notes Quality", icon: Sparkles },
  { id: "bug", label: "Bug Report", icon: Bug },
  { id: "feature", label: "Feature Request", icon: Lightbulb },
  { id: "ui", label: "UI / UX", icon: Palette },
  { id: "performance", label: "Performance", icon: Gauge },
  { id: "general", label: "General Feedback", icon: MessageSquare },
];

export default function FeedbackPage() {
  const [category, setCategory] = useState<CategoryId>("ai");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !details.trim()) {
      toast.error("Please fill out the subject and details.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiFetch("/feedback", {
        method: "POST",
        body: {
          category,
          subject,
          message: details,
        },
      });
      toast.success("Feedback sent! Thank you for helping improve Revly.");
      setSubject("");
      setDetails("");
    } catch (error: any) {
      toast.error(error.message || "Error while submitting feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Main Grid Layout: Stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* =========================================================
              LEFT COLUMN: THE FORM
          ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {/* Header */}
            <div className="mb-8">
              {/* === BACK BUTTON === */}
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 w-fit"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>
              {/* ==================== */}

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3 mb-4">
                We'd love your feedback
                <Heart size={28} className="text-primary fill-primary/20" />
              </h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                Revly is a project I'm building while learning full-stack
                development. You may find bugs, inaccurate AI notes, or areas
                that can be improved. Your feedback helps me make it better.{" "}
                <span className="font-semibold text-foreground">
                  Every suggestion is appreciated!
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Category Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  What is this about?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border/60 bg-background text-muted-foreground hover:bg-muted/30 hover:border-border"
                        }`}
                      >
                        <Icon
                          size={24}
                          className={`mb-2 ${isSelected ? "text-primary" : "opacity-70"}`}
                        />
                        <span className="text-xs font-medium text-center">
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-foreground">
                    Subject
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {subject.length}/100
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={100}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Briefly describe your feedback"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-muted/20 outline-none transition-all focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Details Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-foreground">
                    Tell me more
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {details.length}/1000
                  </span>
                </div>
                <textarea
                  maxLength={1000}
                  rows={5}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe your experience...&#10;What happened?&#10;What did you expect?&#10;How can Revly be improved?"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-muted/20 outline-none transition-all focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm placeholder:text-muted-foreground/60 resize-none leading-relaxed"
                />
              </div>

              {/* Submit Section */}
              <div className="pt-2 flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <Send size={16} />
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </Button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Lock size={12} />
                  Your feedback is private and only used to improve Revly.
                </p>
              </div>
            </form>
          </div>

          {/* =========================================================
              RIGHT COLUMN: INFO PANEL
          ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0">
            {/* Sticky container so it stays visible while scrolling the long form on desktop */}
            <div className="sticky top-8 bg-muted/10 border border-border/40 rounded-3xl p-6 md:p-8">
              {/* Minimalist Graphic Replacement */}
              <div className="w-full flex justify-center mb-8">
                <img
                  src="/feedback-hero.svg"
                  alt="Developer Illustration"
                  className="w-full max-w-[280px] h-auto object-contain drop-shadow-sm dark:opacity-90"
                />
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6">
                Why your feedback matters
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-medium">
                      Direct Impact:
                    </strong>{" "}
                    I read every single piece of feedback personally to guide
                    development.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-red-500/10 text-red-500 shrink-0 mt-0.5">
                    <Bug size={16} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-medium">
                      Improve Stability:
                    </strong>{" "}
                    Bug reports help me find and fix errors faster for all
                    students.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                    <Sparkles size={16} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-medium">
                      Refine the AI:
                    </strong>{" "}
                    AI note suggestions directly influence how I prompt and tune
                    the model.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
                    <Lightbulb size={16} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-medium">
                      Shape the Future:
                    </strong>{" "}
                    Feature ideas help build better study tools tailored to real
                    needs.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
