import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { NINH_BINH_PROJECTS } from '../data/solarData';

export default function ProjectsSection({ onRequestSimilar }) {
  return (
    <section id="projects" className="scroll-mt-24 py-6 md:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Unified Architectural Bento Shell */}
        <div className="bg-[#EFECE6]/70 border border-black/[0.06] rounded-[32px] p-5 md:p-7">
          {/* Compact Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700]" />
                Dự án đã bàn giao
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B]">
                Công Trình Thực Tế Tại Ninh Bình
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#71717A] max-w-xs sm:text-right">
              Vận hành ổn định tại Hoa Lư, Tràng An, Tam Điệp &amp; Yên Khánh.
            </p>
          </div>

          {/* Strictly Locked Full-Width 4-Column Edge-to-Edge Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {NINH_BINH_PROJECTS.map((project) => (
              <article
                key={project.id}
                onClick={() => onRequestSimilar(`${project.title} (${project.spec})`)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#18181B] cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                {/* Edge-to-Edge Photography */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Top Spec Pill & Quick Arrow */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white tabular-nums">
                    {project.spec}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/90 text-[#18181B] flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF5E1A] group-hover:to-[#FFC700] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Overlaid Frosted Dark-Glass Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-md border-t border-white/15 px-3.5 py-3 text-white">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-extrabold tracking-tight truncate">
                      {project.title}
                    </h3>
                    <span className="text-[11px] font-bold text-[#FFC700] tabular-nums shrink-0">
                      -{project.monthlySaved}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-zinc-300 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#FF8A00] shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
