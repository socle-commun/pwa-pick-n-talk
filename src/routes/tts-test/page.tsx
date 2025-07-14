import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/actions";
import { speak, isSpeechSynthesisSupported } from "@/utilities/speak";
import cn from "@/utilities/cn";

export default function TTSTestPage() {
	const { i18n } = useTranslation();
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [status, setStatus] = useState("Click a button to test TTS");

	const handleSpeak = async (text: string, language: string) => {
		if (isSpeaking) return;

		setIsSpeaking(true);
		setStatus(`Speaking "${text}" in ${language}...`);

		try {
			await speak(text, language);
			setStatus(`Successfully started speech: "${text}"`);
		} catch (error) {
			setStatus(`Failed to speak: ${error instanceof Error ? error.message : "Unknown error"}`);
		} finally {
			setIsSpeaking(false);
		}
	};

	return (
		<div className={cn("p-8 space-y-6")}>
			<h1 className={cn("text-3xl font-bold text-zinc-900 dark:text-zinc-100")}>
				TTS Test Page
			</h1>

			<div className={cn("text-zinc-600 dark:text-zinc-400")}>
				Current language: {i18n.language}
			</div>

			<div className={cn("text-zinc-600 dark:text-zinc-400")}>
				TTS Support: {isSpeechSynthesisSupported() ? "✅ Supported" : "❌ Not supported"}
			</div>

			<div className={cn("space-y-4")}>
				<div className={cn("flex gap-4")}>
					<Button
						onClick={() => handleSpeak("Bonjour", "fr-FR")}
						disabled={isSpeaking}
						className={cn("flex items-center gap-2")}
						color="blue"
					>
						<SpeakerWaveIcon className={cn("size-5")} />
						Test French: "Bonjour"
					</Button>

					<Button
						onClick={() => handleSpeak("Hello", "en-US")}
						disabled={isSpeaking}
						className={cn("flex items-center gap-2")}
						color="green"
					>
						<SpeakerWaveIcon className={cn("size-5")} />
						Test English: "Hello"
					</Button>

					<Button
						onClick={() => handleSpeak("Pictogramme", i18n.language)}
						disabled={isSpeaking}
						className={cn("flex items-center gap-2")}
						color="purple"
					>
						<SpeakerWaveIcon className={cn("size-5")} />
						Test Current Language: "Pictogramme"
					</Button>
				</div>
			</div>

			<div className={cn(
				"p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800",
				"border border-zinc-200 dark:border-zinc-700"
			)}>
				<div className={cn("font-medium text-zinc-900 dark:text-zinc-100 mb-2")}>
					Status:
				</div>
				<div className={cn("text-zinc-700 dark:text-zinc-300")}>
					{status}
				</div>
			</div>

			{/* Mock Pictogram Card for Testing */}
			<div className={cn("space-y-4")}>
				<h2 className={cn("text-xl font-semibold text-zinc-900 dark:text-zinc-100")}>
					Mock Pictogram Card Test
				</h2>
				<div className={cn(
					"flex flex-col items-center p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md",
					"border border-zinc-200 dark:border-zinc-700 w-48"
				)}>
					<div className={cn("w-24 h-24 mb-3 flex items-center justify-center")}>
						<div className={cn(
							"w-full h-full bg-zinc-100 dark:bg-zinc-700 rounded-md",
							"flex items-center justify-center text-zinc-400"
						)}>
							🏠
						</div>
					</div>
					<div className={cn("text-lg font-medium text-center mb-2 text-zinc-900 dark:text-zinc-100")}>
						Maison
					</div>
					<Button
						onClick={() => handleSpeak("Maison", i18n.language)}
						disabled={isSpeaking}
						className={cn(
							"p-2 rounded-full",
							"hover:scale-105 active:scale-95 transition-transform duration-150"
						)}
						color="blue"
						plain
					>
						<SpeakerWaveIcon className={cn("size-5")} />
						<span className={cn("sr-only")}>
							Speak "Maison"
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}