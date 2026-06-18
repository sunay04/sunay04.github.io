export type PortfolioImage = {
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  liveUrl: string;
  images: {
    leftTop: PortfolioImage;
    leftBottom: PortfolioImage;
    featured: PortfolioImage;
  };
};

export type Service = {
  number: string;
  name: string;
  description: string;
};

export const profile = {
  name: "Jack",
  title: "Jack - Creative Portfolio",
  heroTitle: "Hi, i'm Jack",
  heroDescription:
    "a visual creator crafting striking brands, web experiences, motion, and unforgettable digital projects",
  aboutTitle: "About me",
  about:
    "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
  contactLabel: "Contact Me",
  contactUrl: "mailto:jack@example.com",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Price", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const marqueeImages: PortfolioImage[] = [
  {
    src: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    alt: "Space voyage motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    alt: "Codenest motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    alt: "Vex ventures motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    alt: "Stellar AI motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    alt: "Asme motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    alt: "Transform data motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    alt: "Vitara motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    alt: "Terra motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    alt: "Skyelite motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    alt: "Aethera motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    alt: "Designpro motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    alt: "Stellar AI concept preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    alt: "Xportfolio motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    alt: "Orbit web3 motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    alt: "Nexora motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    alt: "EVR ventures motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    alt: "Planet orbit motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    alt: "New era motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    alt: "Wealth motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    alt: "Luminex motion preview",
  },
  {
    src: "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
    alt: "Celestia motion preview",
  },
];

export const services: Service[] = [
  {
    number: "01",
    name: "3D Modeling",
    description:
      "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    number: "02",
    name: "Rendering",
    description:
      "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    number: "03",
    name: "Motion Design",
    description:
      "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    number: "04",
    name: "Branding",
    description:
      "Crafting cohesive visual identities, from logos to full brand systems, that communicate a clear and memorable presence.",
  },
  {
    number: "05",
    name: "Web Design",
    description:
      "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

export const projects: Project[] = [
  {
    id: "nextlevel-studio",
    number: "01",
    name: "Nextlevel Studio",
    category: "Client",
    liveUrl: "#contact",
    images: {
      leftTop: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
        alt: "Nextlevel Studio dark 3D environment detail",
      },
      leftBottom: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
        alt: "Nextlevel Studio sculptural 3D scene",
      },
      featured: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
        alt: "Nextlevel Studio featured 3D composition",
      },
    },
  },
  {
    id: "aura-brand-identity",
    number: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    liveUrl: "#contact",
    images: {
      leftTop: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
        alt: "Aura Brand Identity 3D material study",
      },
      leftBottom: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
        alt: "Aura Brand Identity motion still",
      },
      featured: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
        alt: "Aura Brand Identity featured visual system",
      },
    },
  },
  {
    id: "solaris-digital",
    number: "03",
    name: "Solaris Digital",
    category: "Client",
    liveUrl: "#contact",
    images: {
      leftTop: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
        alt: "Solaris Digital luminous 3D interface",
      },
      leftBottom: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
        alt: "Solaris Digital product render",
      },
      featured: {
        src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
        alt: "Solaris Digital featured 3D landing concept",
      },
    },
  },
];
