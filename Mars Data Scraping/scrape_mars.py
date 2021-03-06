# Dependencies: 01-Ins_SoupIntro / 07-Ins_Splinter
# if __name__ == "__main__":

from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
import time
import tweepy

def init_browser():
    executable_path = {'executable_path':'/users/janette.bennett/downloads/chromedriver'}
    return browser = Browser('chrome', **executable_path, headless=True)


def scrape():
    # scrapes websites for Mars data and returns in dictionary
browser = init_browser()
mars_data = {}

#Visit the url for JPL Featured Space Image - https://mars.nasa.gov/news/
url = "https://mars.nasa.gov/news/"
browser.visit(url)


# Use Beautiful Soup to Scrape Page /07-Ins_Splinter
html = browser.html
soup = BeautifulSoup(html, 'html.parser')


#collect/extract the latest News Title and Paragraph Text. Assign the text to variables that you can reference later.
article = soup.find("div", class_="list_text")
news_p = article.find("div", class_="article_teaser_body").text
news_title = article.find("div", class_="content_title").text
news_date = article.find("div", class_="list_date").text
print(news_date)
print(news_title)
print(news_p)                    
mars_data["news_title"] = news_title
mars_data["news_p"] = news_p

#Visit the url for JPL Featured Space Image / https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars
jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
browser.visit(jpl_url)


#Use splinter to navigate the site and find the image url for the current Featured Mars Image and assign the url string to a variable called featured_image_url.
#Make sure to save a complete url string for this image.
jpl_html = browser.html
jpl_soup = BeautifulSoup(jpl_html, 'html.parser')

img_relative = jpl_soup.find('img', class_='thumb')['src']
image_path = f'https://www.jpl.nasa.give{img_relative}'
print(image_path)
mars_data["featured_image_url"] = image_path

#Visit the Mars Weather twitter account here and scrape the latest Mars weather tweet from the page. 
#Save the tweet text for the weather report as a variable called mars_weather.
#https://twitter.com/marswxreport?lang=en
#07 Social Analytics - Ins_Get_Home_Tweets.ipynb


# Import Twitter API Keys
from config import consumer_key, consumer_secret, access_token, access_token_secret


# Setup Tweepy API Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
target_user = "MarsWxReport"
full_tweet = api.user_timeline(target_user, count = 1)
mars_weather=full_tweet[0]['text']
mars_weather

mars_data["weather_summary"] = mars_weather

#Visit the Mars Facts webpage https://space-facts.com/mars/ and use Pandas to scrape the table containing facts about the planet including Diameter, Mass, etc.
#Use Pandas to convert the data to a HTML table string.
#09-Ins_Pandas_Scraping


mars_url = 'https://space-facts.com/mars/'
mars_html = browser.html
mars_soup = BeautifulSoup(mars_html, 'html.parser')


mars_table = pd.read_html(mars_url)
mars_table


Mars_DF = mars_table[0]
Mars_DF

mars_html = mars_facts.to_html(header=false, index=False)
mars_data["fact_table"] = mars_html

#Visit the USGS Astrogeology site here to obtain high resolution images for each of Mar's hemispheres.
#You will need to click each of the links to the hemispheres in order to find the image url to the full resolution image.
#Save both the image url string for the full resolution hemisphere image, and the Hemisphere title containing the hemisphere name. 
#Use a Python dictionary to store the data using the keys img_url and title.
#Append the dictionary with the image url string and the hemisphere title to a list. 
#This list will contain one dictionary for each hemisphere.
#https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars


usgs_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
browser.visit(usgs_url)


usgs_html = browser.html
usgs_soup = BeautifulSoup(usgs_html, 'html.parser')
mars_hemis=[]


for i in range (4):
    images = browser.find_by_tag('h3')
    images[i].click()
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    partial = soup.find("img", class_="wide-image")["src"]
    img_title = soup.find("h2", class_="title").text
    img_url = 'https://astrogeology.usgs.gov' + partial
    dictionary={"title": img_title, "img_url":img_url}
    mars_hemis.append(dictionary)
    browser.back()



mars_data["mars_hemis"] = mars_hemis

browser.quit

return mars_data
