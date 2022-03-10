function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //Thanks to the following for help:
// * https://codepen.io/johnludena/pen/JvMvzB
// * https://codepen.io/jenning/pen/JZzeJW

var data = {
  headerText: "Lion Bot ✨",
  pText: "Ask me your mental health questions!",
  p2Text: "Based on real life conversational data",
  userMessages: [],
  botMessages: [],
  botGreeting: "oh hi! How are you?",
  botLoading: false };


class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "updateUserMessages",




    newMessage => {
      if (!newMessage) {
        return;
      }

      var updatedMessages = this.state.userMessages;

      var updatedBotMessages = this.state.botMessages;

      this.setState({
        userMessages: updatedMessages.concat(newMessage),
        botLoading: true });
        let data = {question: newMessage};

        fetch("/chat_response", {
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
          this.setState({
            botMessages: updatedBotMessages.concat(data["response"]),
            botLoading: false })
        }).
      catch(error => {
        console.log("ERROR:", error);
        this.setState({
          botMessages: updatedBotMessages.concat('?'),
          botLoading: false });

      });
    });_defineProperty(this, "scrollBubble",

    element => {
      if (element != null) {
        element.scrollIntoView(true);
      }
    });_defineProperty(this, "showMessages",

    () => {
      var userMessages = this.state.userMessages;
      var botMessages = this.state.botMessages;

      var allMessages = [];

      var i = 0;
      for (; i < userMessages.length; i++) {
        if (i === userMessages.length - 1) {
          //if bot replied to last message
          if (botMessages[i]) {
            allMessages.push( /*#__PURE__*/React.createElement(UserBubble, { message: userMessages[i] }));
            allMessages.push( /*#__PURE__*/
            React.createElement(BotBubble, { message: botMessages[i], thisRef: this.scrollBubble }));

          } else {
            allMessages.push( /*#__PURE__*/
            React.createElement(UserBubble, { message: userMessages[i], thisRef: this.scrollBubble }));

          }
          break;
        }

        allMessages.push( /*#__PURE__*/React.createElement(UserBubble, { message: userMessages[i] }));
        allMessages.push( /*#__PURE__*/React.createElement(BotBubble, { message: botMessages[i] }));
      }

      allMessages.unshift( /*#__PURE__*/
      React.createElement(BotBubble, {
        message: this.state.botGreeting,
        thisRef: i === 0 ? this.scrollBubble : "" }));



      return /*#__PURE__*/React.createElement("div", { className: "msg-container" }, allMessages);
    });_defineProperty(this, "onInput",

    event => {
      if (event.key === "Enter") {
        var userInput = event.target.value;

        this.updateUserMessages(userInput);
        event.target.value = "";
      }

      if (event.target.value != "") {
        event.target.parentElement.style.background = 'rgba(69,58,148,0.6)';
      } else
      {
        event.target.parentElement.style.background = 'rgba(255, 255, 255, 0.6)';
      }
    });_defineProperty(this, "onClick",

    () => {
      var inp = document.getElementById("chat");
      var userInput = inp.value;

      this.updateUserMessages(userInput);
      inp.value = "";
    });this.state = data;}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "app-container" }, /*#__PURE__*/
      React.createElement(Header, {
        headerText: this.state.headerText,
        pText: this.state.pText,
        p2Text: this.state.p2Text }), /*#__PURE__*/

      React.createElement("div", { className: "chat-container" }, /*#__PURE__*/
      React.createElement(ChatHeader, null),
      this.showMessages(), /*#__PURE__*/
      React.createElement(UserInput, { onInput: this.onInput, onClick: this.onClick }))));



  }}


class UserBubble extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "user-message-container", ref: this.props.thisRef }, /*#__PURE__*/
      React.createElement("div", { className: "chat-bubble user" },
      this.props.message)));



  }}


class BotBubble extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "bot-message-container", ref: this.props.thisRef }, /*#__PURE__*/
      React.createElement("div", { className: "bot-avatar" }), /*#__PURE__*/
      React.createElement("div", { className: "chat-bubble bot" },
      this.props.message)));



  }}


var Header = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "header" }, /*#__PURE__*/
    React.createElement("div", { className: "header-img" }), /*#__PURE__*/
    React.createElement("h1", null, " ", props.headerText, " "), /*#__PURE__*/
    React.createElement("h2", null, " ", props.pText, " "), /*#__PURE__*/
    React.createElement("p", null, " ", props.p2Text, " ")));


};

var ChatHeader = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "chat-header" }, /*#__PURE__*/
    React.createElement("div", { className: "dot" }), /*#__PURE__*/
    React.createElement("div", { className: "dot" }), /*#__PURE__*/
    React.createElement("div", { className: "dot" })));


};

var UserInput = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "input-container" }, /*#__PURE__*/
    React.createElement("input", {
      id: "chat",
      type: "text",
      onKeyPress: props.onInput,
      placeholder: "type something" }), /*#__PURE__*/

    React.createElement("button", { className: "input-submit", onClick: props.onClick })));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));