/**
 * This file creates a canvas pie chart that slowly fills over time, before triggering another function
 * @author pete goodman
 */

var canvasPieTimer = {

    // int: the canvas size (also used for circle radius and positioning)
    canvasSize : null,

    // object: the html canvas area
    canvas : null,

    // object : the interval between pie fills
    canvasInterval : null,

    // int : the time between updates (in milliseconds)
    timeInterval : 100,

    // int : the time elapsed, (when it gets to timeLimit it triggers a refresh)
    timeElapsed : 0,

    // int : the timeLimit on which to trigger a refresh
    timeLimit : 60000,

    // angle to start the wedge from
    startAngle : -Math.PI/2,

    // int (float) : size of wedge to add each time
    wedgeSize : null,

    // string : the colours with which to fill the pie
    fillColour : "black",
    bgColour : "orange",


    /*
     * start the process
     */
    init: function(canvasSize, canvasId, parentId){

        // not fully supported in IE as yet, so don't proceed on this occasion...
        if(window.attachEvent) {
            return false;
        }

        // set the canvas size for the object - used again later
        this.canvasSize = canvasSize;

        // Create a canvas element
        this.canvas = this.createCanvas(canvasId, this.canvasSize);

        // Add it to the document
        var parent = document.getElementById(parentId);
        parent.appendChild(this.canvas);

        this.wedgeSize = (this.timeInterval / this.timeLimit) * Math.PI * 2;

        // update the timer every x of a second
        this.canvasInterval = setInterval('canvasPieTimer.updatePie()', this.timeInterval);
    },


    /*
     * create a canvas element of specific size
     */
    createCanvas: function(id, canvasSize) {

        // create the canvas
        var canvas = document.createElement("canvas");
        canvas.id = id;
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // get the size of the outer circle
        var drawX = drawY = radius = this.canvasSize / 2;

        // draw the outer circle
        var draw = canvas.getContext("2d");
        draw.globalAlpha = 1;
        draw.beginPath();
        draw.arc(drawX, drawY, radius, 0, Math.PI*2, true);
        draw.fillStyle = this.bgColour;
        draw.fill();

        return canvas;
    },


    /*
     * Update the pie with the current time elapsed
     */
    updatePie: function() {

        // check to see whether we have filled the timer - remove time interval to stop overlap
        if (this.timeElapsed >= (this.timeLimit)) {
            clearInterval(this.canvasInterval);

            // call a function once finished
            this.doSomething();
        }

        // point(s) to start the drawing, half the canvas size
        var drawX = drawY = radius = this.canvasSize / 2;

        // Calculate the end angle
        var endAngle = this.startAngle + this.wedgeSize;

        // add current wedge
        var draw = this.canvas.getContext("2d");
        draw.beginPath();
        draw.moveTo(drawX,drawY);
        draw.arc(drawX, drawY, radius, this.startAngle, endAngle, false);
        draw.closePath();
        draw.fillStyle = this.fillColour;
        draw.fill();

        // increment elapsed time
        this.timeElapsed = this.timeElapsed + this.timeInterval;

        // calculate the new wedge size
        this.wedgeSize = (this.timeElapsed / this.timeLimit) * Math.PI * 2;

    },


    /*
     * do something once the pie is full
     */
    doSomething: function(){
        //alert('finished!');
    }
}