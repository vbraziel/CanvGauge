define( ["jquery","./properties","./initialproperties","./gauge.min"], function ( $, props, initProps ) {
	'use strict';
  
  		// ---------------------------------------------------------------------------------------
		// Util Functions
		// ---------------------------------------------------------------------------------------
  
  		function isEmpty(str) {
		  return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
		}
  
  		// ---------------------------------------------------------------------------------------
		// Create Element Function
		// ---------------------------------------------------------------------------------------
  
  		function render ($element, layout ) {
		  
		  	//-----------------------------------------------------------------
			// VARIABLES
			//-----------------------------------------------------------------
		  
		  	// Assign the extension object to a local variable
		  	var self = this;
		  
		  	// Init html var
			var	html = " ";
		  
		  	// Create the gauge ID for this control
			var gauge_id = 'CanvGauge_' + layout.qInfo.qId;
		  
		  
		  	// Check data
			if(layout.qHyperCube.qDataPages[0].qMatrix.length) {
              
				$.each(layout.qHyperCube.qDataPages[0].qMatrix, function(key, row) {

				  var  GaugeValue = row[0].qNum;
				  //layout.qHyperCube.qGrandTotalRow[0].qNum
		  
		  
				  //-----------------------------------------------------------------
				  // RENDERING CODE START
				  //-----------------------------------------------------------------
				
				  // Check if Canvas element exist
				  if (document.getElementById(gauge_id)) {
					  $("#" + gauge_id).empty();
				  } else {
					  $element.append($('<canvas />').attr('id', gauge_id));
				  }
						  
				  /*******************************************************************
				  * Based on;
				  * Pure HTML5/JavaScript gauge implementation
				  * @author Smart-IP.net
				  * @license MIT
				  * @see http://smart-ip.net/gauge.html
				  ******************************************************************/
				  
				  //-----------------------------------------------------------------
				  // VARIABLES GAUGE SUPPORT
				  //-----------------------------------------------------------------
				  
				  // Show Units Sub-title
				  if (layout.showunits) {
					  var l_units_sub = layout.units;
				  } else {
					  var l_units_sub = layout.showunits;
				  }
				  
				  // Show Gauge Title
				  if (layout.showgaugetitle) {
					  var l_title_show = layout.gaugetitle;
				  } else {
					  var l_title_show = layout.showgaugetitle;
				  }
				  
				  // Major Ticks Values
				  if (isEmpty(layout.majorticksvals)) {
					  var l_majorTicks  = new Array();
				  } else {
					  var l_majorTicks  = layout.majorticksvals.split(",");
				  }
				  
				  // Highlights settings
				  if (layout.highlightsdefault) {
					
					var l_highlights_str = '[';
					
					if (!isEmpty(layout.highlights1)) { l_highlights_str +=	 ' {' + layout.highlights1 + '}'; }
					if (!isEmpty(layout.highlights2)) {	l_highlights_str +=	 ',{' + layout.highlights2 + '}'; }
					if (!isEmpty(layout.highlights3)) {	l_highlights_str +=	 ',{' + layout.highlights3 + '}'; }
					if (!isEmpty(layout.highlights4)) {	l_highlights_str +=	 ',{' + layout.highlights4 + '}'; }
					if (!isEmpty(layout.highlights5)) {	l_highlights_str +=	 ',{' + layout.highlights5 + '}'; }
					if (!isEmpty(layout.highlights6)) {	l_highlights_str +=	 ',{' + layout.highlights6 + '}'; }
					if (!isEmpty(layout.highlights7)) {	l_highlights_str +=	 ',{' + layout.highlights7 + '}'; }
					if (!isEmpty(layout.highlights8)) {	l_highlights_str +=	 ',{' + layout.highlights8 + '}'; }
					if (!isEmpty(layout.highlights9)) {	l_highlights_str +=	 ',{' + layout.highlights9 + '}'; }
					
					l_highlights_str += ']';
					
					var l_highlights = $.parseJSON(l_highlights_str);
					
				  } else {
					var l_highlights = false;
				  }
				  
				  //color settings
				  var l_color_str = '{';
				  
				  l_color_str += '"plate"      : "' + layout.plate + '" ,';
				  l_color_str += '"majorTicks" : "' + layout.majorticks + '" ,';
				  l_color_str += '"minorTicks" : "' + layout.minorticks + '" ,';
			      l_color_str += '"title"      : "' + layout.colorgaugetitle + '" ,';
				  l_color_str += '"units"      : "' + layout.colorunits + '" ,';
				  l_color_str += '"numbers"    : "' + layout.numbers + '" ';
				  
				  // Needle color settings
				  if (layout.needledefault) {
					l_color_str += ',"needle"     : { "start" : "' + layout.needlestart + '", "end" : "' + layout.needleend + '" }';
				  } 
				  
				  l_color_str += '}';
				  
				  var l_color  = $.parseJSON(l_color_str);
				  
				  
				  // Needle animation settings
				  var l_animation_str = '{';
				  
				  if (layout.needleanim) {
					l_animation_str += '"delay"     : "' + layout.needledelay + '" ,';
					l_animation_str += '"duration"  : "' + layout.needleduration + '" ,';
					l_animation_str += '"fn"      	: "' + layout.needlestyle + '" ';
				  } else {
					l_animation_str += '"delay"     : "50" ,';
					l_animation_str += '"duration"  : "500" ,';
					l_animation_str += '"fn"      	: "elastic" ';
				  }
					
				  l_animation_str += '}';
				  
				  var l_animation  = $.parseJSON(l_animation_str);
								  
				  //-----------------------------------------------------------------
				  // GAUGE CONFIG
				  //-----------------------------------------------------------------
				  
				  				  
				  var gauge = new Gauge({
					renderTo  	: gauge_id,
					
					// Gauge size
					width       : $element.width(),
					height      : $element.height(),
					
					// Glow setting
					glow        : layout.glow,
					
					// Show Units Sub-title
					units       : l_units_sub,
					
					// Show Gauge Title
					title       : l_title_show,
					
					// Gauge values settings
					minValue    : layout.minvaluerange,
					maxValue    : layout.maxvaluerange,
					
					// Ticks Values
					majorTicks  : l_majorTicks,
					minorTicks  : layout.nminorticks,
					strokeTicks : layout.stroketicks,
					valueFormat : { int : layout.formatint, dec : layout.formatdec  },
					
					// Highlights settings
					highlights  : l_highlights,
		  
					// Gauge color gettings 
					colors      : l_color,
					
					// Animation settings
					animation 	: l_animation
				 });
				  
				 gauge.onready = function() {
						gauge.setValue(GaugeValue);
				 };
				  
				 gauge.draw();
				  
				});
			  
			}
		  
		}
  
  		// ---------------------------------------------------------------------------------------
		// All Together
		// ---------------------------------------------------------------------------------------
  
  		return {
			// Properties and Initial Properties
			definition: props,
			initialProperties: initProps,
			snapshot: { canTakeSnapshot: false },
				
		  	// When Resize Element
			resize: function ( $element, layout ) {
				render( $element, layout );
			},
		  
		  	// Paint Element
			paint: function ( $element, layout ) {
				render( $element, layout );
			}
		};

});