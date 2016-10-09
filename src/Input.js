
var Input = React.createClass({

	getDefaultProps:function(){
		return {
			// 触发验证的事件，默认onChange
			validateEvent:'onChange',
			// 实时校验，默认为true
			immediateValidate:true
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