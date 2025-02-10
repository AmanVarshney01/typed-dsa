"use client";
import type { ScrollAreaViewportProps } from "@radix-ui/react-scroll-area";
import { Check, Copy, Edit2, Play } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { cn } from "../lib/cn";
import { useCopyButton } from "../lib/use-copy-button";
import { buttonVariants } from "./ui/button";
import { ScrollArea, ScrollBar, ScrollViewport } from "./ui/scroll-area";

declare global {
  interface Window {
    ts: typeof import("typescript");
  }
}

export type CodeBlockProps = HTMLAttributes<HTMLElement> & {
  icon?: ReactNode;
  allowCopy?: boolean;
  keepBackground?: boolean;
  viewportProps?: ScrollAreaViewportProps;
};

export const Pre = forwardRef<HTMLPreElement, HTMLAttributes<HTMLPreElement>>(
  ({ className, ...props }, ref) => {
    return (
      <pre
        ref={ref}
        className={cn("p-4 focus-visible:outline-none", className)}
        {...props}
      >
        {props.children}
      </pre>
    );
  },
);

Pre.displayName = "Pre";

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(
  (
    {
      title,
      allowCopy = true,
      keepBackground = false,
      icon,
      viewportProps,
      ...props
    },
    ref,
  ) => {
    const areaRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState<string>("");
    const [typescript, setTypeScript] = useState<typeof window.ts | null>(null);

    useCallback(() => {
      const pre = areaRef.current?.getElementsByTagName("pre").item(0);
      if (pre) {
        setCode(pre.textContent || "");
      }
    }, []);

    const onCopy = useCallback(() => {
      const pre = areaRef.current?.getElementsByTagName("pre").item(0);
      if (!pre) return;
      const clone = pre.cloneNode(true) as HTMLElement;
      // biome-ignore lint/complexity/noForEach: <explanation>
      clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
        node.remove();
      });
      void navigator.clipboard.writeText(clone.textContent ?? "");
    }, []);

    const loadTypeScript = async () => {
      if (!typescript && !window.ts) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/typescript/5.3.3/typescript.min.js";
        script.async = true;

        await new Promise((resolve, reject) => {
          script.onload = () => {
            setTypeScript(window.ts);
            resolve(null);
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
    };

    const handleRun = async () => {
      try {
        await loadTypeScript();

        const currentCode = isEditing
          ? code
          : areaRef.current?.getElementsByTagName("pre").item(0)?.textContent ||
            "";

        const result = window.ts.transpileModule(currentCode, {
          compilerOptions: {
            target: window.ts.ScriptTarget.ES2015,
            module: window.ts.ModuleKind.CommonJS,
            strict: true,
          },
        });

        // Create custom console to capture output
        const outputs: string[] = [];
        const customConsole = {
          log: (...args: unknown[]) => {
            outputs.push(
              args
                .map((arg) =>
                  typeof arg === "object"
                    ? JSON.stringify(arg, null, 2)
                    : String(arg),
                )
                .join(" "),
            );
          },
          error: (...args: unknown[]) => {
            outputs.push(`Error: ${args.join(" ")}`);
          },
        };

        const runFunction = new Function("console", result.outputText);
        runFunction(customConsole);

        setOutput(outputs.join("\n"));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setOutput(`Error: ${error.message}`);
        } else {
          setOutput("An unknown error occurred");
        }
      }
    };

    const toggleEdit = () => {
      if (!isEditing) {
        const pre = areaRef.current?.getElementsByTagName("pre").item(0);
        setCode(pre?.textContent || "");
      }
      setIsEditing(!isEditing);
    };

    return (
      <figure
        ref={ref}
        {...props}
        className={cn(
          "not-prose group fd-codeblock relative my-6 overflow-hidden rounded-lg border bg-fd-secondary/50 text-sm",
          keepBackground &&
            "bg-[var(--shiki-light-bg)] dark:bg-[var(--shiki-dark-bg)]",
          props.className,
        )}
      >
        <div className="flex flex-row items-center gap-2 border-b bg-fd-muted px-4 py-1.5">
          {icon && (
            <div className="text-fd-muted-foreground [&_svg]:size-3.5">
              {typeof icon === "string" ? (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                <div dangerouslySetInnerHTML={{ __html: icon }} />
              ) : (
                icon
              )}
            </div>
          )}
          {title && (
            <figcaption className="flex-1 truncate text-fd-muted-foreground">
              {title}
            </figcaption>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              className={buttonVariants({ color: "ghost" })}
              onClick={toggleEdit}
              aria-label={isEditing ? "Save" : "Edit"}
            >
              <Edit2 className="size-3.5" />
            </button>
            <button
              type="button"
              className={buttonVariants({ color: "ghost" })}
              onClick={handleRun}
              aria-label="Run Code"
            >
              <Play className="size-3.5" />
            </button>
            {allowCopy && <CopyButton className="-me-2" onCopy={onCopy} />}
          </div>
        </div>

        <ScrollArea ref={areaRef} dir="ltr">
          <ScrollViewport
            {...viewportProps}
            className={cn("max-h-[600px]", viewportProps?.className)}
          >
            {isEditing ? (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full min-h-[500px] h-full p-4 font-mono bg-transparent focus:outline-none resize-y"
              />
            ) : (
              props.children
            )}
            {output && (
              <div className="border-t p-4 bg-black/10">
                <pre className="font-mono whitespace-pre-wrap text-sm">
                  {output}
                </pre>
              </div>
            )}
          </ScrollViewport>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </figure>
    );
  },
);

CodeBlock.displayName = "CodeBlock";

function CopyButton({
  className,
  onCopy,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  onCopy: () => void;
}) {
  const [checked, onClick] = useCopyButton(onCopy);

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          color: "ghost",
        }),
        "transition-opacity group-hover:opacity-100 [&_svg]:size-3.5",
        !checked && "[@media(hover:hover)]:opacity-0",
        className,
      )}
      aria-label={checked ? "Copied Text" : "Copy Text"}
      onClick={onClick}
      {...props}
    >
      <Check className={cn("transition-transform", !checked && "scale-0")} />
      <Copy
        className={cn("absolute transition-transform", checked && "scale-0")}
      />
    </button>
  );
}
