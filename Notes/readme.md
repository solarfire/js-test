This file answers and summarises the 2 parts to the test.

# Part 1

## To Use
index.html is the home page.

## Assumptions
This will be run on a web server.

## Implemented
- Ordering of potions ( alphabetically, by tags, etc ) YES
- Searching for a specific potion YES
- Filtering on price NO
- Filtering on required level YES
- Filtering on tags YES
- (optional) Interesting UI YES?
- (bonuspoints) Use semantic HTML YES
- (bonuspoints) Serve the website through a nodejs application NO
- (bonuspoints) Create an api for retrieval and filtering of data through the nodejs application NO
-DO NOT use any external libraries for the front-end, Vanilla javascript all the way YES
-Use modern build tools such as webpack/gulp NO
-Spend maximum 5 hours. YES

## Known issues
- Multiple filters don't work at the same.  The last filter takes precedence.
- Search by name works but considers this whole inner html of the potion.  With name being first, it works.
- Search by price is not implemented.



# Part 2

Answers to the following questions to be provided in pseudocode, i.e. no coding required, simply answers in a textual format.

1) I want this code to log out the numbers 0, 1, 2, 3 but it doesn't? Why is that?
    for (var i = 0; i < 4; i++) {
        setTimeout(() => console.log(i), 0)
    }

    Answer : Due to javascript function scope.  The argument (i) isn't used.  Solutions :
```javascript
    // Solution 1 - Wrap the enclosed function (closure).
    for (var i = 0; i < 4; i++) (function(i) {
        setTimeout(function() {
            console.log(i)
       }, 0);
    })(i);

    // Solution 2 - Use 'let' instead of 'var';
    for (let i = 0; i < 4; i++) {
        setTimeout(() => console.log(i), 0)
    }
```

2) Write a function that returns true or false indicating whether the given string is a palindrome (case and space insensitive).

    isPalindrome('abcdcba')                         // true
    isPalindrome('abcd')                            // false
    isPalindrome('A man a plan a canal Panama')     // true

```javascript
   /* pseudocode
   1. change the case and remove white space of the supplied string and assign.
   2. reverse the string above and assign.
   3. compare both for equality
   e.g. */
  function isPalindrome(val) {
      /** TODO - No param check as not in test cases */
      var strReg = val.toUpperCase().replace(/[\W_]/g, '');
      var strRegReversed = strReg.split('').reverse().join('');
      return strReg === strRegReversed;
    }
```
3) Write a function that takes an unsorted array of unique numbers (ie. no repeats) from 1 through some number n and return the missing number in the sequence (there are either no missing numbers, or exactly one missing number). Can you do it in O(N) time? Hint: There's a clever formula you can use.

```javascript
    /* pseudocode
    1. Calculate the sum total of all elements in the array.
    2. Loop through it and subtract each number from the total
    3. The remaining value will be the missing number.
    e.g. */
    function getMissingNumber(unsortedArray) {
         /** TODO - No param check */
         var total, numberOfElements;
         numberOfElements = unsortedArray.length;
         total = (numberOfElements + 1) * (numberOfElements + 2) / 2;
         for (var i = 0; i < numberOfElements; i++) {
                total -= unsortedArray[i];
         }
        return total;
    }
```

4) Given a array of N strings, find the longest common prefix among all strings present in the array. Print the longest common prefix as a string in the given array. If no such prefix exists print "-1".
```javascript
  /* pseudocode
  1. concat the supplied string array.
  2. take the first and last string in the Array
  3. loop through the 2 strings, character at time, and compare for each other for equality.
  4. Once the comparison fails, take that substring.
```
