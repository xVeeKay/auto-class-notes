import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  Bot,
  Cloud,
  Rocket,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Star,
  Bug,
  Lightbulb,
  Share2,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-5 py-10 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* ================= BACK LINK ================= */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* ================= HERO SECTION ================= */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight flex items-center gap-3 mb-4">
            Support Revly
            <Heart size={32} className="text-red-500 fill-red-500/20" />
          </h1>
          <p className="text-xl text-foreground/90 font-medium mb-4">
            Every contribution helps improve the app for everyone.
          </p>
          <p className="text-muted-foreground text-[15px] md:text-base leading-relaxed max-w-2xl">
            Revly is built and maintained by a student who enjoys building
            useful tools for other students. If Revly has helped you save time,
            revise faster, or organize your notes better, you can support its
            development.
          </p>
        </div>

        {/* ================= STORY & QR SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* PERSONAL NOTE */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              A note from me
            </h2>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 text-[15px] md:text-base leading-relaxed text-foreground/90 space-y-4 shadow-sm">
              <p>Hi! 👋</p>
              <p>
                I'm a Computer Science student who built Revly to solve a
                problem I personally faced while studying.
              </p>
              <p>
                I'm still learning, so you may occasionally encounter bugs or
                features that aren't perfect yet. Every update teaches me
                something new, and your feedback has a huge impact on the
                direction of this project.
              </p>
              <p>
                If Revly has been useful to you, even a small contribution
                motivates me to keep improving it.
              </p>
              <p className="pt-2 font-medium">
                Thank you for being part of this journey. ❤️ <br />
                <span className="text-muted-foreground font-normal">
                  — Vishal
                </span>
              </p>
            </div>
          </div>

          {/* QR CODE CARD */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-semibold mb-6">
                <QrCode size={16} />
                UPI Payments
              </div>

              {/* QR Image Container */}
              <div className="w-48 h-48 bg-white rounded-2xl p-3 shadow-inner border border-border/40 mb-6 flex items-center justify-center relative overflow-hidden">
                {/* Replace '/upi-qr.png' with your actual QR code image path */}
                <img
                  src="/upi-qr.png"
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                Scan with any UPI app
              </h3>
              <p className="text-xs font-medium text-muted-foreground mb-6">
                (Paytm, Google Pay, PhonePe, BHIM, Amazon Pay)
              </p>

              {/* Transparency Checklist */}
              <div className="w-full bg-muted/20 rounded-xl p-4 border border-border/40 space-y-2.5 text-left mb-6">
                <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                  <Bot size={14} className="text-foreground/70" /> AI API
                  credits
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                  <Cloud size={14} className="text-foreground/70" /> Hosting &
                  deployment
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                  <ShieldCheck size={14} className="text-foreground/70" />{" "}
                  Project maintenance
                </div>
              </div>

              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                Every contribution is appreciated{" "}
                <Heart size={14} className="text-red-500 fill-red-500" />
              </p>
            </div>
          </div>
        </div>

        {/* ================= WHY SUPPORT GRID ================= */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Where your support goes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: AI */}
            <div className="bg-muted/10 border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Bot size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Better AI</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                AI is the biggest cost of Revly.
              </p>
              <ul className="space-y-2 mt-auto">
                {[
                  "Use better AI models",
                  "Generate higher quality notes",
                  "Improve subject detection",
                  "Add AI-powered features",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Infrastructure */}
            <div className="bg-muted/10 border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <Cloud size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Keep the app online
              </h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                Running a web application isn't free.
              </p>
              <ul className="space-y-2 mt-auto">
                {[
                  "Server & DB hosting",
                  "Image storage",
                  "Domain & deployment",
                  "Faster infrastructure",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Features */}
            <div className="bg-muted/10 border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                <Rocket size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Continuous Updates</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                Building based on your feedback.
              </p>
              <ul className="space-y-2 mt-auto">
                {[
                  "Better revision notes",
                  "PDF & PPT support",
                  "Smarter AI processing",
                  "New productivity tools",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= OTHER WAYS TO SUPPORT ================= */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Other ways to support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border/60 rounded-xl p-5 hover:bg-muted/30 transition-colors">
              <Star size={20} className="text-yellow-500 mb-3" />
              <h3 className="font-semibold text-[15px] mb-1">Star or Share</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Share the project with your classmates to help it grow.
              </p>
            </div>

            <Link
              to="/feedback"
              className="bg-card border border-border/60 rounded-xl p-5 hover:bg-muted/30 transition-colors block"
            >
              <Bug size={20} className="text-red-500 mb-3" />
              <h3 className="font-semibold text-[15px] mb-1">Report Bugs</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Found an issue? Let me know so I can fix it for everyone.
              </p>
            </Link>

            <Link
              to="/feedback"
              className="bg-card border border-border/60 rounded-xl p-5 hover:bg-muted/30 transition-colors block"
            >
              <Lightbulb size={20} className="text-blue-500 mb-3" />
              <h3 className="font-semibold text-[15px] mb-1">
                Suggest Features
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Have a great idea? Tell me what you want to see next.
              </p>
            </Link>

            <div className="bg-card border border-border/60 rounded-xl p-5 hover:bg-muted/30 transition-colors">
              <Share2 size={20} className="text-primary mb-3" />
              <h3 className="font-semibold text-[15px] mb-1">Keep Using It</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Simply using and recommending Revly is a huge help!
              </p>
            </div>
          </div>
        </div>

        {/* ================= FOOTER DISCLAIMER ================= */}
        <div className="mt-12 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Donations are completely optional. Revly will continue to remain
            available to everyone regardless of whether you choose to support it
            financially.
          </p>
        </div>
      </div>
    </div>
  );
}
