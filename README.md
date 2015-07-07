Barium
======

Styling with React.

## Demo & Examples

Live demo: [yuanyan.github.io/barium](http://yuanyan.github.io/barium/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:9999`](http://localhost:9999) in a browser.

## Installation

The easiest way to use `barium` is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/barium.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install barium --save
```

## Usage

```
var Barium = require('barium');

var styles = Barium.create({
  btn: {
    display: 'inline-block',
    color: '#000',
    padding: '6px 12px',
    marginBottom: '0',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '1.428571429',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundImage: 'none',
    border: '1px solid transparent',
    borderRadius: '4px',
    userSelect: 'none',

    ':hover': {
      color: '#fff'
    },
    // Try resizing the window!
    '@media (max-width: 500px)': {
      backgroundColor: '#5bc0de',
      borderColor: '#46b8da'
    }
  }
})

var Example = React.createClass({

    render: function() {
        return (
          <div>
            <button className={styles.btn}>Click Me</button>
          </div>
        );
    }
});
```
