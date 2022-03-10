from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer, ListTrainer

import csv


def csv_to_train_data(csv_file_path, bot_col, resp_col):
    """
    Converts csv to training data
    """
    with open(csv_file_path, encoding='utf-8') as f:
        csv_reader = csv.reader(f, delimiter=',')

        data = []
        for row in csv_reader:
            try:
                data.extend([row[resp_col], row[bot_col]])
            except:
                pass

    return data

def train_with_corpus(bot, corpus_path):
    """
    Trains the bot with YAML or JSON data
    """
    print(f'Starting training with: {corpus_path}')
    corpus_trainer = ChatterBotCorpusTrainer(bot)
    corpus_trainer.train(corpus_path)
    print(f'Finished training with: {corpus_path}')


def train_with_csv(bot, csv_path, bot_col=1, user_col=0):
    """
    Trains the bot with CSV data
    """
    print(f'Starting training with: {csv_path}')
    conversation = csv_to_train_data(csv_path, bot_col, user_col)
    trainer = ListTrainer(bot)
    i = 0
    while i < len(conversation):
        trainer.train([conversation[i], conversation[i + 1]])
        i += 2
    print(f'Finished training with: {csv_path}')

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
