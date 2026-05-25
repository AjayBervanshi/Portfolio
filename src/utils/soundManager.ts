// Web Audio API Synthesized High-Tech Sound FX Engine
// Fully standalone, ultra-low latency, zero assets to download!

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Start muted by default to respect browser autoplay policies

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dba_portfolio_muted');
      this.isMuted = saved === null ? true : saved === 'true';
    }
  }

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('dba_portfolio_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.initContext();
      this.playTick();
    }
    return this.isMuted;
  }

  // A light cybernetic interface click/tick
  public playTick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio playback issue:", e);
    }
  }

  // System Boot Up sweep hum
  public playBoot() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  }

  // Successful operation/query chord
  public playSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (warm rising sweep)

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.04, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.25);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch (e) {}
  }

  // Alternating cyber disaster/failover siren alert
  public playAlarm(durationSecs: number = 1.5) {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sawtooth';
      
      // Dual alternating warning siren
      for (let i = 0; i < durationSecs * 2; i++) {
        const freq = i % 2 === 0 ? 380 : 320;
        osc.frequency.setValueAtTime(freq, now + i * 0.25);
      }

      gain.gain.setValueAtTime(0.0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.04, now + durationSecs - 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSecs);

      osc.start();
      osc.stop(now + durationSecs);
    } catch (e) {}
  }
}

export const sound = new SoundManager();
