var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var LoginView = require('./view/loginView.react');
var DashboardView = require('./view/dashboardView.react');
var DashboardPreview = require('./view/dashboardPreview.react');
var SearchView = require('./view/SearchView.react');


var App = React.createClass({
    render : function(){
	alert(this.state);
	console.log(this.props);

	return (
		<div>
		<h2>mainView</h2>
		<li><Router.Link to={'/login'}>로그인</Router.Link></li>
		<li><Router.Link to={'/dashboard'}>대쉬보드</Router.Link></li>
		{this.props.children}
		</div>
	);
    }
});

ReactDOM.render((
    <Router.Router>
	<Router.Route path="/" component={App}>
	    <Router.Route path="login" component={LoginView} />
	    <Router.Route path="dashboard" component={DashboardView}>
	        <Router.IndexRoute component={DashboardPreview} />
	        <Router.Route path="search" component={SearchView} />
	    </Router.Route>
	</Router.Route>
    </Router.Router>),
    document.getElementById('adminapp')
);















