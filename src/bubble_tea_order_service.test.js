const {createOrderRequest} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const bubbleTeaMessenger = require('./bubble_tea_messenger');
jest.mock('./bubble_tea_messenger'); //Mock has been created
jest.mock('./simple_logger');

//test dummies
let dummyPaymentDetails;
//dummy object is created 
beforeEach(() => {
  dummyPaymentDetails = {
    name: 'Some person',
    address: '123 Some Street',
    debitCard: {
      digits: '123456',
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test('test successful bubble tea order request', () => {
  // Arrange
  const bubbleTeaRequest = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType.MATCHAMILKTEA,
    },
  };

  // Act
  const orderRequest = createOrderRequest(bubbleTeaRequest);

  // Assert
  expect(orderRequest.name).toBe(dummyPaymentDetails.name);
  expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
  expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail)     //Mock to verify the number of calls to function
      .toHaveBeenCalledWith(orderRequest);        
  expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail)     //Mock to verify the number of calls to function
      .toHaveBeenCalledTimes(1);
});
