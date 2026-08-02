export type PortfolioImage = {
  src: string;
  alt: string;
  type?: "image" | "video";
  fit?: "cover" | "contain";
  caption?: string;
  span?: "normal" | "wide";
  height?: "standard" | "tall";
  orientation?: "natural" | "landscape" | "portrait" | "panorama";
};

export type ProjectResource = {
  label: string;
  href: string;
  note?: string;
};

export type ProjectBlock =
  | { id: string; type: "text"; heading?: string; body: string; width?: "narrow" | "wide" }
  | { id: string; type: "quote"; body: string; attribution?: string }
  | { id: string; type: "media"; media: PortfolioImage }
  | { id: string; type: "gallery"; items: PortfolioImage[]; columns?: 2 | 3 }
  | { id: string; type: "metrics"; items: string[] }
  | { id: string; type: "spacer"; size?: "small" | "medium" | "large" };

export type Project = {
  id: string;
  number?: string;
  name: string;
  category: string;
  role?: string;
  year?: string;
  startDate?: string;
  endDate?: string;
  summary: string;
  tags: string[];
  metrics?: string[];
  takeaways?: string[];
  liveUrl?: string;
  linkLabel?: string;
  resources?: ProjectResource[];
  hero: PortfolioImage;
  heroSupport?: PortfolioImage;
  gallery: PortfolioImage[];
  galleryLayout?: "feature-poster" | "sequence-grid";
  detailLayout?: "default" | "poster-pair";
  blocks?: ProjectBlock[];
};
