var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var AdminAppAction = require('../actions/AdminAppActions');


var SELECT_SEX_MALE = 1 << 0;
var SELECT_SEX_FEMALE = 1 << 1;
var SELECT_PROV_KAKAO = 1 << 2;
var SELECT_PROV_FACEBOOK = 1 << 3;

var SexFilter = [
     "Male",
     "Female",
     "Both",
];

var ProviderFilter = [
    "Kakao",
    "Facebook",
    "Both"
];    

var UserSearchBar = React.createClass({
    getInitialState : function(){
	return {
	    Filter : {
		Mail : '',
		Sex : 2,
		Provider : 2
	    }
	}
    },

    componentDidMount : function(){
	this.findUserSubmit();
    },
    

    handleSexFilter : function(event, eventKey){
	this.setState({
	    Filter : {
		Mail : this.state.Filter.Mail,
		Sex : eventKey,
		Provider : this.state.Filter.Provider
	    }
	})
    },

    handleProviderFilter : function(event, eventKey){
	this.setState({
	    Filter : {
		Mail : this.state.Filter.Mail,
		Sex : this.state.Filter.Sex,
		Provider : eventKey
	    }
	})
    },

    handleMailFilter : function(event, nene){
	this.setState({
	    Filter : {
		Mail : this.refs.input.getValue(),
		Sex : this.state.Filter.Sex,
		Provider : this.state.Filter.Provider
	    }
	})
    },

    findUserSubmit : function(){
	var mail = this.state.Filter.Mail !== '' ? null : this.state.Filter.Mail;
	var sex = SexFilter[this.state.Filter.Sex];
	var provider = ProviderFilter[this.state.Filter.Provider];

	console.log(this.state.Filter.Sex);
	console.log(this.state.Filter.Provider);
	
	AdminAppAction.findUsers(mail, sex, provider);
    },


    render : function(){
	var SexFilterTitle = SexFilter[this.state.Filter.Sex] === "Both" ? "Sex" : SexFilter[this.state.Filter.Sex];

	var ProviderFilterTitle = ProviderFilter[this.state.Filter.Provider] === "Both" ? "Provider" : ProviderFilter[this.state.Filter.Provider];
	    


	var sexFilterDropdown = function(){
	    return (
		    <DropdownButton title={SexFilterTitle} id="sex-filter" onSelect={this.handleSexFilter}>
		    {SexFilter.map(function(title, i){
			return <MenuItem key={i} eventKey={i}>{title}</MenuItem>;
			
		    })}
		</DropdownButton>
	    )
	}.bind(this)();

	var providerFilterDropdown = function(){
	    return (
		    <DropdownButton title={ProviderFilterTitle} id="provider-filter" onSelect={this.handleProviderFilter}>
		    {ProviderFilter.map(function(title, i){
			return <MenuItem key={i} eventKey={i}>{title}</MenuItem>;
		    })}
		</DropdownButton>
	    )
	}.bind(this)();

	var buttonsInstance = (
		<ButtonToolbar>
		{sexFilterDropdown}
	    {providerFilterDropdown}
	    </ButtonToolbar>
	);


	var sexFilterRow = [];
	var providerFilterRow = [];

	return (
		<div>
		<Input type="text" value={this.state.Filter.Mail} placeholder="muzzynine@gmail.com" label="Input e-mail address" onChange={this.handleMailFilter} ref="input" groupClassName="group-class" labelClassName="label-class"/>
		<ButtonToolbar>
		{sexFilterDropdown}
	    {providerFilterDropdown}
		<Button bsStyle="primary" onClick={this.findUserSubmit}>GO</Button>
		</ButtonToolbar>
		</div>
	);
    }
});

module.exports = UserSearchBar;
