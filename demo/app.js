

var Form = require('../src/Form');
var Input = require('../src/Input');

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

    render: function() {
        var t = this;
        return (
            <div>
                <Form 
                    name='form1'
                    onValidSubmit={t.allRight}
                    onInValidSubmit={t.hasError}
                    extendRule={{email:'\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'}}
                    className='ddd'>
                    <Input 
                        validateEvent='onChange'
                        validate={['required','email']} 
                        errorMsg={{required:'必须要输入',phone:'请输入电话号码',email:'请输入正确的邮箱'}} 
                        onRight={t.handleRight.bind(this,'error1')}
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