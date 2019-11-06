function atualizaRelogio(){
	var hoje = new Date();
	var h = hoje.getHours();
	if(h < 10)
		h = '0' + h;
	var m = hoje.getMinutes();
	if(m < 10)
		m = '0' + m;
	var s = hoje.getSeconds();
	if(s < 10)
		s = '0' + s;
	var r = document.getElementById('relogio').innerHTML = h + ':' + m + ':' + s;
}

setInterval('atualizaRelogio();', 1000); // tempo em milisegundos

// trazer os dados do servidor na internet

const raiz = document.getElementById('lista');

var req = new XMLHttpRequest();
req.open('GET', 'http://localhost:5000/api/funcionarios');
req.onload = function() {
	var data = JSON.parse(this.response);
	data.funcionarios.forEach(elemento => {

		// console.log(elemento.usuario);
		// criamos uma linha da tabela
		var linha = document.createElement('tr');
		raiz.appendChild(linha);

		// criamos a coluna do nome do funcionario
		var funcionario = document.createElement('td');
		funcionario.textContent = elemento.nome_usuario;
		linha.appendChild(funcionario);

		// criamos a coluna com a hora que registrou o funcionario
		var hora = document.createElement('td');
		hora.textContent = elemento.data;
		linha.appendChild(hora);
	})
}

req.send();