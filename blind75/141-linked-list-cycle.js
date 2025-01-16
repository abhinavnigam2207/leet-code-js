// Given the head of a Singly LinkedList, write a function to determine if the LinkedList has a cycle in it or not.

// Constraints:
// The number of the nodes in the list is in the range [0, 104].
// 105 <= Node.val <= 105

/*class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}*/

class Solution {
    hasCycle(head) {
      let slow = head;
      let fast = head;
      while (fast !==null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
          return true
        }
      }
      return false;
    }
  }
  