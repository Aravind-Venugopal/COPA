# import requests
#
# def fetch_copa_results():
#     print(searchterm)
#     APIKEY="35fa814a17486f668521924571d4d02b7a8f1533d2b595d2f9a075abb7919346"
#     APIUSERNAME="arvenugopal"
#     headers = {
#                 "Accept": "application/json; charset=utf-8",
#                 "Api-Key": APIKEY,
#                 "Api-Username": APIUSERNAME,
#             }
#
#     try:
#         r = requests.get('https://forum.cirruspilots.org/search?', params = {'q':searchterm}, headers = headers)
#         assert len(r.json()['topics'])>5
#     except:
#         r = requests.get('https://forum.cirruspilots.org/search/query.json?', params = {'term':searchterm},files={}, data={}, json={},allow_redirects=False, headers = headers)
#
#     data = r.json()
#     # posts = pd.DataFrame(data['posts'])
#     # topics = pd.DataFrame(data['topics'])
#     # posts.drop(['id','created_at'], axis = 1, inplace = True)
#     # results = pd.concat([posts, topics], axis = 1)
#     return 'sample_text'
#
#
# if __name__ == "__main__":
#     fetch_copa_results()

import pandas as pd, numpy as np
import requests, re, json, os, time, urllib, warnings
from bs4 import BeautifulSoup
from datetime import datetime
from fuzzywuzzy import process
from flask import Flask, jsonify, request

app = Flask(__name__)
yt = pd.read_csv('./COPAYoutubeData.csv').iloc[:,1:]
yt.fillna('', inplace=True)

@app.route('/fetchcopa', methods = ['GET'])
def fetch_copa_results():
    searchterm = request.args.get('searchterm')
    APIKEY="35fa814a17486f668521924571d4d02b7a8f1533d2b595d2f9a075abb7919346"
    APIUSERNAME="arvenugopal"
    headers = {
                "Accept": "application/json; charset=utf-8",
                "Api-Key": APIKEY,
                "Api-Username": APIUSERNAME,
            }

    try:
        r = requests.get('https://forum.cirruspilots.org/search?', params = {'q':searchterm}, headers = headers)
        assert len(r.json()['topics'])>5
    except:
        r = requests.get('https://forum.cirruspilots.org/search/query.json?', params = {'term':searchterm},files={}, data={}, json={},allow_redirects=False, headers = headers)

    data = r.json()
    # posts = pd.DataFrame(data['posts'])
    # topics = pd.DataFrame(data['topics'])
    # posts.drop(['id','created_at'], axis = 1, inplace = True)
    # results = pd.concat([posts, topics], axis = 1)
    return data

@app.route('/fetchavweb', methods = ['GET'])
def fetch_avweb_results():
    headers = {
    'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
    'content-type': "application/json",
    'accept': "application/json"
}
    searchterm = request.args.get('searchterm')
    avweb_url = 'https://www.avweb.com/'
    search_string = urllib.parse.urlencode({'s':searchterm})
    urls = [avweb_url+f'page/{i}/?'+search_string for i in range(1,2)]
    results = []
    for url in urls:
        page = len(results)
        r = requests.get(url, headers = headers)
        soup = BeautifulSoup(r.content, 'html.parser')
        page_res = [{
        'title': a.find('a')['title'],
        'rank': page+idx+1,
        'image': a.find('img', class_='entry-thumb')['data-src'],
        'link': a.find('a', href = True)['href'],
        'date': a.find('time')['datetime'].split('T')[0],
        'summary': a.find('div', class_='td-excerpt').text.strip(),
        'author': a.find('span',class_='td-post-author-name').find('a').text.strip(),
        'author_link': a.find('span',class_='td-post-author-name').find('a',href = True)['href']
    }
     for idx,a in enumerate(soup.find_all('div',class_ = re.compile(r'td_module_16.*')))]
        results.extend(page_res)
    return json.dumps(results)
    # results = pd.DataFrame(results)
    # render_avweb_results(results, searchterm)
@app.route('/fetchyt', methods = ['GET'])
def fetch_youtube_results():
    searchterm = request.args.get('searchterm')
    matches = [a for a,b in process.extract(searchterm,yt['title'].tolist())]
    results = yt.loc[yt['title'].isin(matches)]
    return results.to_json(orient='records')

if __name__ == '__main__':
    port = 8000 #the custom port you want
    app.run(host='0.0.0.0', port=port)
