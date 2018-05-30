/*************************

	MIXINS

*************************/

@include respond-to($breakpoint) {Your media query styles}
@include gradient-bg-linear($start-color, $end-color, $rotation: null);
@include line-clamp($lines, $height...);
@include vertical-center;
@include horizontal-center;
@include hv-center;
@include clearfix;

Responsive Type
@include responsive-typeII($fontsize, $displaytype, $lineheight: 'base', $sizeoverride: null);


Wood Mode Exclusive
@include full-bleed-row;
@include link--icon ($direction, $icon-name);
@include button--icon ($direction, $icon-name);


/*************************

	MAP FUNCTIONS - STRUCTURE LAYER

*************************/

breakpoint($breakpoint);
z($key);
margin($value);
padding($value);


/*************************

	MAP FUNCTIONS - THEME LAYER

*************************/

color($color, $tone: null, $function: null);
font-family($font);
font-size($size);
heading-size($size);
lh($size);
transition($speed);
radius($size);
border($style, $color: gray);
shadow($height, $color...);
text-shadow($height, $color);


/*************************

	UTILITY FUNCTIONS

*************************/

rem($number);
em($number);
pixel($number);
vh($number);
vw($number);
interpolate($value...);


/*************************

	CONSTRUCTOR

*************************/

@include construct($default: (), $modifier: ());
@include pseudo-constructor($modifier);
// map merge
extend($obj, $ext-obj);
@include constructor-type($modifier-map);
