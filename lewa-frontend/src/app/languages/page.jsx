import FooterSection from "@/components/footer";
import { LanguagesDetail } from "@/components/languages-detail";
import NavigationBar from "@/components/navigation";

export default function LanguagesPage() {
    return (
        <>
            <NavigationBar />
            <LanguagesDetail />
            <FooterSection />
        </>
    )
}