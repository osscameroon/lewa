import { ContainerScroll, CardSticky } from "@/components/blocks/cards-stack"
import { BadgeDollarSign, DollarSignIcon, Handshake } from "lucide-react";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const PROCESS_PHASES = [
    {
        id: "about-1",
        title: "What is a writing system?",
        description:
            "A writing system is a method of visually representing language using symbols. These symbols—letters, characters, or signs—stand for the sounds, words, or meanings of spoken language, allowing people to read, write, and record communication.",
    },
    {
        id: "about-2",
        title: "Why African Writing Systems Matters",
        description:
            "Unlike French/English alphabets, African writing systems captures unique sounds like ɓ, ɛ, ɔ, ŋ, ensuring correct pronunciation and preserving linguistic heritage. Used in education, literature, and media. Adapted to African languages.",
    },
    {
        id: "about-3",
        title: "More Than a Writing Systems",
        description: `
            African scripts carry ancestral knowledge, proverbs, and oral traditions in their true form—free from colonial distortions—while fostering cultural identity and promoting unity in diversity through "vivre ensemble" (living together).
        `,

    },
    {
        id: "about-4",
        title: "To make African writing systems accessible, practical, and engaging. For everyday use.",
        description:
            "We make learning engaging through gamified experiences like typing races and pronunciation challenges, enriched with native audio from language experts, and strengthened by a community where learners compete and collaborate.",
    },
]


const About = () => {
    return (
        <div className=" min-h-svh place-content-center px-6 text-stone-900 xl:px-12 pb-20">
            <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
                <div className="left-0 top-0 md:sticky md:h-svh py-10 md:py-12">
                    <h5 className=" text-xs uppercase tracking-wide">ABOUT LEWA</h5>
                    <h2 className="mb-6 mt-4 text-4xl lg:text-6xl font-bold tracking-tighter">
                        Preserving African Languages{" "}
                        <span className="text-green-600">Writing Systems.</span>
                    </h2>
                    <p className="max-w-prose text-sm lg:text-lg">
                        Our journey begins with a deep dive into your vision. In the
                        Discovery phase, we engage in meaningful conversations to grasp your
                        brand identity, goals, and the essence you want to convey. This
                        phase sets the stage for all that follows.
                    </p>
                </div>
                <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
                    {PROCESS_PHASES.map((phase, index) => (
                        <CardSticky
                            key={phase.id}
                            index={index + 2}
                            className="rounded-2xl border p-8 shadow-md backdrop-blur-md"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="my-6 text-2xl font-bold tracking-tighter">
                                    {phase.title}
                                </h2>
                                <h3 className="text-2xl font-bold text-green-600">
                                    {String(index + 1).padStart(2, "0")}
                                </h3>
                            </div>

                            <p className="text-foreground whitespace-pre-line">{phase.description}</p>
                        </CardSticky>
                    ))}
                </ContainerScroll>
            </div>
            <div className="container w-full my-20 shadow-lg rounded-2xl p-10 border-gray-50/50 bg-gray-50/50">
                <div className="flex items-center justify-center pt-10 gap-3">
                    <Handshake className="w-10 h-10" />
                    <h1 className="font-bold tracking-tight text-4xl">Contribution</h1>
                </div>
                <p className="text-center pt-3 font-semibold text-gray-500 tracking-tighter text-xl">Your contribution will help us to support and improve the platform.</p>
                <div className="flex items-center justify-center py-10 gap-3 tracking-tight">
                    <Button className="text-lg bg-green-600 hover:bg-green-700"><BadgeDollarSign className="mr-2" />Make a donation</Button>
                    <Button className="text-lg"><GitHubLogoIcon className="mr-2" />Make a donation</Button>
                </div>
            </div>

        </div>
    )
}

export default About;