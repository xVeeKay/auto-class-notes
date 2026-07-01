export default function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="max-w-md space-y-2 text-center">
        <h2 className="text-lg font-medium">No subject selected</h2>

        <p className="text-sm text-muted-foreground">
          Select a subject from the sidebar to start writing notes in a
          clean timeline view.
        </p>

        <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white">
          + Create Note
        </button>
      </div>
    </div>
  );
}