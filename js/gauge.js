// draw gauges
function drawGauges(id, value) {
    var gg1 = new JustGage({
        parentNode: id,
        value: customValue(value),
        min: 0,
        max: 100,
        textRenderer: customText,
        pointer: true,
        pointerOptions: {
            toplength: -15,
            bottomlength: 10,
            bottomwidth: 12,
            color: '#8e8e93',
            stroke: '#ffffff',
            stroke_width: 3,
            stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        counter: true
    });

}

function customValue(value) {
    if (value == "high") {
        return 85;
    } else if (value == "medium") {
        return 50;
    } else if (value == "low") {
        return 15;
    }
}

function customText(val) {
    if (val < 50) {
        return 'low';
    } else if (val > 50) {
        return 'high';
    } else if (val === 50) {
        return 'medium';
    }
}