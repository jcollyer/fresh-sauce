var React = require("react");
var C = require("../constants");

var Track = React.createClass({
	submit: function(e){
		var p = this.props;
		var field = this.refs.field;

		p.submit(field.value);
		field.value = "";
		e.preventDefault();
	},
	render: function(){
		var p = this.props;
		var q = p.track;
		var button;

		if (p.state === C.EDITING_TRACK){
			return (<form className="quote" onSubmit={this.submit}>
				<input ref="field" defaultValue={q.content}/>
				<button type="button" onClick={p.cancel}>Cancel</button>
				<button type="submit" onClick={this.submit}>Submit</button>
			</form>);
		}
		if (!p.mayedit){
			button = ""
		} else if (p.state === C.SUBMITTING_TRACK) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = <span><button onClick={p.edit}>Edit</button><button onClick={p.delete}>Delete</button></span>;
		}
		return <div className="track">
							<span className="artwork_url"><img src={q.track.artwork_url} /></span>
							<span className="title">{q.track.title} </span>
							<span className="artist"><b>{q.track.artist}</b></span></div>;
	}
});

module.exports = Track;
