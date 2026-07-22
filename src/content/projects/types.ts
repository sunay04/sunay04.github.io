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

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  tags: string[];
  metrics: string[];
  takeaways?: string[];
  liveUrl?: string;
  linkLabel?: string;
  resources?: ProjectResource[];
  hero: PortfolioImage;
  heroSupport?: PortfolioImage;
  gallery: PortfolioImage[];
  galleryLayout?: "feature-poster" | "sequence-grid";
  detailLayout?: "default" | "poster-pair";
};
