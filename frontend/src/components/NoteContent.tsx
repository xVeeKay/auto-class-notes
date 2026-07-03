import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function NoteContent({ content }: { content: string }) {
  return (
    <div
      className="
        bg-muted/40
        border
        rounded-2xl
        p-5
        md:p-7
      "
    >
      <div
        className="
          prose
          dark:prose-invert
          max-w-none
          prose-headings:scroll-mt-20
          prose-headings:font-semibold
          prose-p:leading-7
          prose-li:leading-7
          prose-ul:my-3
          prose-ol:my-3
          prose-strong:text-foreground
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
