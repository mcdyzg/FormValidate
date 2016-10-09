

var Form = require('../src').Form;
var Input = require('../src').Input;

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
                    <button type='submit'>提交</button>
                </Form>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('AppContainer'));


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