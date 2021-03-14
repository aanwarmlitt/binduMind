$(document).ready(function () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var is_on = false;
    var context = new AudioContext();
    var context_r = new AudioContext();
    var o = context.createOscillator();
    var g = context.createGain();
    var a = context_r.createOscillator();
    var b = context_r.createGain();
    var frequency_l = Number($("#l_freq").val());
    var frequency_r = Number($("#r_freq").val());
    var pan_left = -1;
    var pan_right = 1;
    function generateSine(pan, freq, cont, os, gn) {
        var panNode = cont.createStereoPanner();
        panNode.pan.value = pan;
        os = cont.createOscillator()
        gn = cont.createGain()
        os.connect(gn)
        os.frequency.value = freq
        gn.connect(panNode);
        panNode.connect(cont.destination)
        os.start(0)
    }

    $("#play").click(function () {
        if (is_on == false) {
            frequency_l = Number($("#l_freq").val());
            frequency_r = Number($("#r_freq").val());
            context = new AudioContext();
            context_r = new AudioContext();
            o = context.createOscillator();
            g = context.createGain();
            a = context_r.createOscillator();
            b = context_r.createGain();
            generateSine(pan_left, frequency_l, context, o, g);
            generateSine(pan_right, frequency_r, context_r, a, b);
            is_on = true;
        }
    });
    $("#stop").click(function () {
        if (is_on == true) {
            context.close();
            context_r.close();
            is_on = false;
        }
    })
})