from flask import render_template, request
import pandas as pd, numpy as np
import requests, re, json, os, time, urllib, warnings
from bs4 import BeautifulSoup
from datetime import datetime
from fuzzywuzzy import process

from app import app

selection = {'COPA': 'COPA Forum',
            'WikiBlog': 'Wiki and Blog',
            'Magazine': 'Magazine',
            'Youtube': 'COPA YouTube',
            'AVWeb': 'AV Web'}

headers = {
'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
'content-type': "application/json",
'accept': "application/json"
}

yt = pd.read_csv('COPAYoutubeData.csv').iloc[:,1:]
yt.fillna('', inplace=True)
global search_string
global selected_item
search_string = ''


@app.route('/',  methods=['POST', 'GET'])
def index():
    selected_item = 'COPA'
    selected = selection[selected_item]
    data = []
    if request.method == 'POST':
        search_string = request.form['search_string']
        # selected_item = request.form['selection']
        data = fetch_from_source(selected_item, search_string)
    elif request.method == 'GET':
        search_string = request.args.get('q')
        selected_item = request.args.get('selection')
        if selected_item is not None:
            selected = selection[selected_item]
            data = fetch_from_source(selected_item, search_string)

    return render_template("index.html", len = len(data), data=data, selection=selected, selected_item=selected_item)


@app.route('/ASRS/<acn>')
def get_asrs_report(acn):
    data = fetch_asrs_results(acn)
    return render_template("asrs_report.html", data=data, acn=acn)

@app.route('/COPAForum', methods=['GET'])
def search_copa():
    search_string = request.args.get('q')
    data = fetch_copa_results(search_string)
    return render_template("copaforum.html", len = len(data), data=data, search_string= search_string)

@app.route('/COPAWikiBlog', methods=['GET'])
def search_wikiblog():
    search_string = request.args.get('q')
    data = fetch_wikiblog_results(search_string)
    return render_template("wikiblog.html", len = len(data), data=data, search_string= search_string)

@app.route('/COPAYouTube', methods=['GET'])
def search_youtube():
    search_string = request.args.get('q')
    data = fetch_youtube_results(search_string)
    # data =
    return render_template("youtube.html", len = len(data), data=data, search_string= search_string)

@app.route('/COPAMagazine', methods=['GET'])
def search_magazine():
    search_string = request.args.get('q')
    data = fetch_magazine_results(search_string)
    return render_template("magazine.html", len = len(data), data=data, search_string= search_string)

@app.route('/AVWeb', methods=['GET'])
def search_avweb():
    search_string = request.args.get('q')
    data = fetch_avweb_results(search_string)
    return render_template("avweb.html", len = len(data), data=data, search_string= search_string)

@app.route('/ASRS', methods=['GET'])
def search_asrs():
    search_string = request.args.get('q')
    data = fetch_asrs_results(search_string)
    return render_template("asrs.html", len = len(data), data=data, search_string= search_string)

@app.route('/about')
def about():
    return render_template("about.html")

def fetch_copa_results(searchterm):
    # searchterm = search_string
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

def fetch_youtube_results(searchterm):
    # searchterm = request.args.get('searchterm')
    matches = [a for a,b in process.extract(searchterm,yt['title'].tolist())]
    results = yt.loc[yt['title'].isin(matches)]
    return results.to_json(orient='records')

def fetch_wikiblog_results(searchterm):
    url = 'http://search-wikiblog-gv65dajcbf5dxrsdwwrjyogvnm.us-west-1.cloudsearch.amazonaws.com/2013-01-01/search'
    res = requests.get(url,  params = {'q':searchterm}, headers=headers)
    return res.json()

def fetch_magazine_results(searchterm):
    url = 'http://search-magazine-0430-45r2xlihhxs5kqu25j2djuz7ea.us-west-1.cloudsearch.amazonaws.com/2013-01-01/search'
    res = requests.get(url,  params = {'q':searchterm}, headers=headers)
    return res.json()

def fetch_asrs_results(searchterm):
    # searchterm = 'cirrus' + searchterm
    url = 'http://search-arsr-vsmdyadzi6aefkfnlvybpi36yu.us-west-1.cloudsearch.amazonaws.com/2013-01-01/search'
    res = requests.get(url,  params = {'q':searchterm}, headers=headers)
    data = res.json()
    hits_count = len(data['hits']['hit'])
    complete_res = []
    for i in range(hits_count):
        reformat_data = pd.DataFrame(data['hits']['hit'][i]['fields']['report'].split('----'), columns=['fields'])
        reformat_data['key'] = reformat_data['fields'].apply(lambda x: get_key(x))
        reformat_data['content'] = reformat_data['fields'].apply(lambda x: get_content(x))
        complete_res.append(dict(zip(reformat_data['key'], reformat_data['content'])))
    return complete_res

def fetch_avweb_results(searchterm):
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
    return results

def get_key(field):
    try:
        key = field.split(':')[0]
    except:
        key = None
    return key

def get_content(field):
    try:
        content = field.split(':')[1]
    except:
        content = None
    return content

def get_avatar_url(url):
    avatar_url = 'https://sjc5.discourse-cdn.com/copa/user_avatar/forum.cirruspilots.org/'
    try:
        if '{size}' in url.split('/')[-2]:
            avatar_url = avatar_url + url.split('/')[-3] + '/90/' + url.split('/')[-1]
        else:
            avatar_url = avatar_url + 'unknownprevioususer/90/89805_2.png'
    except:
        avatar_url = avatar_url + 'unknownprevioususer/90/89805_2.png'
    return avatar_url
app.jinja_env.globals.update(get_avatar_url=get_avatar_url)

def blurb_highlighter(text, words):
    '''
    Highlight the search terms in each result blurb
    '''
    for word in words:
        pattern = re.compile(' '+word+' ')
        text = word.sub('<b> '+word+' </b>', text)
    return text
app.jinja_env.globals.update(blurb_highlighter=blurb_highlighter)
# app.jinja_env.filters['blurb_highlighter'] = blurb_highlighter
