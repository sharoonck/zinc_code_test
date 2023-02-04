const {
  processInput,
  findStrengthOfPages,
  formatAndPrintOutput 
           } = require('./code');
const assert = require('assert');

const input = `
P Ford Car Review
P Review Car
P Review Ford
P French masala
P Toyota Car Ford Review
P Honda Car
P Car
Q Ford
Q Car French
Q Review Honda
Q cooking French
`;
const N = 9;

const { pData, qData } = processInput(input);

// Test case 1: processInput should return correct pData object
assert.deepEqual(pData, {
  P1: [ 'ford', 'car', 'review' ],
  P2: [ 'review', 'car' ],
  P3: [ 'review', 'ford' ],
  P4: [ 'french', 'masala' ],
  P5: [ 'toyota', 'car', 'ford', 'review' ],
  P6: [ 'honda', 'car' ],
  P7: [ 'car' ]
});

// Test case 2: processInput should return correct qData object
assert.deepEqual(qData, {
  Q1: [ 'ford' ],
  Q2: [ 'car', 'french' ],
  Q3: [ 'review', 'honda' ],
  Q4: [ 'cooking', 'french' ]
});

// Test case 3: findStrengthOfPages should return correct result object
const output = findStrengthOfPages(pData, qData, N);
assert.deepEqual(output, {
  Q1: [ 'P1', 'P3', 'P5' ],
  Q2: [ 'P7', 'P1', 'P2', 'P4', 'P5', 'P6' ],
  Q3: [ 'P2', 'P3', 'P6', 'P1', 'P5' ],
  Q4: [ 'P4' ]
}
);

// Test case 4: formatAndPrintOutput should return correct string 
//currently iam directly printing so this method not possible
//assert.equal(formatAndPrintOutput(output), 'Q1: P1 P3 P5\nQ2: P7 P1 P2 P4 P5 P6\nQ3: P2 P3 P6 P1 P5\nQ4: P4\n');


console.log("All test cases passed!");