var Anim = require('../src/Anim');

var Page1 = React.createClass({

    render: function() {
        var t = this;
        return (
        	<Anim type='right'>
            <div style={{height:400,background:'green'}}>
                11111111111111111111
                <br />
                <a style={{display:'block',width:100,height:100,background:'yellow'}} href='#/page2'>跳转</a>
            </div>
          </Anim>
        );
    }
});

module.exports = Page1;