"use client"
import { useEffect } from "react"
import confetti from "canvas-confetti"

export function ConfettiTrigger() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#3b82f6', '#ef4444', '#eab308']
    });
  }, []);

  return null;
}