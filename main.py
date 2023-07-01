from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

app.app_context().push()

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/market')
def store():
    return render_template('store.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

app.secret_key = "ThisIsNotASecret:p"

app.run(debug=True)