# Segunda parte del proyecto del curso Complejidad y Optimización

## Autores:
    - SANTIAGO RODRIGUEZ PENAGOS	1670706
    - JUAN CAMILO SÁNCHEZ BARREIRO	1527749

## Asignatura:
    - Complejidad y Optimización
    - Universidad del Valle 2020-I

## Ejecución:
para esto debe tener instalado el software Minizinc
'''
git clone https://github.com/CamiloSanchez0312/Proyecto2Complejidad
cd Proyecto2Complejidad
cd PlantaGUIFuentes
Debe ingresar al archivo server.py y modificar la variable rutaMinizinc por la ruta donde tiene instalado el Minizinc en su computador
Ej: rutaMinizinc= '.../MiniZincIDE-2.5.0-bundle-linux-x86_64/bin/minizinc'
python3 -m venv env
source env/bin/activate
pip3 install flask
export FLASK_APP=server.py
flask run
'''
