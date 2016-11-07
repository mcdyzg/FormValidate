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

		var _child = React.cloneElement(children)

		this.loop(_child)

		return _child;
	},

	loop:function(c){
		var t = this;
		React.Children.map(c,function(item){
			if(item.props && (Array.isArray(item.props.children) || (typeof item.props.children) === 'object')) {
				t.loop(item.props.children)
			}else
			if(item.props && item.type && item.type.displayName === 'Input'){
				t._renderChild(item)
			}
			
		})
	},

	extend:function(){
		var tem = {};
    	for (var x in arguments) {
    		for (var y in arguments[x]) {
    			tem[y] = arguments[x][y];
    		}
    	}
    	return tem;
	},

	_renderChild:function(child){
		var t = this;
		var cp = child.props;
		// 验证通过flag
		this.allRight = true;
		// 错误信息汇总
		this.errorList = {};
		// 正则汇总
		this.regs = this.props.extendRule ? this.extend(this.props.regs, this.props.extendRule) : this.props.regs;

		if(typeof child !== 'object' || child === null) {
			return child;
		}
		if(child.type.displayName === 'Input') {

			this._inputs[cp.name] ={
				node:child,
				validate:cp.validate
				// 'defaultValidate':cp.defaultValidate
			}

			if(cp.validateEvent && cp.validate) {
				var eventName = cp.validateEvent;
				var origCallback = cp[eventName];
				var newProps = {};
				// newProps[eventName] = function(e){
				// 	if(cp.immediateValidate) {
				// 		this._inputValidate(cp.name, child);
				// 	}
				// 	return origCallback && origCallback(e)
				// }.bind(this)
				child.props[eventName] = function(e){
					if(cp.immediateValidate) {
						this._inputValidate(cp.name, child);
					}
					return origCallback && origCallback(e)
				}.bind(this)
				// return React.cloneElement(child, newProps);
			}
			
		}

		return child;
	},

	_inputValidate:function(name, child){
		var vali = this._inputs[name].validate
		for(var i in vali) {
			var reg = new RegExp(this.regs[vali[i]]);
			if(document[this.props.name][name] && !reg.test(document[this.props.name][name].value)) {
				child.props.errorMsg && child.props.onError && child.props.onError(child.props.errorMsg[vali[i]]);
				// 设置出错flag
				this.allRight = false;
				this.errorList[name] = child.props.errorMsg[vali[i]];
				break;
			}
			child.props.onRight()
		}

		// var reg = new RegExp(this.)
		// console.log(document[this.props.name][name].onChange)
	},

	validateAll:function(e){
		this.props.onSubmit();
		this.allRight = true;
		e.preventDefault()
		// console.log(this._inputs)
		for(var i in this._inputs) {
			var child = this._inputs[i].node;
			var cp = this._inputs[i].node.props;
			if(cp.validateEvent && cp.validate) {
				this._inputValidate(i, child);
			}
		}
		if(this.allRight) {
			this.props.onValidSubmit();
		} else {
			this.props.onInValidSubmit(this.errorList);
		}
	},

	render:function(){
		var t = this;
		return (
			<form {...this.props}
				onSubmit={t.validateAll} >
				{this._renderChildren(this.props.children)}
			</form>
		)
	}
})

module.exports = Form