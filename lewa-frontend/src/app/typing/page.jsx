"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Volume2, RotateCcw, ArrowRight } from "lucide-react"
import NavigationBar from "@/components/navigation"
import FooterSection from "@/components/footer"

const lessons = [
    {
        id: 1,
        language: "Geez",
        text: "ሰላም ለዓለም",
        translation: "Hello World",
    },
    {
        id: 2,
        language: "GACL",
        text: "Mbɔ̀lɔ́ àfúbɛ̀",
        translation: "Good morning",
    },
    {
        id: 3,
        language: "Shupamom",
        text: "Nǔ ŋwà'à",
        translation: "Welcome",
    },
    {
        id: 4,
        language: "Geez",
        text: "እንኳን ደህና መጣህ",
        translation: "Welcome to you",
    },
    {
        id: 5,
        language: "GACL",
        text: "Ǹdɛ̀ɛ̀ wà ǹjɔ̀ŋ",
        translation: "How are you",
    },
    {
        id: 6,
        language: "Shupamom",
        text: "ꚳꚨꚪ ꚮꚨ",
        translation: "Good day",
    },
    {
        id: 7,
        language: "Geez",
        text: "ጤና ይስጥልኝ",
        translation: "Greetings",
    },
    {
        id: 8,
        language: "GACL",
        text: "Àbɛ̀ɛ̀ wà",
        translation: "Thank you",
    },
]

export default function TypingPractice() {
    const [selectedLanguage, setSelectedLanguage] = useState("Geez")
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
    const [userInput, setUserInput] = useState("")
    const [startTime, setStartTime] = useState(null)
    const [isComplete, setIsComplete] = useState(false)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const inputRef = useRef(null)

    const filteredLessons = lessons.filter((lesson) => lesson.language === selectedLanguage)
    const currentLesson = filteredLessons[currentLessonIndex]

    useEffect(() => {
        inputRef.current?.focus()
    }, [currentLessonIndex, selectedLanguage])

    useEffect(() => {
        if (userInput.length === 1 && !startTime) {
            setStartTime(Date.now())
        }

        if (userInput === currentLesson.text) {
            setIsComplete(true)
            calculateMetrics()
        }
    }, [userInput, currentLesson.text, startTime])

    const calculateMetrics = () => {
        if (!startTime) return

        const timeElapsed = (Date.now() - startTime) / 1000 / 60
        const wordsTyped = currentLesson.text.split(" ").length
        const calculatedWpm = Math.round(wordsTyped / timeElapsed)

        let correctChars = 0
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === currentLesson.text[i]) {
                correctChars++
            }
        }
        const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100)

        setWpm(calculatedWpm)
        setAccuracy(calculatedAccuracy)
    }

    const handleReset = () => {
        setUserInput("")
        setStartTime(null)
        setIsComplete(false)
        setWpm(0)
        setAccuracy(100)
        inputRef.current?.focus()
    }

    const handleNextLesson = () => {
        if (currentLessonIndex < filteredLessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1)
            handleReset()
        } else {
            setCurrentLessonIndex(0)
            handleReset()
        }
    }

    const handlePronunciation = () => {
        const utterance = new SpeechSynthesisUtterance(currentLesson.text)
        utterance.lang = "en-US"
        utterance.rate = 0.8
        window.speechSynthesis.speak(utterance)
    }

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language)
        setCurrentLessonIndex(0)
        handleReset()
    }

    const getCharacterColor = (index) => {
        if (index >= userInput.length) {
            return "text-gray-500"
        }
        return userInput[index] === currentLesson.text[index] ? "text-white" : "text-red-500"
    }

    return (
        <>
            <NavigationBar />
            <div className="space-y-6 py-15 px-8 tracking-tight">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Typing Practice</h1>
                    <p className="text-muted-foreground">Practice your typing skills and improve your speed</p>
                </div>

                <div className="flex justify-center">
                    <div className="inline-flex gap-2 p-1.5 bg-muted/50 rounded-lg border border-border/50">
                        {(["Geez", "GACL", "Shupamom"]).map((lang) => (
                            <Button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                variant={selectedLanguage === lang ? "default" : "ghost"}
                                className={`px-6 py-2 text-sm font-medium transition-all ${selectedLanguage === lang
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {lang}
                            </Button>
                        ))}
                    </div>
                </div>

                <Card className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Language</p>
                            <p className="text-lg font-semibold">{currentLesson.language}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Lesson</p>
                            <p className="text-lg font-semibold">
                                {currentLessonIndex + 1} / {filteredLessons.length}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Translation</p>
                        <p className="text-base">{currentLesson.translation}</p>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-6 min-h-[120px] flex items-center justify-center">
                        <p className="text-3xl font-mono tracking-wide text-center leading-relaxed">
                            {currentLesson.text.split("").map((char, index) => (
                                <span key={index} className={getCharacterColor(index)}>
                                    {char}
                                </span>
                            ))}
                        </p>
                    </div>

                    <div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => !isComplete && setUserInput(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Start typing here..."
                            disabled={isComplete}
                        />
                    </div>

                    {isComplete && (
                        <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
                            <div className="flex items-center justify-around text-center">
                                <div>
                                    <p className="text-2xl font-bold text-teal-400">{wpm}</p>
                                    <p className="text-sm text-muted-foreground">WPM</p>
                                </div>
                                <div className="h-12 w-px bg-slate-700" />
                                <div>
                                    <p className="text-2xl font-bold text-teal-400">{accuracy}%</p>
                                    <p className="text-sm text-muted-foreground">Accuracy</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <Button onClick={handlePronunciation} variant="outline" className="gap-2 flex-1 min-w-[180px] bg-transparent">
                            <Volume2 className="h-4 w-4" />
                            Hear Pronunciation
                        </Button>
                        <Button onClick={handleReset} variant="outline" className="gap-2 flex-1 min-w-[140px] bg-transparent">
                            <RotateCcw className="h-4 w-4" />
                            Reset
                        </Button>
                        <Button onClick={handleNextLesson} className="gap-2 flex-1 min-w-[140px] bg-teal-600 hover:bg-teal-700">
                            Next Lesson
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>

                <div className="text-center text-sm text-muted-foreground">
                    <p>Type the text exactly as shown above. Characters will turn white when correct and red when incorrect.</p>
                </div>
            </div>
            <FooterSection />
        </>
    )
}
