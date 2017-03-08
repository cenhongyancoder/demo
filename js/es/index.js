'use strict';

/*var NoteList = React.createClass({
    render:function () {
        return (
            <ol>
            {
                this.props.children.map(function (child) {
                return <li>{child}</li>
            })
            }
            </ol>
        );
    }
});
ReactDOM.render(
    <NoteList>
      <span>hello</span>
      <span>woo</span>
    </NoteList>,
    document.body
);*/
/*

var data = 123;
var MyTitle = React.createClass({
    propTypes:{
        title:React.PropTypes.string.isRequired,
    },
    render:function () {
        return <h1>{this.props.title}</h1>;
    }
});
ReactDOM.render(
    <MyTitle title={data} />,
    document.body
)
    
*/

/*
var MyComponent = React.createClass({
    handleClick:function () {
        this.refs.myTextInput.focus();
    },
    render:function () {
        return(
            <div>
            <input type="text" ref="myTextInput"/>
            <input type="button" value="focus the Text Input" onClick={this.handleClick}/>
        </div>
        )
    }
});
ReactDOM.render(
<MyComponent />,
    document.getElementById('example')
)*/

/*  this.state
var LikeButton = React.createClass({
    getInitialState:function () {
        return {liked:false};
    },
    handleClick:function (event) {
        this.setState({liked:!this.state.liked});
    },
    render:function () {
        var text = this.state.liked?'like':'haven\'t liked';
        return(
            <p onClick={this.handleClick}>
              You {text} this.Click to toggle.
            </p>
        );
    }
});

ReactDOM.render(
    <LikeButton />,
    document.getElementById('example')
)*/

/*表单*/

/*var Input = React.createClass({
    getInitialState:function () {
        return {value:'Hello!'};
    },
    handleChange:function (event) {
        this.setState({value:event.target.value});
    },
    render:function () {
        var value = this.state.value;
        return (
            <div>
                <input type="text" value={value} onChange={this.handleChange}/>
                 <p>{value}</p>
             </div>
        );
    }
});
ReactDOM.render(
    <Input/>,
    document.body
)*/

/*组件的生命周期*/

/*
var Hello = React.createClass({
    getInitialState:function () {
        return {
            opacity:1.0
        };
    },
    componentDidMount:function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if(opacity < 0.1){
                opacity = 1.0;
            }
            this.setState({
                opacity:opacity
            });

        }.bind(this),100);
    },
    render:function () {
        return (
            <div style={{opacity:this.state.opacity}}>
               Hello {this.props.name}
            </div>
        )
    }
});

ReactDOM.render(
    <Hello name="world" />,

        document.body
)
*/

/*Ajax*/
var UserGist = React.createClass({
    displayName: 'UserGist',

    getInitialState: function getInitialState() {
        return {
            username: '',
            lastGistUrl: ''
        };
    },
    componentDidMount: function componentDidMount() {
        $.get(this.props.source, function (result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url

                });
            }
        }.bind(this));
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            this.state.username,
            '\'s last gist',
            React.createElement(
                'a',
                { href: this.state.lastGistUrl },
                'here'
            )
        );
    }
});
ReactDOM.render(React.createElement(UserGist, { source: 'https://api.github.com/users/octocat/gists' }), document.body);