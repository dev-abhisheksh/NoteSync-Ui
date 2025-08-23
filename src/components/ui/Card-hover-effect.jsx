// src/components/ui/Card-hover-effect.jsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10", className)}
    >
      {items.map((item, idx) => (
        <div
          key={item._id || idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <Card>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.content}</CardDescription>

            {/* ✅ Tags */}
            {item.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-500 text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ✅ Date + Public/Private */}
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-gray-500">{item.date}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isPublic
                    ? "bg-green-100 text-green-700" // ✅ Public = green
                    : "bg-red-100 text-red-700"     // ✅ Private = red
                  }`}
              >
                {item.isPublic ? "Public" : "Private"}
              </span>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ children }) => (
  <div className="rounded-2xl h-60 w-full max-w-sm p-2 bg-white text-gray-50 shadow-lg hover:shadow-2xl transition-shadow duration-300 border dark:border-white/[0.1] relative z-20">
    <div className="relative z-50 h-full flex flex-col justify-between">
      {children}
    </div>
  </div>
);

export const CardTitle = ({ children }) => (
  <h4 className="text-black font-bold tracking-wide mt-2">{children}</h4>
);

export const CardDescription = ({ children }) => (
  <p className="mt-2 text-zinc-400 text-sm leading-relaxed overflow-x-hidden p-1">{children}</p>
);
