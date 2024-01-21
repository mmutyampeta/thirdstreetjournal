from newsapi import NewsApiClient


newsapi = NewsApiClient(api_key='09cab20c6a4c42778ab9ced50a0a65e1')
# business = newsapi.get_everything(q='''(stocks OR markets OR finance OR investment OR banking OR fiscal) 
# OR 
# (economy OR inflation OR deflation OR trade) 
# OR 
# (technology OR software OR hardware OR tech) 
# OR 
# (AI OR robotics OR machinelearning OR neuralnetworks) 
# OR 
# (politics OR government OR elections OR legislation)
# OR
# (business OR entrepreneurship OR corporate OR markets)''')
business = newsapi.get_everything(q='finance', sort_by='popularity', domains='cnbc.com,forbes.com,reuters.com,bbc.co.uk,nytimes.com')
for entry in business['articles'][:500]:
    print(entry['source']['name'])
    print(entry['author'])
    print(entry['title'])
    print(entry['description'])
    print(entry['url'])
    print(entry['urlToImage'])
    print(entry['publishedAt'])
# print(business['articles'][0])

urls = [article['url'] for article in business['articles']]
# print(urls)