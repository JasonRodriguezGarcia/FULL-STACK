import requests
import inflection
#import bs4
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

#        print (cadena)
# urls = sopita.find_all ("a")
#for num in range(0, len(urls)):
#    print (urls[num])
#    cadena=urls[num]
#    query=str(cadena).index('">')+2
#    query2=str(cadena).index("</")
#    cadena2=str(cadena)[query:query2]
#    cadena=urls[num]
#    cadena2=str(cadena)[str(cadena).index('">')+2:str(cadena).index("</")]
#    cadena2=str(cadena)[str(cadena).index('/posts/')+7:str(cadena).index(">")]
#    print (cadena2)
#    print ("************************")
