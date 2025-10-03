"use client"

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

/**
 * A responsive, theme-adaptive card component to display cashback partners.
 * Features a grid layout and subtle animations on load.
 */
export const CashbackPartnersCard = ({
  title,
  partners,
  viewAllHref = "#",
  className
}) => {
  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for each partner item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}>
      {/* Card Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <a
          href={viewAllHref}
          aria-label="View all partners"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted">
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
      {/* Partners Grid */}
      <motion.ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {partners.map((partner, index) => (
          <motion.li key={index} variants={itemVariants}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full border border-border bg-transparent p-3 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent hover:shadow-md">
              {/* Partner Logo */}
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted/50">
                {partner.logo}
              </div>
              {/* Partner Info */}
              <div>
                <p className="font-medium text-card-foreground">{partner.name}</p>
                <p className="text-sm text-muted-foreground">{`${partner.cashback}`}</p>
              </div>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};