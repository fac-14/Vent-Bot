const tape = require('tape');

tape('check tape is working', (t) => {
  t.equals(1,1,'1 should equal 1');
  t.end();
})