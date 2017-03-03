var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');
var LoginSubcomponent = require('./LoginSubcomponent');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      myAppointments: [],
      emailUsername: '',
      password: ''
    } //return
  }, //getInitialState

  componentDidMount: function() {
    this.serverRequest = $.get('./js/data.json', function(result) {
      var tempApts = result;
      this.setState({
        myAppointments: tempApts
      }); //setState
    }.bind(this));
  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  deleteMessage: function(item) {
    var allApts = this.state.myAppointments;
    var newApts = _.without(allApts, item);
    this.setState({
      myAppointments: newApts
    }); //setState
  }, //deleteMessage

  mainHandleLogin: function(loginCredentials) {
    var subuserName = loginCredentials.userName;
    var subpassword = loginCredentials.password;
    console.log(subuserName);
    console.log(subpassword);
    /*this.setState( {      
      emailUsername : subuserName,  
      password: subpassword
    }); //setState */
    this.setState( {      
      emailUsername : subuserName,
      password : subpassword
      }); //setState 
  }, //mainHandleLogin

  render: function() {
    var filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map(function(item, index) {
      return(
        <AptList key = { index }
          singleItem = { item }
          whichItem = { item }
          onDelete = { this.deleteMessage } />
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
        <LoginSubcomponent 
        subHandleLogin = {this.mainHandleLogin}
        subUsername = {this.state.emailUsername}
        subPassword = {this.state.password}
        />
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('ubsUploads')
); //render
