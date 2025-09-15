from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/songs")
def songs_api():
    with open('static/json/songs.json') as f:
        data = json.load(f)

    category = request.args.get('category')
    if category and category != "all":
        data = data.get(category)
    
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug= True)