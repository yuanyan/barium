var React = require('react');
var converter = require('./converter');

var Stylist = React.createClass({
    propTypes: {
        styles: React.PropTypes.object,
        link: React.PropTypes.string
    },

    render: function() {


        var component = null;
        var styles = this.props.styles;
        if(styles){

            var stylesString = '';
            Object.keys(styles).forEach(function(val, key){
                var rules = styles[val];
                stylesString += converter.rulesToString(val, rules)
            });

            component = (<style>
             {stylesString}
            </style>)
        }else if(this.props.link){
            component = (<link rel="stylesheet"href={this.prop.link} />)
        }

        return component;
    }
});

module.exports = Stylist;
