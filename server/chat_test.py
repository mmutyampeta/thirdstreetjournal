from langchain_community.vectorstores.pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
import pinecone

def setup(pineKey, openKey):
    #pineconeKey = 'ed95f018-c846-4cd6-b05a-d05b40a36cd8'
    
    #openAIkey = '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'

    pineconeKey = pineKey
    openAI = openKey

    pc = pinecone.Pinecone(api_key = pineconeKey)
    index = pc.Index('myindex')

    embed = OpenAIEmbeddings(model='text-embedding-ada-002', 
                            openai_api_key=openAIkey
                            )

    vectorstore = Pinecone(index, embed.embed_query, 'text')
    llm = ChatOpenAI(model_name='gpt-3.5-turbo-1106', openai_api_key = openAIkey)
    memory = ConversationBufferMemory(memory_key='chat_history', 
                                    input_key='question', 
                                    output_key='answer', 
                                    return_messages=True
                                    )

    retriever = vectorstore.as_retriever()

    prompt_template = '''System: Use the following pieces of context to answer the question at the end. 
    If you don't know the answer, please think rationally and answer from your own knowledge base.
    ----------------
    {context}
    Question: {question}
    '''
    PROMPT = PromptTemplate(template=prompt_template, input_variables=['context', 'question'])

    chain_type_kwargs = {'prompt': PROMPT}

    bot = ConversationalRetrievalChain.from_llm(llm, 
                                                vectorstore.as_retriever(),
                                                memory=memory, 
                                                verbose=True,
                                                return_source_documents=True,
                                                combine_docs_chain_kwargs=chain_type_kwargs
                                                )

    return bot

def query(message, bot):
    return bot.invoke({'question': message})

def displayResults(result):
    for message in result['chat_history']:
        print(message.content)

pineconeKey = 'ed95f018-c846-4cd6-b05a-d05b40a36cd8'
openAIkey = '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'

# tempbot = setup(pineconeKey, openAIkey)
# query("what happened to elon musk", tempbot)
# returned = query("when did this happen", tempbot)
# displayResults(returned)


"""
result = bot.invoke({'question': 'what happened to elon musk'})
result = bot.invoke({'question': 'when did this happen'})
for m in result['chat_history']:
    print(m.content)
"""



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