import React from "react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export const ProductDemoVideo = () => {
  return (
    <div className="relative h-[50vh] md:h-[80vh] w-full mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
      <div className="relative h-full w-full aspect-auto rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
        <HeroVideoDialog
          className="flex items-center justify-center h-full"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I"
          thumbnailSrc="https://webinarninja.com/solutions/product-demos/img/why-use-demo.png"
          thumbnailAlt="Dummy Video Thumbnail"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">AI Generated</span>
          </div>
          <p className="text-white/90 text-xs md:text-sm font-light">
            Created in seconds with Artify AI
          </p>
        </div>
      </div>
    </div>
  );
};
