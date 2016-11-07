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

	

	var Form = __webpack_require__(1).Form;
	var Input = __webpack_require__(1).Input;

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

	    allRight:function(){
	        alert('所有输入项都正确')
	    },

	    hasError:function(errorList){
	        console.log(errorList)
	    },

	    formSubmit:function(){
	        alert('表单提交了')
	    },

	    clcik:function(){
	        console.log('按钮点击了')
	    },

	    render: function() {
	        var t = this;
	        return (
	            React.createElement("div", null, 
	                React.createElement(Form, {
	                    // 点击提交按钮会会执行Form内所有Input的校验，并且执行onSubmit的方法，但是不会真正提交表单，因为内部event.preventDefault()了；
	                    onSubmit: t.formSubmit, 
	                    // name属性必须赋值，默认form
	                    name: "form1", 
	                    // 所有Input项都通过验证执行的回调
	                    onValidSubmit: t.allRight, 
	                    // 当有Input验证不通过时执行的回调，传入一个errorList参数
	                    onInValidSubmit: t.hasError, 
	                    // 扩展验证规则，单\必须使用\\替换才会生效
	                    extendRule: {email:'\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'}, 
	                    className: "ddd"}, 
	                    React.createElement(Input, {
	                        // 实时校验，默认为true
	                        immediateValidate: false, 
	                        // 触发验证的事件，默认onChange，也支持onBlur,onClick等
	                        validateEvent: "onChange", 
	                        // 验证规则
	                        validate: ['required','email'], 
	                        // 错误信息，要与验证规则一一对应
	                        errorMsg: {required:'必须要输入',phone:'请输入电话号码',email:'请输入正确的邮箱'}, 
	                        // 验证通过执行的回调
	                        onRight: t.handleRight.bind(this,'error1'), 
	                        // 验证失败执行的回调
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
	                    ), 
	                    React.createElement("button", {onClick: t.clcik, type: "submit"}, "提交")
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

	var Form = __webpack_require__(2);
	var Input = __webpack_require__(3);

	module.exports = {
		Form : Form,
		Input : Input
	}

/***/ },
/* 2 */
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
					newProps[eventName] = function(e){
						if(cp.immediateValidate) {
							this._inputValidate(cp.name, child);
						}
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
				React.createElement("form", React.__spread({},  this.props, 
					{onSubmit: t.validateAll}), 
					this._renderChildren(this.props.children)
				)
			)
		}
	})

	module.exports = Form

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	var Input = React.createClass({displayName: "Input",

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
				React.createElement("input", React.__spread({},  this.props))
			)
		}
	})

	module.exports = Input

/***/ }
/******/ ])