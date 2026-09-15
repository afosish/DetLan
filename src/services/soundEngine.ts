// DetLan Web Audio & Speech Engine
// Synthesizes retro detective sound effects directly via Web Audio API (no external mp3 files needed)
// and handles Bulgarian Text-to-Speech (TTS) and Speech-to-Text (STT)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private soundEnabled: boolean = true;
  private volume: number = 0.7; // 0.0 to 1.0

  constructor() {
    // Sound is enabled by default, can be toggled
    const stored = localStorage.getItem('detlan_sound_enabled');
    if (stored !== null) {
      this.soundEnabled = stored === 'true';
    }

    const storedVol = localStorage.getItem('detlan_sound_volume');
    if (storedVol !== null) {
      const parsed = parseFloat(storedVol);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        this.volume = parsed;
      }
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(val: boolean) {
    this.soundEnabled = val;
    localStorage.setItem('detlan_sound_enabled', String(val));
    this.updateMasterGain();
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    localStorage.setItem('detlan_sound_volume', String(this.volume));
    if (this.volume > 0 && !this.soundEnabled) {
      this.soundEnabled = true;
      localStorage.setItem('detlan_sound_enabled', 'true');
    }
    this.updateMasterGain();
  }

  private updateMasterGain() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.soundEnabled ? this.volume : 0,
        this.ctx.currentTime
      );
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.masterGain) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(
          this.soundEnabled ? this.volume : 0,
          this.ctx.currentTime
        );
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  private getDestination(): AudioNode {
    this.initContext();
    return this.masterGain || (this.ctx ? this.ctx.destination : ({} as AudioNode));
  }

  // 1. Vintage Typewriter Click
  public playTypewriter() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Noise burst for mechanical strike
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400 + Math.random() * 600, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300 + Math.random() * 200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // 2. Clue Discovered (Bright brass chime)
  public playClueFound() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

      const startTime = this.ctx.currentTime + idx * 0.06;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);

      osc.connect(gain);
      gain.connect(this.getDestination());

      osc.start(startTime);
      osc.stop(startTime + 0.9);
    });
  }

  // 3. Stamp / Gavel Thud (Accusation / Case solved / Stamp applied)
  public playStampThud() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(this.getDestination());

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // 4. Interrogation Tension Drone (Poirot pondering)
  public playTensionDrone() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2
    osc2.frequency.setValueAtTime(116.54, this.ctx.currentTime); // A#2 dissonant

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.getDestination());

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 2.1);
    osc2.stop(this.ctx.currentTime + 2.1);
  }

  // 5. Success Fanfare
  public playVictory() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.5, d: 0.45 }, // C6
    ];

    let t = this.ctx.currentTime;
    notes.forEach((n) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

      osc.connect(gain);
      gain.connect(this.getDestination());

      osc.start(t);
      osc.stop(t + n.d + 0.05);
      t += n.d * 0.85;
    });
  }

  // 6. Translator Trap Error
  public playTrapError() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(140, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(this.getDestination());

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // 7. Bulgarian Text-To-Speech (Web Speech API)
  public speakBulgarian(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.88; // Slightly measured, Poirot detective pace
    utterance.volume = this.soundEnabled ? this.volume : 0;

    // Try to find native Bulgarian voice
    const voices = window.speechSynthesis.getVoices();
    const bgVoice = voices.find(v => v.lang.startsWith('bg') || v.lang.includes('BG'));
    if (bgVoice) {
      utterance.voice = bgVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const soundEngine = new SoundEngine();
