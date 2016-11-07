

- FormValidate
==========

表单验证的组件


## 运行Demo

1. npm install 
2. gulp watch

**有些时候国内npm源访问比较慢，那么推荐使用cnpm。建议使用nvm管理自己的node版本，建议使用较高版本的nodejs。**

1. npm install cnpm -g
2. cnpm install -l
3. gulp watch

## Usage

**详细实例见demo**

	var Form = require('.../FormValidate').Form;
	var Input = require('.../FormValidate').Input;
	var App = React.createClass({
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
	            <div>
                <Form 
                    // 点击提交按钮会会执行Form内所有Input的校验，并且执行onSubmit的方法，但是不会真正提交表单，因为内部event.preventDefault()了；
                    onSubmit={t.formSubmit}
                    // name属性必须赋值，默认form
                    name='form1'
                    // 所有Input项都通过验证执行的回调
                    onValidSubmit={t.allRight}
                    // 当有Input验证不通过时执行的回调，传入一个errorList参数
                    onInValidSubmit={t.hasError}
                    // 扩展验证规则，单\必须使用\\替换才会生效
                    extendRule={{email:'\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'}}
                    className='ddd'>
                    <div className=''>
                        <div className=''>
                            <Input 
                                // 实时校验，默认为true
                                immediateValidate={true}
                                // 触发验证的事件，默认onChange，也支持onBlur,onClick等
                                validateEvent='onChange'
                                // 验证规则
                                validate={['required','email']} 
                                // 错误信息，要与验证规则一一对应
                                errorMsg={{required:'必须要输入',phone:'请输入电话号码',email:'请输入正确的邮箱'}} 
                                // 验证通过执行的回调
                                onRight={t.handleRight.bind(this,'error1')}
                                // 验证失败执行的回调
                                onError={t.handleError.bind(this,'error1')}
                                onChange={t.changeValue.bind(this,'input1')}
                                value={t.state.input1}
                                type='text' 
                                name='input1' />
                            <div className=''>
                                {this.state.error1}
                            </div>
                        </div>
                        
                        <div className=''>
                            <Input 
                                validate={['required','number']} 
                                errorMsg={{required:'必须要输入',number:'请输入数字'}} 
                                onRight={t.handleRight.bind(this,'error2')}
                                onError={t.handleError.bind(this,'error2')}
                                onChange={t.changeValue.bind(this,'input2')}
                                type='text' 
                                value={t.state.input2}
                                name='input2' />
                            <div className=''>
                                {this.state.error2}
                            </div>
                        </div>

                        <button onClick={t.clcik} type='submit'>提交</button>
                    </div>
                </Form>
            </div>
	        );
	    }
	});
	
	ReactDOM.render(<App />, document.getElementById('AppContainer'));


## API ##

### 1. Input参数解析:  ###

	- `validate` : 设置验证规则，必须传入数组格式，必填。可选：required:必填；number:必须是数字；phone:11位电话号码；id：身份证号码。验证规则可通过extendRule参数扩展。
	- `immediateValidate` :  是否实时验证，默认true。不开启实时验证的情况下，只有在form触发submit事件时input才会验证。
	- `validateEvent` :  触发验证的事件，默认'onChange'。只有在开启实时验证的条件下才会执行，支持onClick,onBlur等react支持事件。
	- `errorMsg` :  验证规则不满足时的错误提示。object类型，必须与validate设置的规则一一对应。
	- `onRight` : Input内输入正确时执行的回调函数。
	- `onError` : Input内输入错误时执行的回调函数。
	- `value` :  传给Input的值。
	- `name` : 输入框的name属性，必填，必须与其他Input的name不同
	- `CouldClickNext` : 每页日历中是否显示上月、下月按钮。默认false
	
### 2. Form参数解析： ###

	- `name` :  name属性必须赋值，默认form。
	- `onValidSubmit` :  form表单执行onSubmit事件时，Input全部通过时执行的回调函数。
	- `onInValidSubmit` :  form表单执行onSubmit事件时，Input有未通过输入项是时执行的回调函数，接收一个errorList参数。
	- `extendRule` :  扩展的验证规则，单反斜杠（\）必须用双反斜杠(\\)代替。例如：{{email:'\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'}}