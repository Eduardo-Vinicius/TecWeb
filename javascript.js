const app = document.getElementById('raiz');
const lg = document.createElement('img');
lg.src = 'logo.png'
app.appendChild(lg);

const contenedor = document.createElement('div');
contenedor.setAttribute('class', 'container');
app.appendChild(contenedor);

for (var i = 0; i < 20; i++) {

	var h1 = documnt.createElement('h1')
	h1.textContent = 'Titulo';
	contenedor.appendChild(h1)

	var p1 = document.createElement('p')
	p1.textContent = 'Descrição';
	contenedor.appendChild(p1);	
}