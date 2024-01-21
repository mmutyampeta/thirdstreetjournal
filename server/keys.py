def getKey(filename, key):
    file = open(filename, 'r')
    if key == "openai":
        return file.readlines()[0][:-1]
    elif key == "pinecone":
        return file.readlines()[1][:-1]
    elif key == "googlesearch":
        return file.readlines()[2][:-1]
    elif key == "googlefinance":
        return file.readlines()[3][:-1]
    elif key == "newsapi":
        return file.readlines()[4][:-1]
    file.close()

def getAllKeys(filename):
    file = open(filename, 'r')
    lines = file.readlines()
    return lines[0], lines[1], lines[2], lines[3], lines[4]
