/* global describe, it */

const ps = require('../');

describe('func snapshot', () => {
  it('should work without args', () => {
    var snap = ps.snapshot();

    snap.should.be.a.Promise();

    return snap.then((data) => {
      data.should.be.an.Array().and.not.empty();

      data[0].should.be.an.Object().and.have.keys(['ProcessId', 'Name', 'Path', 'ParentProcessId', 'Priority']);
    })
  })

  it('should work with args', () => {
    var snap = ps.snapshot(['CommandLine']);

    snap.should.be.a.Promise();

    return snap.then((data) => {
      data.should.be.an.Array().and.not.empty();

      data[0].should.be.an.Object().and.have.keys('CommandLine');
    })
  })
})
