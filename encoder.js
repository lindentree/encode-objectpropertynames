const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//the index of codepoints for hidden character surrogate pair strings that parse to normal hex values
//if you follow Wikipedia's Unicode table, you can add more characters(0-9, for example). 
const validCodepoints = {
    a: 917857,
    b: 917858,
    c: 917859,
    d: 917860,
    e: 917861,
    f: 917862,
    g: 917863,
    h: 917864,
    i: 917865,
    j: 917866,
    k: 917867,
    l: 917868,
    m: 917869,
    n: 917870,
    o: 917871,
    p: 917872,
    q: 917873,
    r: 917874,
    s: 917875,
    t: 917876,
    u: 917877,
    v: 917878,
    w: 917879,
    x: 917880,
    y: 917881,
    z: 917882,
    A: 917825,
    B: 917826,
    C: 917827,
    D: 917828,
    E: 917829,
    F: 917830,
    G: 917831,
    H: 917832,
    I: 917833,
    J: 917834,
    K: 917835,
    L: 917836,
    M: 917837,
    N: 917838,
    O: 917839,
    P: 917840,
    Q: 917841,
    R: 917842,
    S: 917843,
    T: 917844,
    U: 917845,
    V: 917846,
    W: 917847,
    X: 917848,
    Y: 917849,
    Z: 917850,
  '.': 917806,
  '/': 917807,
  ',': 917548,
  ' ': 917792,
  '!': 917793,
  '&': 917798,
  '\'': 917799,
  '-': 917805,
  ',': 917804,
  '?': 917823,
  ':': 917818,
  ';': 917819
};

let dynamicEncodePayloadFunc = (string, length = 1) => {
  let codepoints = [];
  let nameLen = length;
  for (let i = 0; i < string.length; i+=1) {
    if (i < nameLen) {//creates the visible part of the property name, visible part must be a valid property name or enclosed in quotes afterwards 
      codepoints.push(string.codePointAt(i));
      continue;
    }

    if(validCodepoints[string[i]]) {
      codepoints.push(validCodepoints[string[i]]);
    }
  }

  console.log(String.fromCodePoint(...codepoints))
}

rl.question('Please enter your full message: ', (answer1) => {
    rl.question('Please specify the length of the visible property name(default is 1): ', (answer2) => {
      if (!answer2) {
        answer2 = 1;
      }
        dynamicEncodePayloadFunc(answer1, parseInt(answer2))
        console.log("Copy paste the above key into your object")
        rl.close();
    });
});