# import necessary libraries
from flask import Flask, render_template, redirect
import flask_pymongo
import scrape_mars

# create instance of Flask app
app = Flask(__name__)

# create mongo connection

mongo=PyMongo(app, uri="mongodb://localhost:27017/mars_app")

@app.route("/")
def index():
    mars_data = mongo.db.mars.find_one()
    return  render_template('index.html', mars_data=mars_data)

@app.route('/scrape')
def scrape():
    mars_data = mongo.db.mars
    data = scrape_mars.scrape()
    mars.update(
    	{},
    	data,
    	upsert=True
    	)
    return  render_template('scrape.html')

if __name__ == "__main__":
    app.run(debug=True)