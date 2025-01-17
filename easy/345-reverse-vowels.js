// 345. Reverse Vowels of a String

// Problem Statement
// Given a string s, reverse only all the vowels in the string and return it.
// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

// Example 1:

// Input: s = "IceCreAm"
// Output: "AceCreIm"
// Explanation:
// The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

// Example 2:
// Input: s = "leetcode"
// Output: "leotcede"

// Constraints:
// 1 <= s.length <= 3 * 105
// s consist of printable ASCII characters.

class Solution {
    reverseVowels(s) {
      let str = s.split('');
      let vowelIndexes=[];
      for(let i=0; i<str.length; i++) {
        if('aeiou'.indexOf(str[i].toLowerCase()) !== -1) {
          vowelIndexes.push(i);
        }
      }
      console.log('vowelIndexes', vowelIndexes);
      const vowLength = vowelIndexes.length;
      for(let i=0; i<Math.floor(vowLength/2); i++) {
        [str[vowelIndexes[i]], str[vowelIndexes[vowLength-i-1]]]
          = [str[vowelIndexes[vowLength-i-1]], str[vowelIndexes[i]]] 
      }
      return str.join('');
    }
  }
  