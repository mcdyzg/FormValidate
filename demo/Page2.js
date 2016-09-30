var Anim = require('../src/Anim');

var Page2 = React.createClass({

    render: function() {
        var t = this;
        return (
        	<Anim type='right'>
            <div style={{height:400,background:'red'}}>
                22222222222222222222
            <br />
            <a style={{display:'block',width:100,height:100,background:'yellow'}} href='#/page1'>跳转</a>
            </div>
          </Anim>
        );
    }
});

module.exports = Page2;