datos = ["David Guetta - Lovers On The Sun.mp3;musica",
		 	"Jugada Counter.ogv;video",
			"David Guetta - Memories.mp3;musica",
		 	"Pardito Rocket League.webm;video",
			"TEQUILA - Salta.mp3;musica",
			"chistes.webm;video"];

var BtnStop = document.getElementById("stop");
var pantallaFull = document.getElementById("Pantalla_completa");
var bloque = document.getElementById('vista');
var BtnCerrar = document.getElementById('salir');
var BtnNext = document.getElementById('next');
var clicko = true;
var minutos = 0;
var segundos = 0;
var pistaActual = 0;

//cargo los datos
for (var i = 0; i < datos.length; i++) {
	var dato = datos[i].split(';');

	var li = document.createElement('li');
	li.setAttribute('class', dato[1]);
	li.setAttribute('onclick', 'reproducir(this)');
	li.setAttribute('name',i);

	var img = document.createElement('img');
	img.setAttribute('src', 'img/' + dato[1] + '.svg');
	li.appendChild(img);

	var texto = document.createTextNode(dato[0]);
	li.appendChild(texto);

	lista.appendChild(li);
}

function reproducir(elemento) {
	var ventana = document.getElementById("ventana");
	pistaActual = elemento.getAttribute('name');
	
	var clase = document.getElementsByClassName(" reproduce");
	for (var i = 0; i < clase.length; i++) {
		clase[i].className = clase[i].className.replace(" reproduce", "");
	}

	if (elemento.className == "musica") {
		var audio = '<audio id="reproductor" src="/musica/' + elemento.innerText + '"></audio>';

		var p = document.createElement('p');
		p.setAttribute('class', 'tituloMusica');

		var h1 = document.createElement('h1');
		var textoh1 = document.createTextNode('Reproduciendo:');
		
		var img = document.createElement('img');
		img.setAttribute('src','/img/reproducir.svg');
		img.setAttribute('class','iconoMusica');
		
		h1.appendChild(img);
		h1.appendChild(textoh1);

		var h4 = document.createElement('h4');
		var textoh4 = document.createTextNode(elemento.innerText);
		h4.appendChild(textoh4);

		p.appendChild(h1);
		p.appendChild(h4);

		document.getElementById('ventana').innerHTML = audio;
		document.getElementById('ventana').append(p);
		document.getElementById('ventana').className = "fondo1";

	} else {
		ventana.innerHTML = '<video id="reproductor"><source src="/video/' + elemento.innerText + '" type="video/mp4"><br><track kind="subtitles" label="Español" src="/video/chistes.vtt"  srclang="es" default></strack></video>';
		document.getElementById('ventana').className = "fondo2";

		if(parseInt(elemento.getAttribute('name'))==5){
		   document.getElementById("reproductor").textTracks[0].mode = 'showing';
		   }else{
			   document.getElementById("reproductor").textTracks[0].mode = 'hidden';
		   }		
	}

	document.getElementById('mislider').value = 1;
	elemento.className += " reproduce";
	clicko=true;
	document.getElementById("stop").setAttribute('src', '/img/play.svg');
}

//funcionalidades a los controles
lista = document.getElementById('lista');

//volumen
var volumen = document.getElementById('mislider');
volumen.addEventListener("change", function (ev) {
	var reproductor = document.getElementById("reproductor");
	reproductor.volume = ev.currentTarget.value;
}, true);

//play pause
BtnStop.addEventListener('click', function () {
	var vid = document.getElementById("reproductor");
	if (vid != null) {
		if (clicko) {
			vid.play();
			BtnStop.setAttribute('src', '/img/pausa.svg');
			clicko = false;
		} else {
			clicko = true;
			vid.pause();
			BtnStop.setAttribute('src', '/img/play.svg');
		}
	}
});

BtnNext.addEventListener('click', function () {
	var vid = document.getElementById("reproductor");
	vid.currentTime += 5;
});

pantallaFull.addEventListener('click', function () {

	if (bloque.requestFullscreen) {
		bloque.requestFullscreen();
	} else {
		bloque.webkitRequestFullscreen();
	}
	BtnCerrar.setAttribute('style', 'display:block');
});

BtnCerrar.addEventListener('click', function () {
	BtnCerrar.setAttribute('style', 'display:none');
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
});

setInterval('actualizaTiempo()', 100);
function actualizaTiempo() {
	var vid = document.getElementById("reproductor");
	
	if (vid != null) {
		var min = document.getElementById('minuto');
		var total = document.getElementById('tiempoTotal');
		segundo = vid.currentTime;
		min.textContent = Math.round(segundo);
		total.textContent = Math.round(vid.duration);
	}
}

setInterval('cambiarPista()', 1000);
function cambiarPista(){
	var dato = document.getElementById('reproductor');
	var actual = document.getElementsByClassName('reproduce')[0];
	var name = actual.getAttribute('name');
	
	if(dato.currentTime >= dato.duration){		
		name++;		
		if(name == 6){
			name=0;
		}		
		document.getElementsByName(name)[0].click();		
	}
}

