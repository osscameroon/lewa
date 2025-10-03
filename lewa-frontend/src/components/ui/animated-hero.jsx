"use client"

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AudioLinesIcon, KeyboardIcon, Lamp, Lightbulb, LucideSpeaker, MonitorSpeaker, MoveRight, PhoneCall, Speaker, SpeakerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Alphabets", "Scripts", "Writing Systems"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div
          className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-2">
              Read, Write, and Learn<Lightbulb className="w-5 h-5" color="gold" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1
              className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular pb-3">
              <span className="text-spektr-cyan-50">Learn African</span>
              <span
                className="relative flex w-full justify-center overflow-hidden text-center md:pb-5 md:pt-1 pb-2">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }>
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Rediscover your heritage through GACL, Ge’ez, and other African writing systems, and learn the scripts that shaped communication across generations.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href='/typing'>
              <Button size="lg" className="gap-2 cursor-pointer" variant="outline">
                <KeyboardIcon className="w-6 h-6" />Start Typing Practice
              </Button>
            </Link>
            <Link href='/pronunciation'>
              <Button size="lg" className="gap-2 cursor-pointer">
                <AudioLinesIcon className="w-6 h-6" />Learn Pronunciation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
