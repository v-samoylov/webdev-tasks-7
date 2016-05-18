var increaseVolume = function () {
    var voicePlayer = document.querySelector('.voice-player');
    var pigPlayer = document.querySelector('.pig-player');
    if (voicePlayer.volume < 1) {
        voicePlayer.volume = (voicePlayer.volume * 100 + 10) / 100;
    }
    if (pigPlayer.volume < 1) {
        pigPlayer.volume = (pigPlayer.volume * 100 + 10) / 100;
    }
    document.querySelector('.volume-value').innerText = pigPlayer.volume;
};
var decreaseVolume = function () {
    var voicePlayer = document.querySelector('.voice-player');
    var pigPlayer = document.querySelector('.pig-player');
    if (voicePlayer.volume > 0) {
        voicePlayer.volume = (voicePlayer.volume * 100 - 10) / 100;
    }
    if (pigPlayer.volume > 0) {
        pigPlayer.volume = (pigPlayer.volume * 100 - 10) / 100;
    }
    document.querySelector('.volume-value').innerText = pigPlayer.volume;
};
var getSatiety = function () {
    return parseInt(localStorage.satiety);
};
var getEnergy = function () {
    return parseInt(localStorage.energy);
};
var getMood = function () {
    return parseInt(localStorage.mood);
};
var isDead = function () {
    var counter = 0;
    [getSatiety(), getEnergy(), getMood()].forEach(function (value) {
        value <= 0 ? counter++ : null;
    });
    return counter > 1;
};
var updateStatusTable = function () {
    document.querySelector('#satiety').innerText = localStorage.satiety;
    document.querySelector('#energy').innerText = localStorage.energy;
    document.querySelector('#mood').innerText = localStorage.mood;
};
var handleRestart = function () {
    localStorage.clear();
    localStorage.satiety = '100';
    localStorage.energy = '100';
    localStorage.mood = '100';
    isSleeping = false;
    isEating = false;
    isListening = false;
    headGroup.transform("translate(0, 0)");
    openEyes();
    updateStatusTable();
    document.querySelector('img').style.display = 'none';
    setStatusUpdate();
};
var closedLeftEye;
var closedRightEye;
var closeEyes = function () {
    var closedEyeAttr = {stroke: 'black', strokeWidth: 3};
    leftEye.attr({opacity: 0});
    rightEye.attr({opacity: 0});
    var eyesCoordsX = [parseInt(leftEye.attr('cx')), parseInt(rightEye.attr('cx'))];
    closedLeftEye = s.line(eyesCoordsX[0] - 5, 115, eyesCoordsX[0] + 5, 115);
    closedRightEye = s.line(eyesCoordsX[1] - 5, 115, eyesCoordsX[1] + 5, 115);
    closedLeftEye.attr(closedEyeAttr);
    closedRightEye.attr(closedEyeAttr);
};
var openEyes = function () {
    closedLeftEye ? closedLeftEye.remove() : null;
    closedRightEye ? closedRightEye.remove() : null;
    leftEye.attr({opacity: 1});
    rightEye.attr({opacity: 1});
};
var killEyes = function () {
    var deadEyeAttr = {stroke: 'black', strokeWidth: 3};
    leftEye.attr({opacity: 0});
    rightEye.attr({opacity: 0});
    var eyesCoordsX = [parseInt(leftEye.attr('cx')), parseInt(rightEye.attr('cx'))];
    closedLeftEye = s.path('M'+(eyesCoordsX[0] - 5)+',110 l+10,+10 M'+(eyesCoordsX[0] - 5)+',120 l+10,-10');
    closedRightEye = s.path('M'+(eyesCoordsX[1] - 5)+',110 l+10,+10 M'+(eyesCoordsX[1] - 5)+',120 l+10,-10');
    closedLeftEye.attr(deadEyeAttr);
    closedRightEye.attr(deadEyeAttr);
};
var grunt = function () {
    playVoiceSound("sounds/grunt.wav", "audio/wav");
    mouth.attr({
        strokeWidth: 6
    });
    setTimeout(function () {
        mouth.attr({
            strokeWidth: 3
        });
    }, 600);
};
var sleep = function () {
    headGroup.transform("translate(0, 75px)");
    closeEyes();
    isSleeping = true;
    isEating = false;
    isListening = false;
};
var wakeUpTimeout;
var wakeUp = function () {
    wakeUpTimeout ? clearTimeout(wakeUpTimeout) : null;
    wakeUpTimeout = setTimeout(function () {
        headGroup.transform("translate(0, 0)");
        openEyes();
        isSleeping = false;
    }, 4000);
};
var feed = function () {
    if (getSatiety() < 100) {
        localStorage.satiety = (getSatiety() + 1).toString();
    }
};
var playVoiceSound = function (src, type) {
    var player = document.querySelector('.voice-player');
    player.src = src;
    player.type = type;
    player.play();
};
var playPigSound = function (src, type) {
    var player = document.querySelector('.pig-player');
    player.src = src;
    player.type = type;
    player.play();
};
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}
var s = Snap("#svg");
var body = s.ellipse(185 ,95 ,80 ,40);
body.attr({
    fill: '#ff9999',
    stroke: 'purple',
    strokeWidth: 2
});
var legAttr = {
    fill: '#ff9999',
    stroke: 'purple',
    strokeWidth: 2
};
var leftLeg = s.path("M120,110 l0,+60 +20,0 0,-60");
var rightLeg = s.path("M220,110 l0,+60 +20,0 0,-60");
leftLeg.attr(legAttr);
rightLeg.attr(legAttr);
var legs = s.group(leftLeg, rightLeg);
legs.attr(legAttr);
var head = s.circle(100, 50, 45);
head.attr({
    fill:'#ff9999',
    stroke:'purple',
    strokeWidth:2
});
var earAttr = {
    fill: '#ff9999',
    stroke: 'purple',
    strokeWidth: 2
};
var leftEar = s.path("M53,0 l-10,+30 +20,+10 +10,-20z");
var rightEar = s.path("M143,0 l-15,+20 +10,+20 +15,-10z");
var ears = s.group(leftEar, rightEar);
ears.attr(earAttr);
var eyeAttr = {
    stroke: "black",
    strokeWidth: 3,
    fill: "white"
};
var leftEye = s.circle(79, 40, 4);
var rightEye = s.circle(121, 40, 4);
var eyes = s.group(leftEye, rightEye);
eyes.attr(eyeAttr);
var nose = s.circle(100, 60, 15);
nose.attr({
    stroke: "black",
    strokeWidth: "3",
    fill: "#ff9999"
});
var nostrilAttr = {
    stroke: "black",
    strokeWidth: "3",
    fill: "black"
};
var leftNostril = s.circle(94, 60, 2);
var rightNostril = s.circle(105, 60, 2);
var nostrils = s.group(leftNostril, rightNostril);
nostrils.attr(nostrilAttr);
var mouth = s.line(95, 80, 105, 80);
mouth.attr({
    stroke: 'black',
    strokeWidth: 3
});
var headGroup = s.group(head, ears, eyes, nose, nostrils, mouth);
var SpeechRecognition = window.SpeechRecognition     ||
                window.webkitSpeechRecognition;
