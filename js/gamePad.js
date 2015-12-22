
window.onload= init;

function init() {
    var haveEvents = 'ongamepadconnected' in window;
    var chromeInterval = null;
    var updateGPInterval = null;
    
    var gamepadInfo = document.getElementById("gamepad-info");
    gamepadInfo.innerHTML ="If gamepad is connected press any button.";
}


// Set a threshold 
var applyDeadzone = function(number, threshold){
   percentage = (Math.abs(number) - threshold) / (1 - threshold);

   if(percentage < 0)
      percentage = 0;

   return percentage * (number > 0 ? 1 : -1);
}


function updateGamePad() {
    var gp = navigator.getGamepads()[0];
    window.gp = gp;
    if (gp.buttons[0].pressed) {
        console.log("Take Off");
    } else if (gp.buttons[1].pressed) {
        console.log("Landing");
    }
    // axes[0] = Y
    // axes[1] = X
    // axes[3] = Yaw
    // axes[4] = Alt
    
    var Y = applyDeadzone(gp.axes[0], 0.12);
    var X = applyDeadzone(gp.axes[1], 0.12);
    var Yaw = applyDeadzone(gp.axes[3], 0.12);
    var Alt = applyDeadzone(gp.axes[4], 0.12);

    if (X != 0) {
            console.log("PULSADO X:" + X);
    }
    if (Y != 0) {
            console.log("PULSADO Y:" + Y);
    }
    if (Alt != 0) {
            console.log("PULSADO Alt:" + Alt);
    }
    if (Yaw != 0) {
            console.log("PULSADO Yaw:" + Yaw);
    }
    sendAltYaw(-Alt, Yaw);
    sendCMDVel(-X,Y);// Change variables and send the command to the drone
}

// Connected gamePad device
function connecthandler(e) {
    var gp = navigator.getGamepads()[e.gamepad.index];
    window.gp = gp;
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);
    var gamepadInfo = document.getElementById("gamepad-info");
    gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
    // Check for buttons/axes change
    updateGPInterval = setInterval(updateGamePad, 100);
    
    // ****** Borrar los joysicks
}

// Disconnectec gamePad Device 
function disconnecthandler(e){
    console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
    //gamepadInfo.innerHTML = "Waiting for a gamepad..."
    clearInterval(updateGPInterval);
    
    // Dibujar los joysticks
}


function scangamepad() {
    if (navigator.getGamepads()[0]){
        clearInterval(chromeInterval);
        updateGPInterval = setInterval(updateGamePad, 100);
    }
}
// detect the gamepad in chrome
//if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
//} else {
  //  chromeInterval = setInterval(scangamepad, 1000);
//}