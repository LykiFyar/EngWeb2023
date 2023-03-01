import json
import os

def ordCidade(cidade):
    return cidade['nome']

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
ligações = mapa['ligações']
cidades.sort(key=ordCidade)

codes = {}
for c in cidades:
    codes[c['id']] = c['nome']

if not (os.path.exists("html")):
    os.makedirs("html")
    
# make index.html
pagHTML = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>Mapa Virtual</h1>
            <table>
                <tr>
                    <!-- Coluna do índice -->
                    <td width="30%" valign="top">
                        <a name="indice"/>
                        <h3>Índice</h3>
                        <ol>
    """

for c in cidades:
    pagHTML += f"<li><a href='/{c['id']}'>{c['nome']}</a></li>\n"

pagHTML += """
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """

with open("html/index.html", "w") as index:
    index.write(pagHTML)


# make html's for each city
for c in cidades: 
    pagHTML = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <center>
                <h1>Mapa Virtual</h1>
            </center>
            <table>
                <tr>
                    <td>
                        <a name="{c['id']}"/>
                        <h3>{c['nome']}</h3>

                        <p><b>População: </b>{c['população']}</p>
                        <p><b>Descrição: </b>{c['descrição']}</p>
                        <p><b>Distrito: </b>{c['distrito']}</p>
                        <center>
                            <hr width="80%"/>
                        </center>
                        <h4><b>Ligações</b></h4>
                        <p>
                        """
    for lig in ligações:
        if(lig['origem']==c['id']):
            curr = lig['destino']
        elif(lig['destino']==c['id']):
            curr = lig['origem']
        else: curr = ""
        
        if (curr!=""):
            pagHTML += f"""<a href="{curr}">{codes[curr]}</a> - Distância:{lig['distância']}<br>"""
            
    pagHTML += """</p>
                    <center>
                            <hr width="80%"/>
                        </center>
                        <address>[<a href="">Voltar ao índice</a>]</address>
                        
                    </td>
                </tr>
            </table>
        </body>
    </html>"""
    with open(f"html/{c['id']}.html", "w") as city:
        city.write(pagHTML)
    