var recognizer = new SpeechRecognition();
if (recognizer) {
    recognizer.continuous = true;
    recognizer.lang = 'ru-RU';
    s.group(body, legs, headGroup).click(function (e) {
        playVoiceSound("sounds/say.mp3", "audio/mpeg");
        document.querySelector('.speech').innerText = 'Huh?';
        recognizer.start();
        isListening = true;
        recognizer.isListening = true;
        recognizer.onresult = function (e) {
            var index = e.resultIndex;
            var result = e.results[index][0].transcript.trim();
            document.querySelector('.speech').innerText = result;
            localStorage.mood = (getMood() + 9).toString();
            if (getMood() >= 100) {
                isListening = false;
                recognizer.isListening = false;
            }
        };
    });
}
var handleVisibilityChange = function () {
    if (isDead()) {
        return;
    }
    if (!isSleeping) {
        sleep();
    } else {
        wakeUp();
    }
};
document.addEventListener(visibilityChange, handleVisibilityChange, false);
if ('ondevicelight' in window) {
    window.ondevicelight = function (e) {
        if (event.value < 50 && getEnergy() < 100) {
            sleep();
        }
    };
}
if (navigator.getBattery) {
    navigator
        .getBattery()
        .then(function (battery) {
            battery.onchargingchange = function () {
                if (isEating) {
                    isEating = false;
                } else {
                    isEating = true;
                    isListening = false;
                }
            };
        });
} else {
    document.querySelector('.feed-btn').style.display = 'inline';
}
localStorage.satiety ? null : localStorage.satiety = '100';
localStorage.energy ? null : localStorage.energy = '100';
localStorage.mood ? null : localStorage.mood = '100';
var isSleeping = false;
var isEating = false;
var isListening = false;
updateStatusTable();
var setStatusUpdate = function () {
    var statusUpdate = setInterval(function () {
        if (isEating) {
            if (getSatiety() < 100) {
                localStorage.satiety = (getSatiety() + 3).toString();
            }
            getSatiety() > 100 ? localStorage.satiety = 100 : null;
            getSatiety() === 100 ? isEating = false : null;
        } else {
            localStorage.satiety = (getSatiety() - 1).toString();
            getSatiety() < 0 ? localStorage.satiety = 0 : null;
        }
        if (isSleeping) {
            if (getEnergy() < 100) {
                localStorage.energy = (getEnergy() + 6).toString();
                getEnergy() > 100 ? localStorage.energy = 100 : null;
            } else {
                wakeUp();
            }
        } else {
            localStorage.energy = (getEnergy() - 2).toString();
            getEnergy() < 0 ? localStorage.energy = 0 : null;
        }
        if (!isListening) {
            if (recognizer.isListening) {
                recognizer.stop();
                recognizer.isListening = false;
                playVoiceSound("sounds/annoying.mp3", "audio/mpeg");
                document.querySelector('.speech').innerText = '';
            }
            localStorage.mood = (getMood() - 3).toString();
            getMood() < 0 ? localStorage.mood = 0 : null;
        }
        updateStatusTable();
        if (isDead()) {
            headGroup.transform("translate(0, 75px)");
            killEyes();
            document.querySelector('.death-msg').style.display = 'inline';
            playPigSound("sounds/death.mp3", "audio/mpeg");
            clearInterval(statusUpdate);
            setTimeout(function () {
               playVoiceSound("sounds/game_over.mp3", "audio/mpeg");
            }, 3000);
            return;
        }
        if (!isSleeping && !isEating) {
            setTimeout(function () {
                grunt();
            }, Math.floor((Math.random() * 20) + 1));
        }
    }, 20000);
};
setStatusUpdate();

document.querySelector(".volume-inc-btn").addEventListener("click", increaseVolume);
document.querySelector(".volume-dec-btn").addEventListener("click", decreaseVolume);
document.querySelector(".feed-btn").addEventListener("click", feed);
document.querySelector(".restart-btn").addEventListener("click", handleRestart);
