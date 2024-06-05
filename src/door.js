import * as THREE from 'three';
/*Mb 79
Opening inward
Inside
44.5
5
75
22
1
*/




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

function qudrat(inner_width,outer_width,inner_height,outer_height,material){
inner_width*=0.01;
outer_width*=0.01;
inner_height*=0.01;
outer_height*=0.01;
	//top


var x=outer_width;
var y=outer_height-inner_height;
const topg = new THREE.BoxGeometry( x, y, 0 );
var top = new THREE.Mesh( topg, material );
top.position.x = 0;
top.position.y = inner_height/2;
scene.add( top );


//bottom

var x=outer_width;
var y=outer_height-inner_height;
const bottomg = new THREE.BoxGeometry( x, y, 0 );
var bottom = new THREE.Mesh( bottomg, material );
bottom.position.x = 0;
bottom.position.y = -inner_height/2;
scene.add( bottom );

		//left

var x=outer_width-inner_width;
var y=outer_height;
const leftg = new THREE.BoxGeometry( x, y, 0 );
var left = new THREE.Mesh( leftg, material );
left.position.x =  -inner_width/2;
left.position.y =0;
scene.add( left );

		//right

var x=outer_width-inner_width;
var y=outer_height;
const rightg = new THREE.BoxGeometry( x, y, 0 );
var right = new THREE.Mesh( rightg, material );
right.position.x =  inner_width/2;
right.position.y =  0;
scene.add( right );


}

var profile=
	{"Profile":"Mb 79",
"Direction of rotation":"Opening inward",
"View":"Inside",
"Frame":44.5,
"Gap":5,
"Wing":75,
"Glass strip":22,
"Seal":1};

var door_width=500;
var door_height=700;

//Frame
var outer_width=door_width;
var inner_width=outer_width-profile["Frame"];

var outer_height=door_height;
var inner_height=outer_height-profile["Frame"];

var profileMaterial = new THREE.MeshBasicMaterial( { color: 0x808080, side: THREE.DoubleSide } );
var shadow = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide } );
var seal = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide } );
var glass = new THREE.MeshBasicMaterial( { color: 0x7CB9E8, side: THREE.DoubleSide } );


qudrat(inner_width,outer_width,inner_height,outer_height,profileMaterial);


//Gap
var outer_width=inner_width;
var inner_width=outer_width-profile["Gap"];

var outer_height=inner_height;
var inner_height=outer_height-profile["Gap"];



 qudrat(inner_width,outer_width,inner_height,outer_height,shadow);



// wing

var outer_width=inner_width;
var inner_width=outer_width-profile["Wing"];


var outer_height=inner_height;
var inner_height=outer_height-profile["Wing"];

 qudrat(inner_width,outer_width,inner_height,outer_height,profileMaterial);




var small_line=1;
// Glass strip line / shadow

var outer_width=inner_width;
var inner_width=outer_width-small_line;



var outer_height=inner_height;
var inner_height=outer_height-small_line;

qudrat(inner_width,outer_width,inner_height,outer_height,shadow);


//glass strip
var outer_width=inner_width;
var inner_width=outer_width-(profile["Glass strip"]-small_line);

var outer_height=inner_height;
var inner_height=outer_height-(profile["Glass strip"]-small_line);

qudrat(inner_width,outer_width,inner_height,outer_height,profileMaterial);



//seal
var outer_width=inner_width;
var inner_width=outer_width-profile["Seal"];


var outer_height=inner_height;
var inner_height=outer_height-profile["Seal"];

 qudrat(inner_width,outer_width,inner_height,outer_height,seal);



//glass
var outer_width=inner_width;
var inner_width=0;


var outer_height=inner_height;
var inner_height=0;

 qudrat(inner_width,outer_width,inner_height,outer_height,glass);



camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );



	renderer.render( scene, camera );
}

animate();
