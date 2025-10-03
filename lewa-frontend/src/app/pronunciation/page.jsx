"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import NavigationBar from "@/components/navigation"
import FooterSection from "@/components/footer"

const Language = "geez" | "gacl" | "shupamom"

// Sample alphabet data - you can expand this with real data
const languageData = {
    geez: {
        name: "Geez",
        about:
            "Geez is an ancient South Semitic language that originated in the northern region of Ethiopia. It is the liturgical language of the Ethiopian Orthodox Church and has a rich literary tradition spanning over two millennia.",
        alphabets: [
            { character: "ሀ", pronunciation: "/hä/" },
            { character: "ለ", pronunciation: "/lə/" },
            { character: "ሐ", pronunciation: "/ḥä/" },
            { character: "መ", pronunciation: "/mə/" },
            { character: "ሠ", pronunciation: "/śä/" },
            { character: "ረ", pronunciation: "/rə/" },
            { character: "ሰ", pronunciation: "/sə/" },
            { character: "ሸ", pronunciation: "/šə/" },
            { character: "ቀ", pronunciation: "/qə/" },
            { character: "በ", pronunciation: "/bə/" },
            { character: "ተ", pronunciation: "/tə/" },
            { character: "ቸ", pronunciation: "/čə/" },
            { character: "ኀ", pronunciation: "/ḫä/" },
            { character: "ነ", pronunciation: "/nə/" },
            { character: "ኘ", pronunciation: "/ñə/" },
            { character: "አ", pronunciation: "/ʾä/" },
            { character: "ከ", pronunciation: "/kə/" },
            { character: "ኸ", pronunciation: "/ḵä/" },
            { character: "ወ", pronunciation: "/wə/" },
            { character: "ዐ", pronunciation: "/ʿä/" },
        ],
    },
    gacl: {
        name: "GACL",
        about:
            "GACL (General Alphabet of Cameroon Languages) is a standardized writing system designed to represent the diverse languages of Cameroon. It provides a unified approach to transcribing the phonetic sounds found across multiple language families.",
        alphabets: [
            { character: "A", pronunciation: "/a/" },
            { character: "B", pronunciation: "/b/" },
            { character: "C", pronunciation: "/tʃ/" },
            { character: "D", pronunciation: "/d/" },
            { character: "E", pronunciation: "/e/" },
            { character: "Ə", pronunciation: "/ə/" },
            { character: "F", pronunciation: "/f/" },
            { character: "G", pronunciation: "/ɡ/" },
            { character: "H", pronunciation: "/h/" },
            { character: "I", pronunciation: "/i/" },
            { character: "J", pronunciation: "/dʒ/" },
            { character: "K", pronunciation: "/k/" },
            { character: "L", pronunciation: "/l/" },
            { character: "M", pronunciation: "/m/" },
            { character: "N", pronunciation: "/n/" },
            { character: "Ŋ", pronunciation: "/ŋ/" },
            { character: "O", pronunciation: "/o/" },
            { character: "Ɔ", pronunciation: "/ɔ/" },
            { character: "P", pronunciation: "/p/" },
            { character: "R", pronunciation: "/r/" },
        ],
    },
    shupamom: {
        name: "Shupamom",
        about:
            "Shupamom is a unique writing system developed for the Bamum people of Cameroon. Created in the early 20th century, it represents one of the few indigenous African scripts and showcases the rich cultural heritage of the region.",
        alphabets: [
            { character: "ꚠ", pronunciation: "/a/" },
            { character: "ꚡ", pronunciation: "/i/" },
            { character: "ꚢ", pronunciation: "/u/" },
            { character: "ꚣ", pronunciation: "/e/" },
            { character: "ꚤ", pronunciation: "/o/" },
            { character: "ꚥ", pronunciation: "/ə/" },
            { character: "ꚦ", pronunciation: "/pa/" },
            { character: "ꚧ", pronunciation: "/ta/" },
            { character: "ꚨ", pronunciation: "/ka/" },
            { character: "ꚩ", pronunciation: "/ma/" },
            { character: "ꚪ", pronunciation: "/na/" },
            { character: "ꚫ", pronunciation: "/ŋa/" },
            { character: "ꚬ", pronunciation: "/fa/" },
            { character: "ꚭ", pronunciation: "/sa/" },
            { character: "ꚮ", pronunciation: "/ʃa/" },
            { character: "ꚯ", pronunciation: "/la/" },
            { character: "ꚰ", pronunciation: "/ra/" },
            { character: "ꚱ", pronunciation: "/wa/" },
            { character: "ꚲ", pronunciation: "/ja/" },
            { character: "ꚳ", pronunciation: "/ɲa/" },
        ],
    },
}

export default function PronunciationLearning() {
    const [selectedLanguage, setSelectedLanguage] = useState("geez")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const currentData = languageData[selectedLanguage]
    const totalPages = Math.ceil(currentData.alphabets.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentAlphabets = currentData.alphabets.slice(startIndex, endIndex)

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language)
        setCurrentPage(1)
    }

    const handlePlaySound = (character) => {
        // Placeholder for audio playback functionality
        console.log(`Playing sound for: ${character}`)
    }

    return (
        <>
            <NavigationBar />
            <div className="space-y-8 py-10 px-8">
                <div className="flex justify-center">
                    <div className="inline-flex gap-2 p-1.5 bg-muted/50 rounded-lg border border-border/50">
                        {(["geez", "gacl", "shupamom"]).map((lang) => (
                            <Button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                variant={selectedLanguage === lang ? "default" : "ghost"}
                                className={`px-6 py-2 text-sm font-medium transition-all ${selectedLanguage === lang
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {languageData[lang].name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Content Card */}
                <Card className="bg-card border-border/50 shadow-sm">
                    <div className="p-8 space-y-8">
                        {/* About Section */}
                        <div className="space-y-3">
                            <h2 className="text-2xl font-light text-foreground">About {currentData.name}</h2>
                            <p className="text-muted-foreground leading-relaxed">{currentData.about}</p>
                        </div>

                        {/* Alphabet Sounds Title */}
                        <div className="pt-4">
                            <h3 className="text-xl font-light text-foreground mb-6">{currentData.name} Alphabet Sounds</h3>

                            {/* Alphabet Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {currentAlphabets.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="p-5 bg-muted/30 border-border/40 hover:border-primary/40 transition-colors"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            {/* Character */}
                                            <div className="text-4xl font-light text-foreground">{item.character}</div>

                                            {/* Pronunciation */}
                                            <div className="text-sm text-muted-foreground font-mono">{item.pronunciation}</div>

                                            {/* Play Button */}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handlePlaySound(item.character)}
                                                className="w-full h-8 text-xs hover:bg-primary/10 hover:text-primary"
                                            >
                                                <Play className="w-3.5 h-3.5 mr-1.5" />
                                                Play
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-border/50">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="h-9 px-4"
                                    >
                                        Previous
                                    </Button>
                                    <div className="flex items-center gap-2 px-4">
                                        <span className="text-sm text-muted-foreground">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="h-9 px-4"
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
            <FooterSection />
        </>
    )
}
