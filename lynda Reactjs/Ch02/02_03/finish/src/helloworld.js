    var HelloWorld = React.createClass({
        render: function() {
        /*react回去遍历对应的属性，后面就是相关的属性内容信息。原来的html标签和定义过的标签会自动转化为相关的js语法*/
            return (
                <div>
                    <h1>Hello World</h1>
                    <p>This is some text</p>
                </div>
                );
        }
    });

    React.render(<HelloWorld />, document.body);