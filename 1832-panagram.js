// 1832. Check if the Sentence Is Pangram

// Problem Statement
// A pangram is a sentence where every letter of the English alphabet appears at least once.
// Given a string sentence containing English letters (lower or upper-case), return true if sentence is a pangram, or false otherwise.
// Note: The given sentence might contain other characters like digits or spaces, your solution should handle these too.

// Example 1:
// Input: sentence = "TheQuickBrownFoxJumpsOverTheLazyDog"
// Output: true
// Explanation: The sentence contains at least one occurrence of every letter of the English alphabet either in lower or upper case.

// Example 2:
// Input: sentence = "This is not a pangram"
// Output: false
// Explanation: The sentence doesn't contain at least one occurrence of every letter of the English alphabet.

// Constraints:
// 1 <= sentence.length <= 1000
// sentence consists of lower or upper-case English letters.

class Solution {
    // Function to check if given sentence is pangram
    checkIfPangram(sentence) {
      if (sentence.length < 26) {
        return false;
      }
      const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
      for(let i=0; i< alphabets.length; i++) {
        if (sentence.toLowerCase().indexOf(alphabets[i]) == -1) {
          return false;
        }
      }    
      return true;
    }
  }
  