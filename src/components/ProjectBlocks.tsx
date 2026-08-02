import { ExternalLink } from "lucide-react";
import type { PortfolioImage, ProjectBlock } from "../content/projects";
import { cn } from "../lib/utils";

function BlockMedia({ media }: { media: PortfolioImage }) {
  const isVideo = media.type === "video";
  const className = cn(
    "block h-full w-full bg-[#ebe9e4]",
    media.fit === "contain" ? "object-contain" : "object-cover",
  );

  return (
    <figure className="project-block-media overflow-hidden rounded-[6px] bg-white/[0.05]">
      {isVideo ? (
        <video className={className} src={media.src} controls playsInline preload="metadata" />
      ) : (
        <img className={className} src={media.src} alt={media.alt} loading="lazy" />
      )}
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

export function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <div className="project-blocks mt-14 md:mt-20">
      {blocks.map((block) => {
        if (block.type === "text") {
          return (
            <section key={block.id} className={cn("project-copy-block", block.width === "wide" && "is-wide")}>
              {block.heading && <h3>{block.heading}</h3>}
              <p>{block.body}</p>
            </section>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={block.id} className="project-quote-block">
              <p>{block.body}</p>
              {block.attribution && <cite>{block.attribution}</cite>}
            </blockquote>
          );
        }

        if (block.type === "media") return <BlockMedia key={block.id} media={block.media} />;

        if (block.type === "gallery") {
          return (
            <section key={block.id} className={cn("project-block-gallery", block.columns === 3 && "is-three-column")}>
              {block.items.map((media, index) => <BlockMedia key={`${media.src}-${index}`} media={media} />)}
            </section>
          );
        }

        if (block.type === "metrics") {
          return (
            <ol key={block.id} className="project-metrics-block">
              {block.items.map((item, index) => (
                <li key={`${item}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
              ))}
            </ol>
          );
        }

        return <div key={block.id} aria-hidden="true" className={`project-spacer is-${block.size ?? "medium"}`} />;
      })}
    </div>
  );
}

export function ProjectLink({ href, label }: { href: string; label: string }) {
  return <a className="editor-project-link" href={href} target="_blank" rel="noreferrer">{label}<ExternalLink size={15} /></a>;
}
