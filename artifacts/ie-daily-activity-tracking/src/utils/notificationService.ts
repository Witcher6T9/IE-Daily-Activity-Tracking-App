/**
 * Web Push Notification & Audible Floor Chime Service
 */

// Simple synthesized Web Audio chime for factory floor feedback
export function playChimeSound(type: 'alert' | 'success' | 'urgent' = 'alert') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'urgent') {
      // Rapid double high beep
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'success') {
      // Friendly upward two-tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.12); // E5
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      // Standard gentle chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch {
    // Audio context not allowed without interaction or unsupported
  }
}

export function playIEAudioChime(type: 'alert' | 'success' | 'urgent' | 'chime' = 'chime') {
  const sound = type === 'chime' ? 'alert' : type;
  playChimeSound(sound);
}

export function sendWebPushNotification(title: string, options?: { body?: string; tag?: string; playSound?: boolean }) {
  return triggerPushNotification(title, options);
}

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): 'default' | 'granted' | 'denied' | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<'default' | 'granted' | 'denied' | 'unsupported'> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch {
    return 'denied';
  }
}

export function triggerPushNotification(
  title: string,
  options?: {
    body?: string;
    tag?: string;
    icon?: string;
    playSound?: boolean;
    soundType?: 'alert' | 'success' | 'urgent';
  }
): boolean {
  const { body, tag = 'ie-notification', playSound = true, soundType = 'alert' } = options || {};

  if (playSound) {
    playChimeSound(soundType);
  }

  if (!isNotificationSupported()) {
    return false;
  }

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        tag,
        badge: '/favicon.ico',
        icon: '/favicon.ico'
      });
      return true;
    } catch {
      // Notification failed
      return false;
    }
  }
  return false;
}
