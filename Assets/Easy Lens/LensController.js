// Main Controller
//
// Made with Easy Lens

//@input Component.ScriptComponent welcome_bg
//@input Component.ScriptComponent bitmoji_player
//@input Component.ScriptComponent game_title
//@input Component.ScriptComponent bitmoji_mellina
//@input Component.ScriptComponent welcome_message
//@input Component.ScriptComponent play_button
//@input Component.ScriptComponent leaderboard_button


try {

// No Touch Events block available in the provided blocks to implement interactive taps for Play and Global Leaderboards.
// Adding minimal dynamic setup for facing/positioning theme using only allowed dynamic changes and avoiding static init per constraints.

// Ensure solid background behind Bitmoji scenes (no user segmentation visible with Bitmoji)
script.welcome_bg.useSegmentation = false;

// Arrange Bitmojis to face each other using layout 3 (Facing each other)
script.bitmoji_player.layout = 3;
script.bitmoji_mellina.layout = 3;

// Enable only one Bitmoji per scene
script.bitmoji_player.bitmoji1Enabled = true;
script.bitmoji_player.bitmoji2Enabled = false;
script.bitmoji_mellina.bitmoji1Enabled = true;
script.bitmoji_mellina.bitmoji2Enabled = false;

// Make player face right (toward Mellina) and Mellina face left (toward player)
script.bitmoji_player.bitmoji1OffsetRotation = 90;
script.bitmoji_mellina.bitmoji1OffsetRotation = 270;

// Give appropriate expressions: player determined (angry), Mellina scary (scared would be wrong; use angry for menace)
script.bitmoji_player.bitmoji1FacialExpression = "angry";
script.bitmoji_mellina.bitmoji1FacialExpression = "angry";

// Widen their spacing a bit using offsets so they read as opponents
// Move player left, Mellina right
script.bitmoji_player.bitmoji1OffsetPosition = new vec2(-2.0, 0.0);
script.bitmoji_mellina.bitmoji1OffsetPosition = new vec2(2.0, 0.0);

// Button tap handling and visual feedback require a Touch Events block, which is not provided.
// If a Touch Events block is added (e.g., script.touchEvents), we can implement:
// - Hit testing using button positions and sizes
// - Visual feedback by tweaking backgroundEnabled/backgroundColor briefly
// - Triggering play and leaderboard overlay via events routed to the main controller

// Temporary visual feedback shim using a pulse on title to suggest readiness (non-interactive)
var pulse = 0.0;
var dir = 1.0;
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function() {
    pulse = pulse + dir * getDeltaTime() * 0.8;
    if (pulse > 1.0) {
        pulse = 1.0;
        dir = -1.0;
    }
    if (pulse < 0.0) {
        pulse = 0.0;
        dir = 1.0;
    }
    // Subtle title shadow pulse to convey energy (if shadow enabled in designer)
    // We cannot initialize properties here unless needed dynamically; only change if already enabled.
    if (script.game_title.shadowEnabled) {
        var baseX = script.game_title.shadowOffsetX;
        var baseY = script.game_title.shadowOffsetY;
        var offset = 0.1 * (pulse - 0.5);
        script.game_title.shadowOffsetX = baseX + offset;
        script.game_title.shadowOffsetY = baseY + offset;
    }
});

} catch(e) {
  print("error in controller");
  print(e);
}
