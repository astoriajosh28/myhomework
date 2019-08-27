#Import Dependencies
from splinter import Browser
import pandas as pd
from bs4 import BeautifulSoup as bs
import requests

#Initialize browser
def init_browser():
   executable_path = {'executable_path': 'chromedriver.exe'}
   return Browser('chrome', **executable_path, headless=False)

def scrape():
    browser = init_browser()
    mars_dict = {}

    url_news = 'https://mars.nasa.gov/news/'
    browser.visit(url_news)
    html = browser.html
    soup_news = bs(html, 'html.parser')

    news_title = soup_news.find("div", class_="content_title").text
    news_p = soup_news.find("div", class_="article_teaser_body").text

    mars_dict["news_title"] = news_title
    mars_dict["news_p"] = news_p

   ######################

    images_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(images_url)

    jpg_html = browser.html
    soup = bs(jpg_html, 'html.parser')
    nasa_image = soup.find("img", class_="thumb")["src"]
    featured_image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars" + nasa_image

    mars_dict["image"] = featured_image_url

    ######################

    twitter_url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(twitter_url)
    twitter_html = browser.html

    soup = bs(twitter_html, 'html.parser')
    #print(soup.prettify())

    tweets = soup.find_all('div', class_='js-tweet-text-container')

    for tweet in tweets: 
        weather = tweet.find('p').text
        if 'Sol' and 'pressure' in weather:
        print(weather)
        break
    else: 
        pass

    mars_dict['weather'] = weather

    ######################

url_facts = 'http://space-facts.com/mars/'
table_facts = pd.read_html(url_facts)
facts_df = table_facts[1]
facts_df.columns = ["description", "value"]
facts_df.set_index('Fact', inplace=True)
mars_dict['table'] = facts_df.to_html()

    ######################


    hem_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(hem_url)
    
    html = browser.html
    hemi_soup = bs(html, 'html.parser')

    hem_image_urls = []
    
    hem_links = soup.find_all("div", class_="item")

    for link in hem_links: 
        dictionary = {}
        hemi_title = link.find('h3').text
        subsequent_link = link.find("div", class_="description").a["href"]
        full_link = hemispheres_main_url + next_link
        browser.visit(full_link)
   
        html_image = browser.html
        image_soup = bs(html_image, 'html.parser')
    
        url_final = image_soup.find("img", class_="wide-image")["src"]
    
        dictionary["title"] = title
        dictionary["img_url"] = hemispheres_main_url + url_final
        hem_image_urls.append(dictionary)
    
        mars_dict['hemisphere'] = hem_image_urls

        return mars_dic










