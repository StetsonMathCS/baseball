
function loopDemo() {
    loop(add, a => { throw( a.a < 20 ) }, {a: 10, b: 1});
}

function loop(func, condition, args) {
    try { 
        condition(args);
    } catch(cont) {
        if( cont ) {
            try {
                func(args);
            } catch(result) {
                loop( func, condition, result );
            }
            
        }
    }
    throw(args);
}

function add(o) {
    throw({a:o.a+o.b, b:o.b});
}

var assert = require('assert');
it('loop', () => assert.throws(loopDemo, (e) => {return e.a === 20}));

