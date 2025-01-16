// Problem Statement
// Given an array of positive numbers and a positive number 'k,' find the maximum sum of any contiguous subarray of size 'k'.

// Example 1:

// Input: arr = [2, 1, 5, 1, 3, 2], k=3 
// Output: 9
// Explanation: Subarray with maximum sum is [5, 1, 3].
// Example 2:

// Input: arr = [2, 3, 4, 1, 5], k=2 
// Output: 7
// Explanation: Subarray with maximum sum is [3, 4].


class Solution {
    findMaxSumSubArray (k, arr) {
        let maxSum = 0;
        let kSum = 0;
        for (let i=0; i<k; i++) {
            kSum += arr[i];
        }
        for (let j=1; j<=arr.length-k+1; j++) {
            maxSum = Math.max(maxSum, kSum);
            kSum = kSum - arr[j-1] + arr[j+k-1];
        }
        return maxSum;
    };
}