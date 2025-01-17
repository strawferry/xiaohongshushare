'use client';

export function useClarity() {
  const trackEvent = (
    eventName: string,
    eventProperties?: { [key: string]: any }
  ) => {
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('event', eventName, eventProperties);
    }
  };

  const setCustomData = (
    key: string,
    value: string | number | boolean
  ) => {
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('set', key, value);
    }
  };

  return { trackEvent, setCustomData };
} 