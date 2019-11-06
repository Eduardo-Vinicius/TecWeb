from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

#configuar banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bancoDeDados.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# criar classe definicao do modelo

class Apontamento(db.Model):
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	nome_usuario = db.Column(db.String(15), nullable=True)
	data = db.Column(db.DateTime, default=datetime.utcnow)

	@property
	def serializar(self):
		return {
				'id': self.id,
				'nome_usuario': self.nome_usuario,
				'data': str(self.data)[11:16]
			}	


@app.route('/inicio')
def inicio():
	return render_template('index.html')

@app.route('/api/funcionarios', methods=['GET', 'POST'])
def funcionarios():
	if request.method == 'POST':
		func = Apontamento(nome_usuario = request.form['nome'].upper())
		db.session.add(func)
		db.session.commit()
		return render_template('index.html')
	
	if request.method == 'GET':
		consulta_func = Apontamento.query.order_by(-Apontamento.id).limit(10).all()
		return jsonify(funcionarios=[i.serializar for i in consulta_func])


@app.route('/sobre')
def sobre():
	return render_template('sobre.html')

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')