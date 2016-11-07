FormValidate
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
	                    <Input 
	                        // 实时校验，默认为true
	                        immediateValidate={false}
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
	                    <button onClick={t.clcik} type='submit'>提交</button>
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
	- `onRight` : Input内
	- `choosedDate` : 接收一个数组对象，格式类似['2016-10-08'],数组中的日期右上角会有个对号图标。
	- `choosedDate2` :  接收一个数组对象，格式类似['2016-10-08'],数组中的日期右上角会有个礼物图标。
	- `beforeTodayCouldClick` :今天以前的日期是否允许点击。默认为false
	- `CouldClickNext` : 每页日历中是否显示上月、下月按钮。默认false
	
### 2. Form参数解析： ###

	- `time` :  传入当前要显示的时间，在日历中将通过圆圈显示。默认当前时间。
	- `type` :  日历最多可显示几个月份。可选参数1,3,5。默认3。注：如果type = 3,将会显示 time 参数传入时间的当月，前一个月，和下一个月的月份，例如time ='2016-10-09'，日历将会显示9、10、11三个月份，type = 5将会显示8、9、10、11、12月份。
	- `showNowTime` :  是否显示当前日期，即time参数传入的时间，默认true
	- `showSelectDate` :  是否显示chooseDate参数传入的日期，默认true
	- `onSelectDate` : 选中某个日期时触发的回调函数，可接收到一个选中日期的参数，例如 '2016-10-11'.
	- `choosedDate` : 接收一个数组对象，格式类似['2016-10-08'],数组中的日期右上角会有个对号图标。
	- `choosedDate2` :  接收一个数组对象，格式类似['2016-10-08'],数组中的日期右上角会有个礼物图标。
	- `beforeTodayCouldClick` :今天以前的日期是否允许点击。默认为false
	- `CouldClickNext` : 每页日历中是否显示上月、下月按钮。默认false
