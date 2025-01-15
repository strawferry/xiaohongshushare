declare module 'react-speech-kit' {
  export interface UseSpeechSynthesisProps {
    text?: string;
    voice?: SpeechSynthesisVoice;
    rate?: number;
    pitch?: number;
    volume?: number;
  }

  export function useSpeechSynthesis(): {
    speak: (props: UseSpeechSynthesisProps) => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
  };
} 