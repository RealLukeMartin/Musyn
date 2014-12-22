(function() {
    var context, 
        soundSource, 
        soundBuffer,
        url = 'http://thelab.thingsinjars.com/web-audio-tutorial/hello.mp3',
        play = document.getElementById("play"),
        stop = document.getElementById("stop");

    // Init Audio Context
    function init() {
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }
    }

    // Load Sound using XHR
    function startSound() {
        // this loads asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        // Our asynchronous callback
        request.onload = function() {
            var audioData = request.response;

            audioGraph(audioData);


        };

        request.send();
    }

    // source start time
    function playSound() {
        // play the source now
        soundSource.noteOn(context.currentTime);
    }

    function stopSound() {
        // stop the source now
        soundSource.noteOff(context.currentTime);
    }

    // Events for the play/stop bottons
    play.addEventListener('click', startSound);
    stop.addEventListener('click', stopSound);


    // This is the code we are interested in
    function audioGraph(audioData) {
        // create a sound source
        soundSource = context.createBufferSource();

        // The Audio Context handles creating source buffers from raw binary
        soundBuffer = context.createBuffer(audioData, true/* make mono */);
      
        // Add the buffered data to our object
        soundSource.buffer = soundBuffer;

        // Plug the cable from one thing to the other
        soundSource.connect(context.destination);

        // Finally
        playSound(soundSource);
    }


    init();


}());