// Main Controller
//
// Made with Easy Lens

//@input Component.ScriptComponent ai_text
//@input Component.ScriptComponent touch_events


try {

// Animate AI-like text with gentle color shift and bobbing motion.
// Respond to taps by cycling messages and pulsing style briefly.

let hue = 0.0;
let timeAccum = 0.0;
let bobPhase = 0.0;
let basePos = script.ai_text.position;
let messageIndex = 0;
let pulseActive = false;
let pulseTime = 0.0;
const PULSE_DURATION = 0.35;

// Friendly, lively messages to simulate an "alive" AI
const messages = [
    "Hey there!\nReady to play?",
    "I’m here and\nfeeling alive!",
    "Tap to chat\nwith me!",
    "Let’s make\nsomething cool.",
    "I see you.\nLooking great!"
];

// Helper: convert HSV to RGB vec4 (alpha 1)
function hsvToRgba(h, s, v) {
    // h: 0-1, s: 0-1, v: 0-1
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0;
    let g = 0;
    let b = 0;

    if (i % 6 === 0) { r = v; g = t; b = p; }
    else if (i % 6 === 1) { r = q; g = v; b = p; }
    else if (i % 6 === 2) { r = p; g = v; b = t; }
    else if (i % 6 === 3) { r = p; g = q; b = v; }
    else if (i % 6 === 4) { r = t; g = p; b = v; }
    else { r = v; g = p; b = q; }

    return new vec4(r, g, b, 1);
}

// Update animation each frame
function update() {
    const dt = getDeltaTime();
    timeAccum = timeAccum + dt;

    // Smooth hue shift
    hue = hue + dt * 0.08;
    if (hue > 1) {
        hue = hue - 1;
    }

    // Bobbing motion
    bobPhase = bobPhase + dt * 2.0;
    const bobOffsetY = Math.sin(bobPhase) * 0.01;
    script.ai_text.position = new vec2(basePos.x, basePos.y + bobOffsetY);

    // Color and pulse effect
    let saturation = 0.7;
    let value = 1.0;

    if (pulseActive) {
        pulseTime = pulseTime + dt;
        // During pulse, boost brightness and simulate outline "glow" by toggling properties
        saturation = 0.6;
        value = 1.0;
        script.ai_text.outlineEnabled = true;
        script.ai_text.outlineThickness = 0.6;
        script.ai_text.shadowEnabled = true;
        script.ai_text.shadowColor = new vec4(0, 0, 0, 0.6);

        if (pulseTime >= PULSE_DURATION) {
            pulseActive = false;
            // End pulse: subtle outline
            script.ai_text.outlineThickness = 0.25;
            script.ai_text.shadowEnabled = false;
        }
    } else {
        // Ambient subtle outline to feel "alive"
        script.ai_text.outlineEnabled = true;
        script.ai_text.outlineThickness = 0.15;
    }

    // Apply animated color
    const color = hsvToRgba(hue, saturation, value);
    script.ai_text.color = color;

    // Match outline color to hue for glow feel
    const outline = hsvToRgba((hue + 0.05) % 1, 0.8, 1.0);
    script.ai_text.outlineColor = outline;
}

// Handle taps: cycle message and trigger pulse
script.touch_events.onTap.add(function(tapX, tapY) {
    messageIndex = messageIndex + 1;
    if (messageIndex >= messages.length) {
        messageIndex = 0;
    }
    script.ai_text.text = messages[messageIndex];

    // Trigger pulse
    pulseActive = true;
    pulseTime = 0.0;

    // Nudge position toward tap slightly for a reactive feel
    const target = new vec2(tapX, tapY);
    const cur = script.ai_text.position;
    const nx = cur.x + (target.x - cur.x) * 0.08;
    const ny = cur.y + (target.y - cur.y) * 0.08;
    script.ai_text.position = new vec2(nx, ny);
    basePos = script.ai_text.position;
});

// Initialize with first message
script.ai_text.text = messages[messageIndex];

// Start per-frame updates
const updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(update);

} catch(e) {
  print("error in controller");
  print(e);
}
