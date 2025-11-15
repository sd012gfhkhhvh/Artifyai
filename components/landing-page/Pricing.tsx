"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { SignUpButton } from "@clerk/nextjs";

export const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12 md:mb-16"
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
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose the plan that works for you. No hidden fees, no subscriptions.
          Credits never expire.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {plans.map((plan, index) => {
          const isPopular = plan.name === "Pro Package";
          return (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl border p-8 bg-background/50 backdrop-blur-sm transition-all hover:shadow-2xl ${
                isPopular
                  ? "border-purple-500 shadow-lg shadow-purple-500/20 scale-105"
                  : "border-border/50"
              }`}
              variants={cardVariants}
              whileHover={{ y: -8, scale: isPopular ? 1.05 : 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price === 0 ? (
                    <span className="text-4xl md:text-5xl font-bold">Free</span>
                  ) : (
                    <>
                      <span className="text-2xl text-muted-foreground">$</span>
                      <span className="text-4xl md:text-5xl font-bold">
                        {(plan.price / 100).toFixed(0)}
                      </span>
                      <span className="text-2xl text-muted-foreground">
                        .{(plan.price % 100).toString().padStart(2, '0')}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.credits} Credits {plan.price > 0 && '• One-time payment'}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.inclusions.map((inclusion, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {inclusion.isIncluded ? (
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span
                      className={
                        inclusion.isIncluded
                          ? "text-sm"
                          : "text-sm text-muted-foreground/60"
                      }
                    >
                      {inclusion.label}
                    </span>
                  </li>
                ))}
              </ul>

              <SignUpButton mode="modal">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className={`w-full ${
                      isPopular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        : ""
                    }`}
                    variant={isPopular ? "default" : "outline"}
                  >
                    {plan.price === 0 ? "Get Started Free" : "Purchase Now"}
                  </Button>
                </motion.div>
              </SignUpButton>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="mt-12 text-center space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-sm text-muted-foreground">
          All plans include secure processing, instant results, and commercial usage rights.
        </p>
        <p className="text-xs text-muted-foreground">
          Credits never expire • No subscription required • Cancel anytime
        </p>
      </motion.div>
    </div>
  );
};
