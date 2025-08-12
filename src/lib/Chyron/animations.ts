/**
 * Advanced animation system for Chyron components
 */

import { gsap } from 'gsap';

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
  stagger?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  direction: 'left' | 'right';
  speed: number;
  loop: boolean;
}

export interface FadeAnimationConfig extends AnimationConfig {
  fadeIn: boolean;
  fadeOut: boolean;
}

export const defaultAnimations = {
  scroll: {
    duration: 60,
    ease: 'none',
    direction: 'left' as const,
    speed: 1,
    loop: true,
  },
  fade: {
    duration: 0.5,
    ease: 'power2.out',
    fadeIn: true,
    fadeOut: false,
  },
  bounce: {
    duration: 0.6,
    ease: 'bounce.out',
    delay: 0,
    stagger: 0.1,
  },
  slide: {
    duration: 0.8,
    ease: 'power2.out',
    delay: 0,
    stagger: 0.05,
  },
};

/**
 * Creates a scrolling animation for headlines
 */
export function createScrollAnimation(
  element: HTMLElement,
  config: Partial<ScrollAnimationConfig> = {}
): gsap.core.Timeline {
  const finalConfig = { ...defaultAnimations.scroll, ...config };
  
  const timeline = gsap.timeline({ repeat: finalConfig.loop ? -1 : 0 });
  
  timeline.to(element, {
    x: finalConfig.direction === 'left' ? '-50%' : '50%',
    duration: finalConfig.duration,
    ease: finalConfig.ease,
    delay: finalConfig.delay || 0,
  });
  
  return timeline;
}

/**
 * Creates a fade animation for elements
 */
export function createFadeAnimation(
  element: HTMLElement,
  config: Partial<FadeAnimationConfig> = {}
): gsap.core.Timeline {
  const finalConfig = { ...defaultAnimations.fade, ...config };
  
  const timeline = gsap.timeline();
  
  if (finalConfig.fadeIn) {
    timeline.fromTo(
      element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: finalConfig.duration,
        ease: finalConfig.ease,
        delay: finalConfig.delay || 0,
      }
    );
  }
  
  if (finalConfig.fadeOut) {
    timeline.to(element, {
      opacity: 0,
      y: -20,
      duration: finalConfig.duration,
      ease: finalConfig.ease,
      delay: finalConfig.delay || 0,
    });
  }
  
  return timeline;
}

/**
 * Creates a bounce animation for breaking news
 */
export function createBounceAnimation(
  elements: HTMLElement[],
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline {
  const finalConfig = { ...defaultAnimations.bounce, ...config };
  
  const timeline = gsap.timeline();
  
  timeline.fromTo(
    elements,
    { scale: 0, rotation: -180 },
    {
      scale: 1,
      rotation: 0,
      duration: finalConfig.duration,
      ease: finalConfig.ease,
      delay: finalConfig.delay || 0,
      stagger: finalConfig.stagger || 0,
    }
  );
  
  return timeline;
}

/**
 * Creates a slide animation for elements
 */
export function createSlideAnimation(
  elements: HTMLElement[],
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline {
  const finalConfig = { ...defaultAnimations.slide, ...config };
  
  const timeline = gsap.timeline();
  
  let startProps: gsap.TweenVars = {};
  let endProps: gsap.TweenVars = {};
  
  switch (direction) {
    case 'up':
      startProps = { y: 50, opacity: 0 };
      endProps = { y: 0, opacity: 1 };
      break;
    case 'down':
      startProps = { y: -50, opacity: 0 };
      endProps = { y: 0, opacity: 1 };
      break;
    case 'left':
      startProps = { x: 50, opacity: 0 };
      endProps = { x: 0, opacity: 1 };
      break;
    case 'right':
      startProps = { x: -50, opacity: 0 };
      endProps = { x: 0, opacity: 1 };
      break;
  }
  
  timeline.fromTo(
    elements,
    startProps,
    {
      ...endProps,
      duration: finalConfig.duration,
      ease: finalConfig.ease,
      delay: finalConfig.delay || 0,
      stagger: finalConfig.stagger || 0,
    }
  );
  
  return timeline;
}

/**
 * Creates a typing animation for text
 */
export function createTypingAnimation(
  element: HTMLElement,
  text: string,
  speed: number = 50
): gsap.core.Timeline {
  const timeline = gsap.timeline();
  
  // Clear the element
  element.textContent = '';
  
  // Split text into characters
  const characters = text.split('');
  
  timeline.to(element, {
    duration: characters.length * (speed / 1000),
    ease: 'none',
    onUpdate: function() {
      const progress = this.progress();
      const charIndex = Math.floor(progress * characters.length);
      element.textContent = characters.slice(0, charIndex).join('');
    },
  });
  
  return timeline;
}

/**
 * Creates a pulse animation for attention
 */
export function createPulseAnimation(
  element: HTMLElement,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline {
  const finalConfig = { ...defaultAnimations.fade, ...config };
  
  const timeline = gsap.timeline({ repeat: -1, yoyo: true });
  
  timeline.to(element, {
    scale: 1.1,
    duration: finalConfig.duration,
    ease: finalConfig.ease,
  });
  
  return timeline;
}

/**
 * Pauses all animations
 */
export function pauseAnimations(): void {
  gsap.globalTimeline.pause();
}

/**
 * Resumes all animations
 */
export function resumeAnimations(): void {
  gsap.globalTimeline.resume();
}

/**
 * Kills all animations
 */
export function killAnimations(): void {
  gsap.killTweensOf('*');
}

/**
 * Creates a smooth scroll animation
 */
export function smoothScrollTo(
  element: HTMLElement,
  target: number,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline {
  const finalConfig = { ...defaultAnimations.slide, ...config };
  
  return gsap.to(element, {
    scrollLeft: target,
    duration: finalConfig.duration,
    ease: finalConfig.ease,
  });
}

/**
 * Creates a morphing animation between two elements
 */
export function createMorphAnimation(
  fromElement: HTMLElement,
  toElement: HTMLElement,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline {
  const finalConfig = { ...defaultAnimations.slide, ...config };
  
  const timeline = gsap.timeline();
  
  // Get the positions and dimensions
  const fromRect = fromElement.getBoundingClientRect();
  const toRect = toElement.getBoundingClientRect();
  
  // Create a clone for morphing
  const morphElement = fromElement.cloneNode(true) as HTMLElement;
  morphElement.style.position = 'absolute';
  morphElement.style.top = `${fromRect.top}px`;
  morphElement.style.left = `${fromRect.left}px`;
  morphElement.style.width = `${fromRect.width}px`;
  morphElement.style.height = `${fromRect.height}px`;
  document.body.appendChild(morphElement);
  
  // Animate the morph
  timeline.to(morphElement, {
    top: toRect.top,
    left: toRect.left,
    width: toRect.width,
    height: toRect.height,
    duration: finalConfig.duration,
    ease: finalConfig.ease,
    onComplete: () => {
      document.body.removeChild(morphElement);
    },
  });
  
  return timeline;
}
