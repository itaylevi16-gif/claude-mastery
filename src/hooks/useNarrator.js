import { useState, useEffect, useRef, useCallback } from 'react';

// Extract clean readable text from lesson sections
function extractText(sections) {
  const parts = [];
  sections.forEach(section => {
    switch (section.type) {
      case 'text':
        // Clean markdown bold markers and arrows
        parts.push(section.content
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/^[•\-→]\s*/gm, '')
        );
        break;
      case 'callout':
        parts.push('Heads up. ' + section.content
          .replace(/\*\*([^*]+)\*\*/g, '$1')
        );
        break;
      case 'code':
        if (section.label) parts.push(`Code example: ${section.label}.`);
        break;
      case 'diagram':
        if (section.title) parts.push(`Diagram: ${section.title}.`);
        break;
      default:
        break;
    }
  });
  return parts;
}

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Preferred: modern, natural-sounding English voices
  const preferred = [
    'Samantha',        // macOS/iOS — natural, young, American
    'Karen',           // macOS — Australian, fresh
    'Moira',           // macOS — Irish, distinctive
    'Tessa',           // macOS — South African, youthful
    'Nicky',           // macOS
    'Google US English',
    'Google UK English Female',
    'Microsoft Aria Online (Natural)',
    'Microsoft Jenny Online (Natural)',
    'Microsoft Sonia Online (Natural)',
    'Microsoft Aria - English (United States)',
  ];

  for (const name of preferred) {
    const v = voices.find(v => v.name === name);
    if (v) return v;
  }

  // Fall back to first en-US female-sounding voice
  const enUS = voices.filter(v => v.lang.startsWith('en'));
  return enUS[0] || voices[0];
}

export function useNarrator(lesson) {
  const [playing, setPlaying] = useState(false);
  const [currentPart, setCurrentPart] = useState(0);
  const [waitingForQuiz, setWaitingForQuiz] = useState(false);
  const [supported, setSupported] = useState(false);
  const partsRef = useRef([]);
  const stoppedRef = useRef(false);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Rebuild script when lesson changes
  useEffect(() => {
    if (!lesson) return;
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setCurrentPart(0);
    setWaitingForQuiz(false);
    stoppedRef.current = false;

    const textParts = extractText(lesson.content.sections);
    // Add quiz intro as final part before the quiz pause
    textParts.push('__QUIZ__');
    partsRef.current = textParts;
  }, [lesson?.id]);

  const speakPart = useCallback((index) => {
    const parts = partsRef.current;
    if (index >= parts.length || stoppedRef.current) {
      setPlaying(false);
      return;
    }

    const text = parts[index];

    if (text === '__QUIZ__') {
      setWaitingForQuiz(true);
      setCurrentPart(index);
      setPlaying(false);
      // Announce quiz
      const announce = new SpeechSynthesisUtterance("Okay, let's check your understanding. Take a moment to answer the question below.");
      announce.voice = pickVoice();
      announce.rate = 1.05;
      announce.pitch = 1.1;
      window.speechSynthesis.speak(announce);
      return;
    }

    setCurrentPart(index);
    const utterance = new SpeechSynthesisUtterance(text);

    const voice = pickVoice();
    if (voice) utterance.voice = voice;

    // Fresh, young, energetic delivery
    utterance.rate = 1.08;    // slightly faster than default — feels younger
    utterance.pitch = 1.12;   // slightly higher — fresher, more engaging
    utterance.volume = 1;

    utterance.onend = () => {
      if (!stoppedRef.current) {
        speakPart(index + 1);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted') {
        setPlaying(false);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const play = useCallback(() => {
    if (!supported) return;
    stoppedRef.current = false;
    window.speechSynthesis.cancel();

    // Add a brief intro before starting
    const intro = new SpeechSynthesisUtterance(
      `Let's go through this lesson together.`
    );
    const voice = pickVoice();
    if (voice) intro.voice = voice;
    intro.rate = 1.08;
    intro.pitch = 1.12;

    intro.onend = () => {
      setPlaying(true);
      speakPart(0);
    };

    window.speechSynthesis.speak(intro);
    setPlaying(true);
  }, [supported, speakPart]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setPlaying(false);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    window.speechSynthesis.cancel();
    setPlaying(false);
    setCurrentPart(0);
    setWaitingForQuiz(false);
  }, []);

  const continueAfterQuiz = useCallback(() => {
    setWaitingForQuiz(false);
    // Nothing to say after quiz — lesson is done
  }, []);

  return {
    supported,
    playing,
    waitingForQuiz,
    currentPart,
    totalParts: partsRef.current.length,
    play,
    pause,
    resume,
    stop,
    continueAfterQuiz,
  };
}
