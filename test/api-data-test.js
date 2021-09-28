import chai from 'chai';
import {ApiData} from '../src/classes/ApiData'
const expect = chai.expect;

describe('Api Data', function() {
  let apiData;

  beforeEach(function() {
    apiData = new ApiData()
  })

  it('should be function', function() {
    expect(ApiData).to.be.a('function');
  });

  it('should create customer usernames', function() {
    apiData.customers = [{
      id: 50,
      name: 'paul'
    }]
    apiData.getUsernames()
    expect(apiData.customers[0].username).to.equal('customer50')
  })

  it('should fill out the rest of the booking data', function() {
    apiData.bookings = [{
    "id": "5fwrgu4i7k55hl8dc",
    "userID": 1,
    "date": "2020/01/08",
    "roomNumber": 17,
    "roomServiceCharges": []
    },]
    apiData.rooms = [{
    "number": 17,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 328.15
    }]
    apiData.getCompleteBookingInfo()
    const testData = {
      id: "5fwrgu4i7k55hl8dc",
      userID: 1,
      date: "2020/01/08",
      roomNumber: 17,
      roomServiceCharges: [],
      roomType: "junior suite",
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 328.15
    }
    expect(apiData.bookings[0]).to.deep.equal(testData)
  })
});
