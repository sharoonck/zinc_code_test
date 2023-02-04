
/*
# The code below can be run in any JavaScript or Node.js compiler. 
# It will take input values for pages and queries and rank them according to the given algorithm. 
# Since I don't understand how the 'N' value is taken for the calculation, I am assuming it as an input.
*/

function processInput(input) {
    let pCount = 1;
    let qCount = 1;
    const lines = input.split('\n');
    const pData = {};
    const qData = {};
    
    // Split the input lines by space and process each line
    for (let i = 0; i < lines.length; i++) {
        const [code, ...keywords] = lines[i].split(' ');
        
        // Add processed data to either pData or qData based on the code
        switch (code) {
            case 'P':
                pData[`P${pCount++}`] = keywords.map(word => word.toLowerCase());
                break;
            case 'Q':
                qData[`Q${qCount++}`] = keywords.map(word => word.toLowerCase());
                break;
            default:
                break;
        }
    }
    return { pData, qData };
}

function findStrengthOfPages(pData, qData, N) {
    const result = {};
    
    // Find the strength of each query and store in the result object
    for (const q in qData) {
        result[q] = {};
        for (const p in pData) {
            var strength = 0;
            for (let i = 0; i < qData[q].length; i++) {

                if (pData[p].includes(qData[q][i])) {
                    const index = pData[p].indexOf(qData[q][i]);
                    strength += (N - i) * (N - index);
                }
            }
            if (strength) result[q][p] = strength;
        }
        // Sort the result object based on strength in descending order
        result[q] = Object.entries(result[q]).sort(([, a], [, b]) => b - a).map(value => value[0]);
    }
    return result;
}

function formatAndPrintOutput(obj) {
    // Format the output in the desired format and print it
    for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value.map(v => `${v}`).join(" ")}`);
    }
}

function run(input, N) {
    // Run the main processing of input
    const { pData,qData } = processInput(input);
    const output = findStrengthOfPages(pData, qData, N);
    formatAndPrintOutput(output);
}

const input = `
P Ford Car Review
P Review Car
P Review Ford
P Toyota Car
P Honda Car
P Car
Q Ford
Q Car
Q Review
Q Ford Review
Q Ford Car
Q cooking French
`;
const N = 8;

run(input, N);





//exporting function for unit testing
module.exports = {
    processInput,
    findStrengthOfPages,
    formatAndPrintOutput
}