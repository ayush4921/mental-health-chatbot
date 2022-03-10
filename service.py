from chatterbot import ChatBot

BOT_NAME = 'LionBot'
BYE_LIST = [
    'Bbyee! See ya later.',
    'Talk to you soon!',
    'See ya! Take care of yourself',
]


def create_bot():
    """
    Creates the chat bot
    """
    bot = ChatBot(BOT_NAME,
                  storage_adapter='chatterbot.storage.SQLStorageAdapter',
                  logic_adapters=[{
                      'import_path': 'chatterbot.logic.BestMatch',
                      'default_response':'I am sorry, but I do not understand. ',
                      'maximum_similarity_threshold': 0.90
                  }])
    return bot


def get_response(bot,input):
    """
    Starts and take responses from the chat bot
    """
        
    response = bot.get_response(input)
    return response
