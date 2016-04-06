(function() {
    'use strict';

    angular
        .module('satApplication')
        .factory('renderChart', renderChart);

    renderChart.$inject = ['$timeout'];

    /* @ngInject */
    function renderChart($timeout) {
        var service = {
            serveChartData: serveChartData
        };
        return service;


        function serveChartData() {

			var chartLabels = ['WET EN REGELGEVING', 'ORGANISATIE', 'CULTUUR', 'TECHNIEK'];

			var chartColour = [
				{
					fillColor: "rgba(35,152,169,0.5)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(92,152,169,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)"

				},
				{
					fillColor: "rgba(205, 229, 242,0.6)",
					strokeColor: "#2b98a8",
					pointColor: "rgba(205, 229, 242,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(205, 229, 242,1)"
				}
			];
			

			var chartOptions =  {
				animation: true,
				legendTemplate : '<ul class="tc-chart-js-legend radar-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
				// Number - Number of animation steps
				animationSteps: 10,

				// String - Animation easing effect
				// Possible effects are:
				// [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
				//  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
				//  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
				//  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
				//  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
				//  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
				//  easeOutElastic, easeInCubic]
				animationEasing: "easeOutQuart",
				
				//String - Point label font declaration
				pointLabelFontFamily : "'Arial'",

				//String - Point label font weight
				pointLabelFontStyle : "normal",

				//Number - Point label font size in pixels
				pointLabelFontSize : 12,

				//String - Point label font colour
				pointLabelFontColor : "#000",

				// Boolean - If we should show the scale at all
				showScale: true,

				// Boolean - If we want to override with a hard coded scale
				scaleOverride: true,

				// ** Required if scaleOverride is true **
				// Number - The number of steps in a hard coded scale
				scaleSteps: 10,
				// Number - The value jump in the hard coded scale
				scaleStepWidth: 10,
				// Number - The scale starting value
				scaleStartValue: 0,

				// String - Colour of the scale line
				scaleLineColor: "rgba(0,0,0,.1)",

				// Number - Pixel width of the scale line
				scaleLineWidth: 1,

				// Boolean - Whether to show labels on the scale
				scaleShowLabels: false,

				// Interpolated JS string - can access value
				scaleLabel: "<%=value%>",

				// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
				scaleIntegersOnly: true,

				// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				scaleBeginAtZero: true,

				// String - Scale label font declaration for the scale label
				scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Scale label font size in pixels
				scaleFontSize: 14,

				// String - Scale label font weight style
				scaleFontStyle: "normal",

				// String - Scale label font colour
				scaleFontColor: "#000",

				// Boolean - whether or not the chart should be responsive and resize when the browser does.
				responsive: true,

				// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
				maintainAspectRatio: true,

				// Boolean - Determines whether to draw tooltips on the canvas or not
				showTooltips: true,

				// Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
				customTooltips: false,

				// Array - Array of string names to attach tooltip events
				tooltipEvents: ["mousemove", "touchstart", "touchmove"],

				// String - Tooltip background colour
				tooltipFillColor: "rgba(0,0,0,0.8)",

				// String - Tooltip label font declaration for the scale label
				tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Tooltip label font size in pixels
				tooltipFontSize: 14,

				// String - Tooltip font weight style
				tooltipFontStyle: "normal",

				// String - Tooltip label font colour
				tooltipFontColor: "#fff",

				// String - Tooltip title font declaration for the scale label
				tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Tooltip title font size in pixels
				tooltipTitleFontSize: 14,

				// String - Tooltip title font weight style
				tooltipTitleFontStyle: "bold",

				// String - Tooltip title font colour
				tooltipTitleFontColor: "#fff",

				// Number - pixel width of padding around tooltip text
				tooltipYPadding: 6,

				// Number - pixel width of padding around tooltip text
				tooltipXPadding: 6,

				// Number - Size of the caret on the tooltip
				tooltipCaretSize: 8,

				// Number - Pixel radius of the tooltip border
				tooltipCornerRadius: 6,

				// Number - Pixel offset from point x to tooltip edge
				tooltipXOffset: 10,

				// String - Template string for single tooltips
				tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %><%= '%' %>",

				// String - Template string for multiple tooltips
				multiTooltipTemplate: "<%= value %>",

				// Function - Will fire on animation progression.
				onAnimationProgress: function(){},

				// Function - Will fire on animation completion.
				onAnimationComplete: function(){}
			};

			function ifLocalStorageTrue(){

				if("localStorage" in window && window['localStorage'] !== null){
					return true;
				}else{
					alert('Sorry, There is no support for localStorage available on browser.');
					return false;
				}
			}

			var returnObj = {
				chartLabels : chartLabels,
				chartColour : chartColour,
				chartOptions : chartOptions
			}
			return returnObj;
		}
    }
})();