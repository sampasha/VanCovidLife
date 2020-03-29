from flask import Flask, render_template, request
import requests
import requests_toolbelt.adapters.appengine
requests_toolbelt.adapters.appengine.monkeypatch()

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('home.html')

@app.route('/traffic')
def traffic():
    return render_template('maps.html')

@app.route('/find')
def parse():
    name = request.args.get('name')
    addr =request.args.get('addr')

    master_json = requests.get('https://grocery-vancovid.firebaseio.com/master-data.json')
    master_json = master_json.json()
    coord_json = {}

    for item in master_json:
        if item is not None:
            if item['name'] == name and item['addr'] == addr:
                coord_json['lat'] = item['lat']
                coord_json['lon'] = item['lon']

    return '''<h1>The name value is: {}</h1>
              '''.format(coord_json)
    return None






if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
