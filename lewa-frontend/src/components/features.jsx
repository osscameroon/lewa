import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

import { Headphones, KeyboardIcon, TrophyIcon } from "lucide-react";

const features = [
    {
        Icon: Headphones,
        name: "Pronunciation Guides",
        description:
            "Audio examples from native speakers to perfect your accent.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/images/writing-pattern.svg"
                className="absolute -right-20 -top-20 opacity-60"
                alt=""
            />
        ),
        className:
            "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 bg-green-50/30",
    },
    {
        Icon: KeyboardIcon,
        name: "Typing Practice",
        description: "Interactive exercises to master writing systems.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/images/lines-pattern.svg"
                className="absolute -right-20 -top-20 opacity-60"
                alt=""
            />
        ),
        className:
            "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 bg-blue-50/30",
    },
    {
        Icon: TrophyIcon,
        name: "Competitions",
        description:
            "Compete in typing speed and pronunciation challenges.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/images/dot-pattern.svg"
                className="absolute -right-20 -top-20 opacity-60"
                alt=""
            />
        ),
        className:
            "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 bg-red-50/30",
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Track key learning dates, writing sessions, and deadlines.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/images/calendar-bg.svg"
                className="absolute -right-20 -top-20 opacity-60"
                alt=""
            />
        ),
        className:
            "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 bg-yellow-50/30",
    },
    {
        Icon: BellIcon,
        name: "Notifications",
        description:
            "Receive alerts when new lessons, scripts, or exercises are added.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/images/notification-bg.svg"
                className="absolute -right-20 -top-20 opacity-60"
                alt=""
            />
        ),
        className:
            "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4 bg-gray-50",
    },
];

export default function FeatureSection() {
    return (
        <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}
