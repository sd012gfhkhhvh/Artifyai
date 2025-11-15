"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Artify AI?",
    answer:
      "Artify AI is an advanced AI-powered image editing platform that allows you to transform, enhance, and perfect your images with ease. Our tools include background removal, object removal, image restoration, generative fill, and much more.",
  },
  {
    question: "How does the credit system work?",
    answer:
      "Each AI transformation consumes credits. You start with 20 free credits upon signing up. You can purchase additional credits through our Pro ($5.99 for 120 credits) or Premium ($19.99 for 2000 credits) packages. Credits never expire.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support all major image formats including JPG, JPEG, PNG, WEBP, HEIC, and more. You can export your edited images in PNG, JPG, or WEBP formats with customizable quality settings.",
  },
  {
    question: "How long does it take to process an image?",
    answer:
      "Most transformations are completed within 3-10 seconds depending on the complexity and size of the image. Background removal and simple edits are typically instant, while complex restorations may take a bit longer.",
  },
  {
    question: "Can I use Artify AI for commercial purposes?",
    answer:
      "Yes! All images you create or edit with Artify AI can be used for commercial purposes. You retain full ownership and rights to your edited images. Perfect for e-commerce, marketing, and professional photography.",
  },
  {
    question: "Is there a limit to image size?",
    answer:
      "Free users can upload images up to 10MB and 4000x4000 pixels. Pro and Premium users can upload images up to 25MB and 8000x8000 pixels. We automatically optimize large images while maintaining quality.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "We don't have subscriptions - you purchase credits as needed. Credits never expire, so you can use them whenever you want. This gives you complete flexibility without recurring charges.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy with your purchase within 7 days and haven't used more than 10% of your credits, we'll provide a full refund, no questions asked.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption for all uploads and storage. Your images are automatically deleted from our servers after 30 days. We never share your data with third parties or use your images for training.",
  },
  {
    question: "Can I batch process multiple images?",
    answer:
      "Yes! Pro and Premium users have access to batch processing, allowing you to apply the same transformation to multiple images simultaneously. This is perfect for e-commerce product photos or large photo collections.",
  },
];

export const FAQ = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Everything you need to know about Artify AI
        </motion.p>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-background/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base md:text-lg font-semibold pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
      
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-4">Still have questions?</p>
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          Contact our support team
          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </motion.svg>
        </motion.a>
      </motion.div>
    </div>
  );
};
