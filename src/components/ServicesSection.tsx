import { FadeIn } from "./FadeIn";
import { services } from "../content/portfolio";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn as="h2" className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-ink sm:mb-20 md:mb-28">
        Services
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn
            key={service.name}
            delay={index * 0.1}
            className="grid gap-5 border-b border-[rgba(12,12,12,0.15)] py-8 first:border-t sm:grid-cols-[minmax(120px,0.34fr)_1fr] sm:gap-8 sm:py-10 md:py-12"
          >
            <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-ink">
              {service.number}
            </span>
            <div className="flex flex-col justify-center gap-4">
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight text-ink">
                {service.name}
              </h3>
              <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-ink/60">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
