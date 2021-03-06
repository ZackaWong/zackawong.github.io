//***********************************
//    91.461 Assignment 8:  JQ Gui - Sliders and Tabs
//          Zachary Wong, UMass Lowell Computer Science, zwong@cs.uml.edu
//          Copyright (c) 2015 by Zachary Wong.  All rights reserved.  
//
//    CHANGELOG:
//    11/18/15:  Duplicated from jq_validation.js
//    11/19/15:  Added Slider functionality
//    11/20/15:  Tweaked Slider functionality
//    11/21/15:  Added Tab functionality, lots of bug and code fixes.
//    
//   
//    Other sources used:
//    jQuery sliders Hotel room example:
//    https://jqueryui.com/slider/#hotelrooms
//   
//    Greater Than validation method source
//    http://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
//    
//***********************************

//Not really the best method... but generates a default table at start


$(function () {
    $(document).ready(function () {
        buildTable(1, 10, 1, 10);
        $(function slider() {
            //Minimum row slider
            $("#minrowSlider").slider({
                min: -12,
                max: 12,
                animate: true,
                slide: function (event, ui) {
                    $("#minRow").val(ui.value);
                } 
            });
            $("#minRow").change(function() {
                $("#minrowSlider").slider("value", this.value);
            });
            
            //Max row slider
            $("#maxrowSlider").slider({
                min: -12,
                max: 12,
                animate: true,
                slide: function (event, ui) {
                    $("#maxRow").val(ui.value);
                } 
            });
            $("#maxRow").change(function() {
                $("#maxrowSlider").slider("value", this.value);
            });
            
            //Min column slider
            $("#mincolSlider").slider({
                min: -12,
                max: 12,
                animate: true,
                slide: function (event, ui) {
                    $("#minCol").val(ui.value);
                } 
            });
            $("#minCol").change(function() {
                $("#mincolSlider").slider("value", this.value);
            });
        
        //Max column slider
            $("#maxcolSlider").slider({
                min: -12,
                max: 12,
                animate: true,
                slide: function (event, ui) {
                    $("#maxCol").val(ui.value);
                } 
            });
            $("#maxCol").change(function() {
                $("#maxcolSlider").slider("value", this.value);
            });
        });
    });
    
//http://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
    $.validator.addMethod("greaterThan", function (value, element, param)
    {
        var $min = $(param);
        if (this.settings.onfocusout) {
            $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                $(element).valid();
            });
        }
        return parseInt(value) > parseInt($min.val());
    }, "Max must be greater than min");

    /* Attempt at working on a custom rule where the user is can enter
     * any value as long as the difference between the min and max is
     * less than or equal to 12.
     * Result was unsucessful.
     $.validator.addMethod("rangeOf12", function (value, element, param)
     {
     var $min = $(param);
     if (this.settings.onfocusout) {
     $min.off(".validate-rangeOf12").on("blur.validate-rangeOf12", function () {
     $(element).valid();
     });
     }
     
     var diff = parseInt(value) - parseInt($min.val());
     return Math.abs(diff) > 12;
     }, "Value range is to large");
     */
    $("#TableParam").validate({
        rules: {
            minRow: {
                required: true,
                min: -12,
                max: 12

            },
            maxRow: {
                required: true,
                min: -12,
                max: 12,
                greaterThan: "#minRow"
            },
            minCol: {
                required: true,
                min: -12,
                max: 12
            },
            maxCol: {
                required: true,
                min: -12,
                max: 12,
                greaterThan: "#minCol"
            }
        },
        submitHandler: function (form) {
            submitForm();
            return false;  //This doesn't prevent the form from submitting.
        }

    });
});
