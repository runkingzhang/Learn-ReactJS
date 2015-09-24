var Note = React.createClass({
    //this.state.editingde 状态变化
    getInitialState: function() {
        return {editing: false}
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        this.setState({editing: false});
    },
    remove: function() {
        alert('removing note');
    },
    /*渲染呈现的状态*/
    renderDisplay: function() {
        return (
            <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            );
    },
    /*渲染对应的表格样式内容*/
    renderForm: function() {
        return (
            <div className="note">
            <textarea defaultValue={this.props.children} 
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    },
     /*根据状态的不同 渲染两种不同的情况，在页面中发生相关的状态变化*/
    render: function() {
        //编辑状态下 渲染编辑情况的内容
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

React.render(<Note>Hello World</Note>, 
    document.getElementById('react-container'));