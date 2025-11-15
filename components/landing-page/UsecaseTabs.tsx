"use client";

import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export function UsecaseTabs({ className }: { className?: string }) {
  const tabs = [
    {
      title: "Photography",
      value: "photography",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-violet-900">
          <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10 h-full">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <motion.div 
                className="inline-block w-fit px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                Professional Photography
              </motion.div>
              <motion.h3 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Enhance Your Portrait & Landscape Photos
              </motion.h3>
              <motion.p 
                className="text-white/90 text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Perfect for photographers who want to restore old photos, remove
                unwanted objects, enhance colors, and create stunning visuals for
                their portfolio or clients.
              </motion.p>
              <ul className="space-y-3 text-sm md:text-base text-white">
                {[
                  "Restore vintage & damaged photos",
                  "Remove tourists from landscapes",
                  "Enhance portrait details",
                  "Professional color grading",
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.4 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Right Image Section */}
            <motion.div 
              className="relative h-[300px] lg:h-full min-h-[250px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&h=800&fit=crop"
                alt="Professional photography equipment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "E-commerce",
      value: "ecommerce",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-900">
          <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10 h-full">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="inline-block w-fit px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white font-medium">
                Online Stores
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Perfect Product Images That Sell
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Remove backgrounds, create consistent product shots, and enhance
                your product images to boost sales and create a professional
                online store presence.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-white">
                {[
                  "Remove & replace backgrounds",
                  "Consistent white backgrounds",
                  "Enhance product colors & details",
                  "Batch process multiple images",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right Image Section */}
            <div className="relative h-[300px] lg:h-full min-h-[250px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=800&fit=crop"
                alt="E-commerce product photography"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Social Media",
      value: "social-media",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-pink-700 via-pink-800 to-rose-900">
          <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10 h-full">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="inline-block w-fit px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white font-medium">
                Content Creators
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Create Viral-Worthy Content
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Stand out on Instagram, TikTok, and other platforms with
                eye-catching visuals. Remove distractions, enhance colors, and
                create professional content that gets engagement.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-white">
                {[
                  "Remove photo bombers instantly",
                  "Perfect selfie enhancements",
                  "Create consistent feed aesthetics",
                  "Quick edits for stories & reels",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right Image Section */}
            <div className="relative h-[300px] lg:h-full min-h-[250px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop"
                alt="Social media content creation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Marketing",
      value: "marketing",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-orange-700 via-orange-800 to-amber-900">
          <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10 h-full">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="inline-block w-fit px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white font-medium">
                Marketing Teams
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Professional Marketing Materials
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Create compelling ad creatives, banners, and promotional materials
                at scale. Perfect for agencies and marketing teams who need fast,
                professional results.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-white">
                {[
                  "Create ad variations quickly",
                  "Brand-consistent visuals",
                  "A/B test different backgrounds",
                  "Scale creative production",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right Image Section */}
            <div className="relative h-[300px] lg:h-full min-h-[250px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop"
                alt="Marketing team collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Real Estate",
      value: "real-estate",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900">
          <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10 h-full">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="inline-block w-fit px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white font-medium">
                Real Estate Professionals
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Showcase Properties at Their Best
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Enhance property photos, remove clutter, improve lighting, and
                create stunning listings that attract more buyers and close deals
                faster.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-white">
                {[
                  "Remove furniture & clutter",
                  "Enhance lighting & colors",
                  "Virtual staging options",
                  "Professional HDR effects",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right Image Section */}
            <div className="relative h-[300px] lg:h-full min-h-[250px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop"
                alt="Modern real estate interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Personal",
      value: "personal",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900">
          <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10 h-full">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="inline-block w-fit px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white font-medium">
                Personal Use
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Preserve & Perfect Your Memories
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Restore family photos, enhance vacation pictures, create perfect
                profile photos, and turn your cherished memories into works of
                art.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-white">
                {[
                  "Restore old family photos",
                  "Perfect vacation memories",
                  "Remove unwanted elements",
                  "Create profile pictures",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right Image Section */}
            <div className="relative h-[300px] lg:h-full min-h-[250px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop"
                alt="Family photo memories"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={cn(
        "h-[30rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40",
        className
      )}
    >
      <Tabs tabs={tabs} />
    </div>
  );
}
