from newsapi import NewsApiClient


newsapi = NewsApiClient(api_key='09cab20c6a4c42778ab9ced50a0a65e1')
business = newsapi.get_everything(q='business')
for entry in business['articles'][:5]:
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