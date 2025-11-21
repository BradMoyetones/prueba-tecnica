import { Geist, Geist_Mono, Onest } from "next/font/google";
import { cn } from "./utils";

const onest = Onest({
    variable: "--font-onest",
    subsets: ["latin"]
})

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const fontVariables = cn(
    geistSans.variable,
    geistMono.variable,
    onest.variable,
)