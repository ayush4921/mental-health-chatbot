from flask import Flask, render_template, request, Markup
from flask_cors import CORS
from service import create_bot, get_response
from train import train_with_csv
from train import train_with_corpus
import os
app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def return_home():
    return render_template('index.html')

@app.route("/chat_response", methods=["GET","POST"])
def use_bot():

    question = request.get_json()["question"]
    print(question)
    bot = create_bot()
    if not os.path.exists(os.path.join(os.getcwd(),'db.sqlite3')):
        train_with_corpus(bot, 'chatterbot.corpus.english.greetings')
        train_with_corpus(bot, 'chatterbot.corpus.english.botprofile')
        train_with_corpus(bot, 'chatterbot.corpus.english.emotion')
        train_with_corpus(bot, 'chatterbot.corpus.english.gossip')
        train_with_corpus(bot, 'chatterbot.corpus.english.health')
        train_with_corpus(bot, 'chatterbot.corpus.english.psychology')
        train_with_csv(bot, './data/mental_health_faq.csv')
    response = get_response(bot,question)
    return {"response":str(response)}

if __name__ == "__main__":
    app.run(debug = True)
