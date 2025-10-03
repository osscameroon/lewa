import * as React from "react";
import { CashbackPartnersCard, Partner } from "@/components/ui/card-1";
import FeatureSection from "./features";
import { LanguagesIcon } from "lucide-react";

// --- Logo Components using external SVG URLs ---
const GoogleLogo = () => (
    <img src="https://svgl.app/library/google.svg" alt="Google logo" className="h-6 w-6" />
);

const AppleLogo = () => (
    <img src="https://svgl.app/library/n8n.svg" alt="Apple logo" className="h-7 w-7" />
);

const Slack = () => (
    <img src="https://svgl.app/library/slack.svg" alt="Mailchimp logo" className="h-7 w-7" />
);

const FigmaLogo = () => (
    <img src="https://svgl.app/library/figma.svg" alt="Figma logo" className="h-7 w-7" />
);


// --- Demo Component ---
const LanguageSection = () => {
    const partnersData = [
        {
            name: "Duala",
            cashback: "Cameroon",
            logo: <LanguagesIcon />,
            href: "#",
        },
        {
            name: "Ewondo",
            cashback: "Cameroon",
            logo: <LanguagesIcon />,
            href: "#",
        },
        {
            name: "Fula",
            cashback: "West Africa",
            logo: <LanguagesIcon />,
            href: "#",
        },
    ];

    return (
        <>
            <h2 className="text-5xl text-center md:text-6xl font-medium text-gray-900 tracking-tight pb-15">
                Select a Language
            </h2>
            <div className="flex w-full items-center justify-center bg-background p-4">

                <CashbackPartnersCard
                    title="From different parts of Africa"
                    partners={partnersData}
                />
            </div>
        </>
    );
};

export default LanguageSection;