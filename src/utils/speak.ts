/**
 * Text-to-Speech utility using Web Speech API
 * Provides text reading functionality with language support
 */

/**
 * Speaks the given text using the Web Speech API
 * @param text - The text to speak
 * @param language - The language code (e.g., "fr-FR", "en-US")
 * @returns Promise that resolves when speech starts or rejects on error
 */
export function speak(text: string, language: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if the browser supports speech synthesis
    if (!("speechSynthesis" in window)) {
      const error = new Error("Speech synthesis not supported in this browser");
      console.error("TTS Error:", error);
      reject(error);
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Set up event handlers
    utterance.onstart = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      const error = new Error(`Speech synthesis error: ${event.error}`);
      console.error("TTS Error:", error);
      reject(error);
    };

    utterance.onend = () => {
      // Speech completed successfully
    };

    // Start speaking
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("TTS Error:", error);
      reject(error);
    }
  });
}

/**
 * Checks if text-to-speech is available in the current browser
 * @returns boolean indicating if TTS is supported
 */
export function isSpeechSynthesisSupported(): boolean {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

/**
 * Gets available voices for a specific language
 * @param language - The language code to filter voices
 * @returns Array of available voices for the language
 */
export function getVoicesForLanguage(language: string): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) {
    return [];
  }

  return window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.startsWith(language.split("-")[0]));
}

/**
 * Stops any ongoing speech
 */
export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
