"use client";

import React from "react";
import {
  Sparkles,
  ArrowRight,
  Brain,
  Folder,
  Zap,
  FileText,
  Cloud,
  Search,
  UploadCloud,
  X,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-indigo-100">
      {/* Hero Wrapper */}
      <div className="relative overflow-hidden">
        {/* Vibrant base gradient */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#dbff3d] via-[#60ff9b] to-[#1de6e6]" />

        {/* Concentric rings radiating from the center */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `repeating-radial-gradient(
              circle at 50% 35%,
              transparent 0px,
              transparent 160px,
              rgba(0, 0, 0, 0.05) 160px,
              rgba(0, 0, 0, 0.05) 161px
            )`,
          }}
        />

        {/* Smooth fade anchored to the bottom of the hero to blend into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-[400px] bg-gradient-to-t from-[#F9F8F4] via-[#F9F8F4]/80 to-transparent -z-10 pointer-events-none" />

        {/* Navbar */}
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Revly Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl tracking-tight">Revly</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="inline-block text-sm cursor-pointer font-medium bg-white/80 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-full hover:bg-white transition-all shadow-sm border border-slate-200/50"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="inline-block text-sm cursor-pointer font-medium bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="max-w-6xl mx-auto px-6 pt-24 pb-24 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl mx-auto leading-[1.1] text-slate-900">
            Transform lectures into <br className="hidden md:block" />
            structured revision notes.
          </h1>

          <p className="text-lg md:text-xl text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload any lecture image, whiteboard photo, or messy handwritten
            note. Our AI instantly converts it into clean, organized, high-yield
            study materials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full cursor-pointer sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-medium text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
            >
              Try Revly Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dashboard Image Mockup */}
          <div className="mt-24 relative mx-auto max-w-5xl">
            {/* Decorative glow behind mockup */}
            <div className="absolute -inset-2 bg-white/40 rounded-[2rem] blur-2xl opacity-60 -z-10" />

            {/* Direct App Screenshot */}
            <img
              src="/app-screenshot.png"
              alt="Revly Dashboard Interface"
              className="w-full h-auto rounded-2xl shadow-2xl border border-white/60 object-cover relative z-10"
            />
          </div>
        </main>
      </div>

      {/* Features Grid Section */}
      <section className="bg-[#F9F8F4] py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Everything you need to master your syllabus.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools designed to eliminate the friction between taking
              notes and actually learning from them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div
                className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                    linear-gradient(135deg, #60ff9b, #1de6e6)
                  `,
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI Note Generation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[260px]">
                Watch our AI intelligently parse complex topics and structure
                them into digestible, high-yield formats automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div
                className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                    linear-gradient(135deg, #60ff9b, #1de6e6)
                  `,
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Folder className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Subject Organization
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[260px]">
                Keep your workspace clutter-free. Group materials by subject,
                module, or exam date for a seamless study experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div
                className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                    linear-gradient(135deg, #60ff9b, #1de6e6)
                  `,
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Fast OCR Extraction
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[260px]">
                Instantly extract text from messy whiteboards, blurry slides,
                and cursive handwriting with unmatched accuracy.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div
                className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                    linear-gradient(135deg, #60ff9b, #1de6e6)
                  `,
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Clean Revision Notes
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[260px]">
                Export beautifully formatted PDFs or Markdown files. Designed
                for readability and optimal active recall sessions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div
                className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                    linear-gradient(135deg, #60ff9b, #1de6e6)
                  `,
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Secure Cloud Storage
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[260px]">
                Your knowledge base is backed up securely in the cloud and
                synced instantly across all your devices.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div
                className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                    linear-gradient(135deg, #60ff9b, #1de6e6)
                  `,
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Instant Search
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[260px]">
                Find exactly what you need in milliseconds. Search through
                extracted text, AI summaries, and your own custom tags.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#F9F8F4] py-24 md:py-32 relative z-10 border-t border-[#EAE9E4]/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From messy whiteboard photos to perfectly structured study
              materials in three simple steps.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2 z-0" />

            {/* Connecting Line (Mobile) */}
            <div className="md:hidden absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent -translate-x-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="relative group pt-4">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full border-4 border-[#F9F8F4] z-20">
                  Step 01
                </span>
                <div className="relative h-full p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <div
                    className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `
                        radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                        linear-gradient(135deg, #60ff9b, #1de6e6)
                      `,
                    }}
                  />
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mt-2 mb-6 shadow-md">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Upload Image
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Simply snap a photo or upload an existing image of your
                    lecture slides, messy handwritten notes, or whiteboards.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group pt-4">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full border-4 border-[#F9F8F4] z-20">
                  Step 02
                </span>
                <div className="relative h-full p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <div
                    className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `
                        radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                        linear-gradient(135deg, #60ff9b, #1de6e6)
                      `,
                    }}
                  />
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mt-2 mb-6 shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    AI Processing
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our AI instantly extracts the text, identifies key concepts,
                    and intelligently organizes the information for you.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group pt-4">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full border-4 border-[#F9F8F4] z-20">
                  Step 03
                </span>
                <div className="relative h-full p-10 rounded-[2rem] overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <div
                    className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `
                        radial-gradient(ellipse at center, #ffffff 40%, rgba(255,255,255,0.85) 65%, transparent 100%),
                        linear-gradient(135deg, #60ff9b, #1de6e6)
                      `,
                    }}
                  />
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mt-2 mb-6 shadow-md">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Receive Notes
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Instantly get clean, beautifully formatted revision notes
                    ready to be exported, shared, or studied right away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Revly Section */}
      <section className="bg-[#F9F8F4] py-24 md:py-32 relative z-10 border-t border-[#EAE9E4]/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Why students choose Revly
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stop wasting hours re-typing and organizing. See how Revly changes
              the way you prepare for exams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Traditional Revision Card */}
            <div className="bg-white/60 p-10 rounded-[2rem] border border-[#EAE9E4] flex flex-col shadow-sm">
              <h3 className="text-2xl font-bold text-slate-500 mb-8 pb-6 border-b border-[#EAE9E4]">
                Traditional Revision
              </h3>

              <ul className="space-y-6 flex-1">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">
                      Slow & Manual
                    </span>
                    <span className="text-sm text-slate-500">
                      Hours spent deciphering handwriting and manually typing
                      out lecture slides.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">
                      Scattered Materials
                    </span>
                    <span className="text-sm text-slate-500">
                      Notes lost across different notebooks, cloud drives, and
                      camera rolls.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">
                      Information Overload
                    </span>
                    <span className="text-sm text-slate-500">
                      Struggling to figure out which concepts are actually
                      important for the exam.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">
                      Inefficient
                    </span>
                    <span className="text-sm text-slate-500">
                      Spending 80% of your time organizing and only 20% actually
                      learning.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Revly Card */}
            <div className="relative group p-10 rounded-[2rem] overflow-hidden flex flex-col shadow-lg">
              <div
                className="absolute inset-0 -z-10 opacity-100"
                style={{
                  background: `
                    radial-gradient(ellipse at center, #ffffff 50%, rgba(255,255,255,0.9) 75%, transparent 100%),
                    linear-gradient(135deg, #60ff9b, #1de6e6)
                  `,
                }}
              />

              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                <img src="/logo.png" alt="Revly Icon" className="w-8 h-8" />
                <h3 className="text-2xl font-bold text-slate-900">
                  The Revly Way
                </h3>
              </div>

              <ul className="space-y-6 flex-1">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-1">
                      Instant Generation
                    </span>
                    <span className="text-sm text-slate-600">
                      Snap a photo and let AI instantly convert it into
                      perfectly formatted text.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-1">
                      Centralized Workspace
                    </span>
                    <span className="text-sm text-slate-600">
                      All subjects neatly categorized, instantly searchable, and
                      available anywhere.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-1">
                      Smart Summaries
                    </span>
                    <span className="text-sm text-slate-600">
                      AI automatically structures content to highlight
                      high-yield exam concepts.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-1">
                      100% Learning
                    </span>
                    <span className="text-sm text-slate-600">
                      Eliminate the busywork. Spend all your time actively
                      revising and testing yourself.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative pt-32 pb-48 md:pb-56 overflow-hidden bg-[#F9F8F4] z-10">
        <div
          className="absolute bottom-[-10%] inset-x-0 h-[350px] opacity-80 blur-[80px] -z-10 pointer-events-none translate-y-1/4"
          style={{
            background: "linear-gradient(to right, #dbff3d, #60ff9b, #1de6e6)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Start revising <br className="hidden sm:block" /> smarter today.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your first lecture image and let our AI transform it into
            perfectly structured, high-yield revision notes in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full cursor-pointer sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-medium text-base hover:bg-slate-800 transition-all flex items-center justify-center shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
            >
              Get Started Free
            </Link>
            <Link
              to="/register"
              className="w-full cursor-pointer sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md text-slate-900 rounded-full font-medium text-base border border-slate-200/60 hover:bg-white transition-all flex items-center justify-center shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Dark Footer */}
      {/* Minimalist Dark Footer */}
      <footer className="bg-slate-950 pt-16 pb-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
            {/* Left Side: Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="/logo.png"
                  alt="Revly Logo"
                  className="h-6 w-auto brightness-0 invert opacity-90"
                />
                <span className="font-bold text-xl tracking-tight text-white opacity-90">
                  Revly
                </span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Transform lectures into structured revision notes. Upload messy
                photos, get organized study materials instantly.
              </p>
            </div>

            {/* Right Side: GitHub Link */}
            <div className="flex items-center">
              <a
                href="https://github.com/xveekay"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-sm border border-slate-800"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Bottom Side: Centered Copyright */}
          <div className="pt-8 border-t border-slate-800/60 flex items-center justify-center text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Revly. Built by Vishal Kumar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
