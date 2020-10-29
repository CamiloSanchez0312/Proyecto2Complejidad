import subprocess
import json as js
from flask import Flask, jsonify, make_response,request

app = Flask(__name__)

rutaMinizinc = '/home/juancamilo/Cursos/2020-2/Complejidad/MiniZincIDE-2.5.0-bundle-linux-x86_64/bin/minizinc'

@app.route('/', methods=['POST'])
def makeDatos():
    capt = request.json['CapT']
    caph = request.json['CapH']
    capn = request.json['CapN']
    ct = request.json['Ct']
    ch = request.json['Ch']
    cn = request.json['Cn']
    n = request.json['n']
    s = request.json['S']
    dsi = request.json['dsi']
    data = 'CapT='+capt+';\nCapH='+caph+';\nCapN='+capn+';\nCt='+ct+';\nCh='+ch+';\nCn='+cn+';\nn='+n+';\nS='+s+';\ndsi='+dsi
    f = open ('datos.dzn','w')
    f.write(data.rstrip())
    f.close()
    solns = subprocess.check_output([rutaMinizinc,'--solver','COIN-BC','../PlantaEnergia.mzn','datos.dzn']).decode()
    pos = solns.find('\n----------\n==========\n')
    if pos == -1:
        return jsonify(response='Unsatisfiable')
    else:
        solns = solns[:pos+1].rstrip()
        #return jsonify(solns)
        posH = solns.find('Hi:')
        posN = solns.find('Ni:')
        posT = solns.find('Ti:')
        posF = solns.find('f:')
        return jsonify(Hi=solns[posH+3:posN],Ni=solns[posN+3:posT],Ti=solns[posT+3:posF], f=solns[posF+2:])

if __name__ == '__main__':
        app.run(debug = True, host='0.0.0.0')
