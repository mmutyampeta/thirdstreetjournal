from langchain_community.vectorstores.pinecone import Pinecone as LCPinecone 
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_community.utilities.google_search import GoogleSearchAPIWrapper
from langchain_community.utilities.google_finance import GoogleFinanceAPIWrapper
from langchain_community.tools.google_finance.tool import GoogleFinanceQueryRun
from langchain_community.tools.vectorstore.tool import VectorStoreQATool 
from langchain_community.tools.google_search import GoogleSearchRun
from langchain import hub
from pinecone import Pinecone
import requests
import json
import yfinance as yf
from langchain.tools import tool

def setup():
    google_search_results_tool = GoogleSearchRun(api_wrapper=GoogleSearchAPIWrapper(google_api_key='AIzaSyAqhEWjl7yonml9xTD3GE0OClnNdRyWQJM',
                                                                                google_cse_id='401842a4afba24456'))
    google_finance_tool = GoogleFinanceQueryRun(api_wrapper=GoogleFinanceAPIWrapper(serp_search_engine='google_finance', serp_api_key='4737ac48553b764ce432562329e495e24cc8edcf627df19d924a58528fd8f661'))

    pc = Pinecone(api_key='ed95f018-c846-4cd6-b05a-d05b40a36cd8')
    index = pc.Index('myindex')

    embed = OpenAIEmbeddings(model='text-embedding-ada-002', 
                            openai_api_key='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'
                            )

    vectorstore = LCPinecone(index, embed, 'text')

    # print(len(vectorstore.similarity_search('', k=999)))

    llm = ChatOpenAI(model_name='gpt-3.5-turbo-1106', openai_api_key='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')

    memory = ConversationBufferMemory(memory_key='chat_history', 
                                    input_key='input', 
                                    output_key='output', 
                                    return_messages=True
                                    )

    prompt_template = '''System: Use the following pieces of context to answer the question at the end.
    If you don't know the answer, please think rationally and answer from your own knowledge base.
    When answering the question, do not mention that you are basing your responses off provided context; simply answer the question.
    ----------------
    {context}
    Question: {question}
    '''

    PROMPT = PromptTemplate(template=prompt_template, input_variables=['context', 'question'])

    chain_type_kwargs = {'prompt': PROMPT}

    vectorstore_tool = VectorStoreQATool(llm=llm, vectorstore=vectorstore, description='When you need to access information about finance, business, etc that you don\'t know about, but think it could be included in news articles.', name='article_search', chain_type_kwargs=chain_type_kwargs, return_source_documents=True)

    @tool('stock_data')
    def stock_data(ticker: str):
        '''Fetch stock ticker data.'''
        data = yf.Ticker(ticker)
        return json.dumps({'info': data.info, 'dividends': data.dividends.to_json()})
        

    @tool('stock_screener')
    def stock_screener(market_cap_more_than=None, market_cap_less_than=None, price_more_than=None, price_less_than=None, beta_more_than=None, beta_less_than=None, volume_more_than=None, volume_less_than=None, dividend_more_than=None, dividend_less_than=None, is_etf=False, is_actively_trading=True, sector=None, industry=None, country='US', exchange=None, limit=10):
        '''Fetch stock screening data from the FMP API.'''
        params = {
            'apikey': 'Nw4ALC561V1wW3ItwLzqF9TgEjFmtspx',
            'marketCapMoreThan': market_cap_more_than,
            'marketCapLowerThan': market_cap_less_than,
            'priceMoreThan': price_more_than,
            'priceLowerThan': price_less_than,
            'betaMoreThan': beta_more_than,
            'betaLowerThan': beta_less_than,
            'volumeMoreThan': volume_more_than,
            'volumeLowerThan': volume_less_than,
            'dividendMoreThan': dividend_more_than,
            'dividendLowerThan': dividend_less_than,
            'isEtf': is_etf or False,
            'isActivelyTrading': is_actively_trading or True,
            'sector': sector,
            'industry': industry,
            'country': country or 'US',
            'exchange': exchange,
            'limit': limit or 1
        }

        params = {k: v for k, v in params.items() if v is not None}
        response = requests.get('https://financialmodelingprep.com/api/v3/stock-screener', params=params)
        return json.dumps(response.json())


    functions_prompt = hub.pull('hwchase17/openai-functions-agent')

    tools = [stock_screener, vectorstore_tool, stock_data, google_search_results_tool]
    agent = create_openai_functions_agent(llm, tools, functions_prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, memory=memory, handle_parsing_errors='Sorry, I did not understand your message. Please try again with a different wording.', verbose=False)

    return agent_executor

def query(message, bot):
    return bot.invoke({'input': message})

# print(agent_executor.invoke({'input': 'what is the SOXX close price?'}))
# print(agent_executor.invoke({'input': 'would you buy soxx?'}))
# print(agent_executor.invoke({'input': 'what does this mean for the economy'}))
# print(agent_executor.invoke({'input': 'did the fed cut rates this month?'}))