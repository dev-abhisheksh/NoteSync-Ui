// src/components/ui/Card-hover-effect.jsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { FileText, Download, Edit, Trash2 } from "lucide-react";

export const HoverEffect = ({ items, className, onEdit, onDelete }) => {
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
            {/* Header with Title and Public/Private Badge */}
            <div className="flex justify-between items-start mb-3">
              <CardTitle>{item.name}</CardTitle>
              <span
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  item.isPublic
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {item.isPublic ? "Public" : "Private"}
              </span>
            </div>

            {/* Content */}
            <CardDescription>{item.content}</CardDescription>

            {/* Files Section - NEW */}
            {item.files?.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Files:</h4>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {item.files.map((file, fileIdx) => (
                    <div
                      key={fileIdx}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-md text-xs"
                    >
                      <FileText className="h-3 w-3 text-gray-500" />
                      <span className="flex-1 truncate text-gray-700">
                        {file.fileName || file.name || file.filename || `File ${fileIdx + 1}`}
                      </span>
                      {(file.fileUrl || file.url) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.fileUrl || file.url, '_blank');
                          }}
                          className="text-blue-500 hover:text-blue-700"
                          title="Download/View"
                        >
                          <Download className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom section with tags and actions */}
            <div className="mt-auto">
              {/* Tags section */}
              {item.tags?.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-end gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(item);
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(item);
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ children }) => (
  <div className="rounded-xl h-80 w-full max-w-sm p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative z-20">
    <div className="relative z-50 h-full flex flex-col">
      {children}
    </div>
  </div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-gray-900 font-semibold text-lg leading-tight">{children}</h3>
);

export const CardDescription = ({ children }) => (
  <p className="mt-2 text-gray-600 text-sm leading-relaxed flex-grow overflow-hidden line-clamp-3">
    {children}
  </p>
);