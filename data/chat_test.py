from langchain_community.vectorstores.pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
import pinecone

pc = pinecone.Pinecone(api_key='ed95f018-c846-4cd6-b05a-d05b40a36cd8')
index = pc.Index('myindex')

embed = OpenAIEmbeddings(model='text-embedding-ada-002', 
                         openai_api_key='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'
                         )

vectorstore = Pinecone(index, embed, 'text')
llm = ChatOpenAI(model_name='gpt-4-1106-preview', openai_api_key='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')
memory = ConversationBufferMemory(memory_key='chat_history', 
                                  input_key='question', 
                                  output_key='answer', 
                                  return_messages=True
                                  )

retriever = vectorstore.as_retriever()

prompt_template = '''System: Use the following pieces of context to answer the question at the end.
If you don't know the answer, please think rationally and answer from your own knowledge base.
When answering the question, do not mention that you are basing your responses off provided context; simply answer the question.
If you are asked for current data (like stock price), answer with the most recent piece of information you know.
----------------
{context}
Question: {question}
'''
PROMPT = PromptTemplate(template=prompt_template, input_variables=['context', 'question'])

chain_type_kwargs = {'prompt': PROMPT}

bot = ConversationalRetrievalChain.from_llm(llm, 
                                            vectorstore.as_retriever(search_kwargs={'k':4}),
                                            memory=memory, 
                                            verbose=False,
                                            return_source_documents=True,
                                            combine_docs_chain_kwargs=chain_type_kwargs
                                            )

r = input('Prompt: ')
while True:
    if r.lower() in ['q', 'exit']: break
    result = bot.invoke({'question': r})
    print(result['chat_history'][-1].content)
    r = input('Prompt: ')

# qa = RetrievalQA.from_chain_type(llm=llm,
#                                  chain_type='stuff',
#                                  retriever=vectorstore.as_retriever()
#                                  )

# query = 'what is the integral of sec^2(x)'
# print(qa.invoke(query))

# print(vectorstore.similarity_search(
#     query,
#     k=1
# ))