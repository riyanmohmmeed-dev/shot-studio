"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getGallery, removeFromGallery, type GalleryItem } from "@/lib/galleryStorage";

type Props = {
  onSelectImage: (url: string) => void;
  refreshTrigger?: number; // increment to refetch from localStorage
};

export default function Gallery({ onSelectImage, refreshTrigger }: Props) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setItems(getGallery());
  }, [refreshTrigger]);

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeFromGallery(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (lightbox?.id === id) setLightbox(null);
  };

  if (items.length === 0) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12"
      >
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
          Your shots
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {items.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              layout
              onClick={() => setLightbox(item)}
              className="group relative aspect-video overflow-hidden rounded-xl border border-glassBorder bg-void"
            >
              <Image
                src={item.imageUrl}
                alt=""
                fill
                className="object-cover transition group-hover:scale-105"
                unoptimized
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-left text-xs text-white/90 line-clamp-2">
                {item.prompt.slice(0, 60)}…
              </span>
              <button
                type="button"
                onClick={(e) => handleRemove(e, item.id)}
                className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white/80 opacity-0 transition hover:bg-red-600 hover:opacity-100 group-hover:opacity-100"
                aria-label="Remove from gallery"
              >
                ×
              </button>
            </motion.button>
          ))}
        </div>
      </motion.section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl"
            >
              <Image
                src={lightbox.imageUrl}
                alt={lightbox.prompt}
                width={1024}
                height={576}
                className="max-h-[85vh] w-auto rounded-xl object-contain"
                unoptimized
              />
              <p className="mt-2 max-w-2xl text-sm text-white/80 line-clamp-2">
                {lightbox.prompt}
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectImage(lightbox.imageUrl);
                  setLightbox(null);
                }}
                className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
              >
                Use this shot
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
