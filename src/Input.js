
var Input = React.createClass({

	getDefaultProps:function(){
		return {
			validateEvent:'onChange'
			// ,defaultValidate:true
		}
	},

	getInitialState:function(){
		return {
			
		}
	},

	componentDidMount:function(){

	},

	render:function(){
		var t = this;
		return (
			<input {...this.props} />
		)
	}
})

module.exports = Input