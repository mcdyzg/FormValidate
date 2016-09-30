/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	

	var Form = __webpack_require__(1);
	var Input = __webpack_require__(2);

	var App = React.createClass({displayName: "App",

	    getInitialState:function(){
	        return {
	            input1:'',
	            input2:'',
	            error1:'',
	            error2:''
	        }
	    },

	    handleError:function(key, msg){
	        var tem = {}
	        tem[key] = msg;
	        this.setState(tem)
	    },

	    handleRight:function(key){
	        var tem = {}
	        tem[key] = '输入正确'
	        this.setState(tem)
	    },

	    changeValue:function(key, event){
	        var tem = {}
	        tem[key] = event.target.value;
	        this.setState(tem)

	    },

	    render: function() {
	        var t = this;
	        return (
	            React.createElement("div", null, 
	                React.createElement(Form, {
	                    name: "form1", 
	                    className: "ddd"}, 
	                    React.createElement(Input, {
	                        validate: ['required','phone'], 
	                        errorMsg: {required:'必须要输入',phone:'请输入电话号码'}, 
	                        onRight: t.handleRight.bind(this,'error1'), 
	                        onError: t.handleError.bind(this,'error1'), 
	                        onChange: t.changeValue.bind(this,'input1'), 
	                        value: t.state.input1, 
	                        type: "text", 
	                        name: "input1"}), 
	                    React.createElement("div", {className: ""}, 
	                        this.state.error1
	                    ), 
	                    React.createElement(Input, {
	                        validate: ['required','number'], 
	                        errorMsg: {required:'必须要输入',number:'请输入数字'}, 
	                        onRight: t.handleRight.bind(this,'error2'), 
	                        onError: t.handleError.bind(this,'error2'), 
	                        onChange: t.changeValue.bind(this,'input2'), 
	                        type: "text", 
	                        value: t.state.input2, 
	                        name: "input2"}), 
	                    React.createElement("div", {className: ""}, 
	                        this.state.error2
	                    )
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('AppContainer'));


	// var Wrap = React.createClass({
	    
	//     render:function(){
	//         console.log(this.props.children)
	//         return (
	//             <div>
	//             1111
	//             {this.props.children}
	//             </div>
	//             )
	//     }
	// })

	// var Inner = React.createClass({

	//     render:function(){
	//         console.log('dddd')
	//         return (
	//             <div className=''>
	//                 <input type='text' value='dsfd' />
	//             </div>
	//             )
	//     }
	// })

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	function l(data){
		console.log(data)
	}

	var Form = React.createClass({displayName: "Form",

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
				React.createElement("form", {
					ref: "form", 
	                name: t.props.name, 
					className: t.props.className}, 
					this._renderChildren(this.props.children)
				)
			)
		}
	})

	module.exports = Form

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	var Input = React.createClass({displayName: "Input",

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
				React.createElement("input", React.__spread({},  this.props))
			)
		}
	})

	module.exports = Input

/***/ }
/******/ ])