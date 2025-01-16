// Given the head of a Singly LinkedList, reverse the LinkedList. Write a function to return the new head of the reversed LinkedList.

// Constraints:
// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000



class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}

class Solution {
    reverse(head) {
      let current = head;
      let previous = null;
      while (current !== null) {
        let next = current.next;
        current.next = previous;
        previous = current;
        current = next;
      }
      return previous;
    }
  }
  
  
  
  