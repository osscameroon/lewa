import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, Type, Users, MapPin, Ear, EarIcon } from "lucide-react";
import { LetterCaseCapitalizeIcon } from "@radix-ui/react-icons";

export function LanguagesDetail() {
    const languages = [
        {
            flag: '/cameroon.jpeg',
            name: "Ewondo",
            language_family: "Bantu Language",
            speakers: "1.2 million",
            description:
                "Ewondo or Beti is a Bantu language spoken by the Beti people of Cameroon. Dialects include Badjia, Bafeuk, Bemvele, Bane, Beti, Enoah, Evouzom, Mbida-Bani, Mvete, Mvog-Niengue, Omvang, Yabekolo, Yabeka, and Yabekanga.",
            writing_systems: ["Latin Script"],
            learning_options: ["Learn to Speak", "Listen", "Learn to Type", "Read"],
            geographic_info:
                "Ewondo speakers live primarily in Cameroon's Centre Region and the northern part of the Océan division in the South Region.",
        },
        {
            name: 'Bamun',
            language_family: 'One of Benue-Congo languages of Cameroon',
            speakers: '215,000',
            flag: '/cameroon.jpeg',
            description: 'Bamun (also known as Bamoun, Mum, Shüpamom, and Chupamom) is a language spoken by the Bamun people in the West Region of Cameroon. It belongs to the Benue-Congo branch of the Niger-Congo language family. The Bamun language has its own unique script called the Bamum script, which was created in the late 19th century by Sultan Ibrahim Njoya. The script is an important part of Bamun cultural heritage and is still used for ceremonial purposes today.',
            writing_systems: ['Bamum Script', 'Latin Script'],
            learning_options: ['Learn to Speak', 'Listen', 'Learn to Type', 'Read'],
            geographic_info: 'The Bamun people primarily inhabit the Noun Division in the West Region of Cameroon, particularly around the town of Foumban, which is considered the cultural and historical center of the Bamun kingdom.'
        },
        {
            name: 'Amharic',
            language_family: 'Semitic language of Ethiopia',
            speakers: '32 million',
            flag: '/ethiopia.jpeg',
            description: 'Amharic is a Semitic language spoken primarily in Ethiopia, where it serves as the official working language of the federal government. It is the second-most spoken Semitic language in the world after Arabic. Amharic has its own unique script called the Ge\'ez script, which is an abugida used for several languages in Ethiopia and Eritrea.',
            writing_systems: ['Ge\'ez Script'],
            learning_options: ['Learn to Speak', 'Listen', 'Learn to Type', 'Read'],
            geographic_info: 'Amharic is predominantly spoken in the central highlands of Ethiopia, including the capital city, Addis Ababa, and surrounding regions such as Amhara, Oromia, and parts of Tigray and Afar.'
        },
        {
            name: 'Feʼfeʼ',
            language_family: 'Bantu language of Cameroon',
            speakers: '140,000',
            flag: '/cameroon.jpeg',
            description: 'Fe\'fe\' (also known as Fefe, Nufi, and Bafang) is a Bantu language spoken by the Bamileke people in the West Region of Cameroon. It is part of the larger Niger-Congo language family and is closely related to other Bamileke languages. Fe\'fe\' has several dialects, including Bafang, Bandjoun, and Bangangte.',
            writing_systems: ['Latin Script'],
            learning_options: ['Learn to Speak', 'Listen', 'Learn to Type', 'Read'],
            geographic_info: 'Fe\'fe\' is primarily spoken in the West Region of Cameroon, particularly in the departments of Haut-Nkam and Mifi, including towns such as Bafang, Bandjoun, and Bangangte.'
        }
    ];

    return (
        <>
            <h1 className="text-center font-bold tracking-tighter text-6xl py-10">African Languages</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
                {languages.map((language, index) => (
                    <Card
                        key={index}
                        className="bg-card border-border/50 shadow-lg"
                    >
                        {/* Header Section */}
                        <div className="p-6 sm:p-8 pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6">
                                {/* Flag */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={language.flag}
                                        alt={`${language.name} Flag`}
                                        className="w-20 h-12 sm:w-16 sm:h-12 rounded-md object-cover shadow-sm border border-border/30"
                                    />
                                </div>

                                {/* Language Info */}
                                <div className="flex-1">
                                    <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-2 tracking-tight">
                                        {language.name}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                                        <Badge variant="secondary" className="text-sm font-medium">
                                            {language.language_family}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                            <Users className="w-4 h-4" />
                                            <span>{language.speakers}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                <p className="text-foreground/90 leading-relaxed text-base">
                                    {language.description}
                                </p>
                            </div>
                        </div>

                        {/* Geographic Information */}
                        <div className="px-6 sm:px-8 pb-6">
                            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/30">
                                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-foreground mb-1">
                                        Geographic Distribution
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {language.geographic_info}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="px-6 sm:px-8 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Writing Systems */}
                                <div className="p-4 bg-secondary/20 rounded-lg border border-border/30">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Type className="w-5 h-5" />
                                        <h3 className="font-medium text-foreground">Writing Systems</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {language.writing_systems.map((system, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {system}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Learning Options */}
                                <div className="p-4 bg-accent/20 rounded-lg border border-border/30">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Volume2 className="w-5 h-5 " />
                                        <h3 className="font-medium text-foreground">Learning Options</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs h-7 bg-transparent"
                                        >
                                            <Volume2 className="w-4 h-4 mr-1" /> Learn to Speak / <EarIcon className="w-4 h-4 mr-1" /> Listen
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs h-7 bg-transparent"
                                        >
                                            <LetterCaseCapitalizeIcon className="w-4 h-4 mr-1" /> Learn to Type / <Volume2 className="w-4 h-4 mr-1 ml-1" /> Read
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}
