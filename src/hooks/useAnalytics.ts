'use client';

export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    eventParams?: { [key: string]: any }
  ) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventParams);
    }
  };

  return { trackEvent };
} 