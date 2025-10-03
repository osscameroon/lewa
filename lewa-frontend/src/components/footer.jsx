import { Hexagon, Github, Twitter, BookIcon, LanguagesIcon } from "lucide-react"
import { Footer } from "@/components/ui/footer"

export default function FooterSection() {
    return (
        <div className="w-full">
            <Footer
                logo={<LanguagesIcon className="h-10 w-10" />}
                brandName="LEWA"
                socialLinks={[
                    {
                        icon: <Twitter className="h-5 w-5" />,
                        href: "https://twitter.com",
                        label: "Twitter",
                    },
                    {
                        icon: <Github className="h-5 w-5" />,
                        href: "https://github.com",
                        label: "GitHub",
                    },
                ]}
                mainLinks={[
                    { href: "/home", label: "Home" },
                    { href: "/about", label: "About" },
                    { href: "/languages", label: "Languages" },
                ]}
                legalLinks={[
                    { href: "/privacy", label: "Privacy" },
                    { href: "/terms", label: "Terms" },
                ]}
                copyright={{
                    text: "© 2025 LEWA",
                    license: "All rights reserved",
                }}
            />
        </div>
    )
}
