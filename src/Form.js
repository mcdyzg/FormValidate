function l(data){
	console.log(data)
}

var Form = React.createClass({

	getDefaultProps:function(){
		return {
			type:'right',
			className:'',
			name:'form',
			regs:{
				required:'.+',  
				number:'^\\d*$',
				phone:'^\\d{11}$',
				id:'^(^\\d{18}$|^\\d{17}(\\d|X|x))$'
			}
		}
	},

	getInitialState:function(){
		return {
			
		}
	},

	componentWillMount:function(){
		this._inputs = {};
	},

	_renderChildren:function(children) {
		var t = this;

		if(typeof children !== 'object' || children === null) {
			return children
		}
		var childrenCount = React.Children.count(children);
		if(childrenCount >1 ) {
			return React.Children.map(children, function(child) {

				return this._renderChild(child);
			}.bind(this))
		} else if(childrenCount === 1) {
			return this._renderChild(Array.isArray(children) ? children[0] : children);
		}
	},

	_renderChild:function(child){
		var t = this;
		var cp = child.props;

		if(typeof child !== 'object' || child === null) {
			return child;
		}
		if(child.type.displayName === 'Input') {
			
			this._inputs[cp.name] ={
				validate:cp.validate
				// 'defaultValidate':cp.defaultValidate
			}

			if(cp.validateEvent && cp.validate) {
				var eventName = cp.validateEvent;
				var origCallback = cp[eventName];
				var newProps = {};
				newProps[eventName] = function(e){
					this._inputValidate(cp.name, child);
					return origCallback && origCallback(e)
				}.bind(this)
				return React.cloneElement(child, newProps);
			}
			
		}

		return child;
	},

	_inputValidate:function(name, child){
		var vali = this._inputs[name].validate
		for(var i in vali) {
			var reg = new RegExp(this.props.regs[vali[i]]);
			if(document.form1[name] && !reg.test(document.form1[name].value)) {
				child.props.errorMsg && child.props.onError && child.props.onError(child.props.errorMsg[vali[i]]);
				break;
			}
			child.props.onRight()
		}

		// var reg = new RegExp(this.)
		// console.log(document.form1[name].onChange)
	},

	render:function(){
		var t = this;
		return (
			<form 
				ref='form' 
                name={t.props.name}
				className={t.props.className}>
				{this._renderChildren(this.props.children)}
			</form>
		)
	}
})

module.exports = Form