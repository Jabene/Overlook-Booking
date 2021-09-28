import chai from 'chai';
import {User} from '../src/classes/User'
const expect = chai.expect;

describe('User', function() {
  let user;

  beforeEach(function() {
    user = new User({
      id: 2,
      name: 'joshua',
      username: 'customer34'
    })
  })

  it('should be function', function() {
    expect(User).to.be.a('function');
  });

  it('should hold a id', function() {
    expect(user.id).to.equal(2)
  })

  it('should hold a name', function() {
    expect(user.name).to.equal('joshua')
  })

  it('should hold a username', function() {
    expect(user.userName).to.equal('customer34')
  })

  it('should hold a list of previous bookings', function() {
    user.bookings = [{}, {}]
    expect(user.bookings).to.deep.equal([{}, {}])
  })

  it('should hold a selected date', function() {
    user.selectedDate = '2021/09/27'
    expect(user.selectedDate).to.equal('2021/09/27')
  })
});
