// Web Audio API generative synthesizer for OBLIQUE craft studio
// Zero external assets, 100% synthesized in real-time, zero latency.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private filterNode: BiquadFilterNode | null = null;
  private isInitialized: boolean = false;

  private init() {
    if (this.isInitialized || typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.isInitialized = true;
    } catch {
      console.warn("Web Audio API not supported");
    }
  }

  public toggleSound(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbientDrone();
      this.playChime(660);
    } else {
      this.stopAmbientDrone();
    }

    return this.isEnabled;
  }

  public getSoundState(): boolean {
    return this.isEnabled;
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.isEnabled) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, now + 2);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(220, now);

      // Low frequency drone notes (A1 55Hz, E2 82.4Hz, A2 110Hz)
      const freqs = [55, 82.41, 110];
      this.ambientOscs = freqs.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(this.filterNode!);
        osc.start();
        return osc;
      });

      this.filterNode.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
    } catch {
      // Audio node cleanup
    }
  }

  private stopAmbientDrone() {
    if (!this.ctx || !this.ambientGain) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        this.ambientOscs.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.ambientOscs = [];
        this.ambientGain?.disconnect();
        this.ambientGain = null;
      }, 900);
    } catch {}
  }

  // High-tech subtle mechanical tick for hover
  public playTick() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  // Harmonic chime for toy collision or project open
  public playChime(freq = 520) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }

  // Low magnetic thump for CTA or major actions
  public playThump() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }
}

export const sound = new SoundEngine();
