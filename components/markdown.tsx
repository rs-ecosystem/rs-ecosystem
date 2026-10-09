import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

// Release notes from GitHub. Raw HTML is not rendered (react-markdown's default).
const components: Components = {
  h1: (props) => <h3 className="mt-6 text-base font-semibold first:mt-0" {...props} />,
  h2: (props) => <h3 className="mt-6 text-base font-semibold first:mt-0" {...props} />,
  h3: (props) => <h4 className="mt-5 text-sm font-semibold first:mt-0" {...props} />,
  h4: (props) => <h5 className="mt-4 text-sm font-semibold first:mt-0" {...props} />,
  p: (props) => <p className="mt-3 leading-relaxed first:mt-0" {...props} />,
  ul: (props) => <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 first:mt-0" {...props} />,
  ol: (props) => <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 first:mt-0" {...props} />,
  li: (props) => <li className="leading-relaxed marker:text-muted-foreground" {...props} />,
  a: ({ href, ...props }) => <a href={href} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4" {...props} />,
  code: (props) => <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]" {...props} />,
  hr: () => <hr className="my-5 border-border" />,
  table: (props) => (
    <div className="mt-3 overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-[13px]" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b bg-muted px-3 py-2 font-medium" {...props} />,
  td: (props) => <td className="border-b px-3 py-2 align-top [tr:last-child_&]:border-0" {...props} />,
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-sm text-foreground/90">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
