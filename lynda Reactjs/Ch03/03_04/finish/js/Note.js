var Note = React.createClass({
     /* 加上相关的操作 相当于在html上加上对应的方法 */   
    edit: function() {
        alert('editing note');
    },
    remove: function() {
        alert('removing note');
    },
    /*渲染的对应和内容*/ 
    /*{相当于当前的对象的内容}*/ 
    render: function() {
        return (
            <div className="note">
                /*创建标签的子元素*/
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            );
    }
});


React.render(<Note>Hello World</Note>, 
    document.getElementById('react-container'));