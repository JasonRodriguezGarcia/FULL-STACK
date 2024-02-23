import requests
import inflection
from bs4 import BeautifulSoup

def pulir_cadena(cadena_a_pulir):
    return inflection.titleize(cadena_a_pulir)

r = requests.get ("http://www.dailysmarty.com/topics/python")
sopita = BeautifulSoup(r.content, features="html.parser")
for indice in sopita.find_all('a'):
    if '/posts/' in str(indice.get('href')):
        cadena= str(indice.get('href'))
        cadena = cadena[str(cadena).index('/posts/')+7:]
        print(pulir_cadena(cadena))       

#### final solution
import requests
from bs4 import BeautifulSoup
from inflection import titleize

def title_generator(links):
    titles = []

    def post_formatter(url):
        if 'posts' in url:
            url = url.split('/')[-1]
            url = url.replace('-', ' ')
            url = titleize(url)
            titles.append(url)

# UPDATED CODE
    for link in links:
        if link.get('href') == None:
            continue
        else:
            post_formatter(link.get("href"))
# UPDATED CODE

    return titles


r = requests.get('http://www.dailysmarty.com/topics/python')
soup = BeautifulSoup(r.text, 'html.parser')
links = soup.find_all('a')
titles = title_generator(links)

for title in titles:
    print(title)