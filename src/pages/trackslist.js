var React = require("react");
var ReactRedux = require("react-redux");
var C = require("../constants");
var _ = require("lodash");
var actions = require("../actions/");
var Track = require("./components/quote");

var Trackslist = React.createClass({
	newQuote: function(e){
		if (!this.props.quotes.submitting){
			e.preventDefault();
			this.props.submitNewQuote(this.refs.newquote.value);
			this.refs.newquote.value = '';
		}
	},
	render: function(){
		var p = this.props, rows = _.map(p.tracks.data,function(quote,qid){
			var quotestate = p.tracks.states[qid];
			return <Track
				key={qid}
				quote={quote}
				qid={qid}
				state={quotestate}
				edit={p.startEdit.bind(this,qid)}
				cancel={p.cancelEdit.bind(this,qid)}
				submit={p.submitEdit.bind(this,qid)}
				delete={p.deleteQuote.bind(this,qid)}
				mayedit={p.auth.uid === quote.uid}
			/>;
		}).reverse();
		return (<div className="trackslist">
			{p.auth.uid ? <form className="newquoteform" onSubmit={this.newQuote}>
				<input ref="newquote" placeholder="write something clever!"/>
				<button type="submit" disabled={p.tracks.submittingnew}>{p.tracks.submittingnew ? "Submitting..." : "Submit"}</button>
			</form> : <p>Log in to add a new quote of your own!</p>}
			{p.tracks.hasreceiveddata ? rows : "Loading quotes..."}
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(appState){
	return {
		tracks: appState.tracks,
		auth: appState.auth
	};
};

var mapDispatchToProps = function(dispatch){
	return {
		submitNewQuote: function(content){ dispatch(actions.submitNewQuote(content)); },
		startEdit: function(qid){ dispatch(actions.startQuoteEdit(qid)); },
		cancelEdit: function(qid){ dispatch(actions.cancelQuoteEdit(qid)); },
		submitEdit: function(qid,content){ dispatch(actions.submitQuoteEdit(qid,content)); },
		deleteQuote: function(qid){ dispatch(actions.deleteQuote(qid)); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Trackslist);
