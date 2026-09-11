import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '../../data/portfolio';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Section id="testimonials" label="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="// 06 — ENDORSEMENTS"
        title="Client Reviews & Recommendations"
        description="Direct feedback from team leads, business owners, and project stakeholders."
      />

      <div className="max-w-4xl mx-auto relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 px-3 sm:px-4">
                <div className="glass-card rounded-2xl border border-border p-6 sm:p-10 text-center space-y-6 shadow-card relative overflow-hidden">
                  {/* Subtle ambient glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

                  {/* 5-Star Rating */}
                  <div className="flex justify-center items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={17} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote size={32} className="text-accent/30 mx-auto" />

                  <p className="text-base sm:text-xl text-text leading-relaxed font-medium max-w-2xl mx-auto">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author Credentials */}
                  <div className="space-y-1.5 pt-4 border-t border-border/50">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center font-bold text-bg text-sm mx-auto shadow-sm">
                      {item.author.charAt(0)}
                    </div>
                    <div className="font-display text-base font-bold text-text">{item.author}</div>
                    <div className="font-mono text-xs text-text-faint">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
            className="p-2 rounded-full border border-border bg-surface-2 hover:border-accent text-text-dim hover:text-text transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  selectedIndex === idx ? 'w-7 bg-accent shadow-glow' : 'w-2 bg-border-strong hover:bg-text-faint'
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next testimonial"
            className="p-2 rounded-full border border-border bg-surface-2 hover:border-accent text-text-dim hover:text-text transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
}
