/**
 * Problem: Top K Frequent Elements
 * Difficulty: Medium
 *
 * Given an integer array nums and an integer k, return the k most frequent
 * elements within the array.
 *
 * The test cases are generated such that the answer is always unique.
 *
 * You may return the output in any order.
 *
 * Example 1:
 *   Input: nums = [1,2,2,3,3,3], k = 2
 *   Output: [2,3]
 *
 * Example 2:
 *   Input: nums = [7,7], k = 1
 *   Output: [7]
 *
 * Constraints:
 *   - 1 <= nums.length <= 10^4
 *   - -1000 <= nums[i] <= 1000
 *   - 1 <= k <= number of distinct elements in nums
 */

/**
 * Approach:
 *   First count how many times each number appears. Then group the numbers by that count:
 *   bucket i holds every number that appears exactly i times. Finally walk the buckets from
 *   the highest count down, collecting numbers until we have k of them.
 *
 * Data structures:
 *   Hash Map - counts every number's frequency in one pass with O(1) average updates.
 *   Array of buckets (bucket sort) - a count can only be 1..n, so indexing buckets by count
 *   lets us read numbers in frequency order without sorting, avoiding O(n log n).
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) ?? 0) + 1);
  }

  // Bucket sort: buckets[f] holds every number that appears exactly f times.
  // A frequency can never exceed nums.length, so n + 1 buckets is enough.
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of count) {
    buckets[freq].push(num);
  }

  // Walk from the highest frequency down until we have k numbers.
  const result = [];
  for (let freq = buckets.length - 1; freq > 0 && result.length < k; freq--) {
    for (const num of buckets[freq]) {
      result.push(num);
      if (result.length === k) break;
    }
  }
  return result;
}

if (require.main === module) {
  const tests = [
    { nums: [1, 2, 2, 3, 3, 3], k: 2, expected: [2, 3] },
    { nums: [7, 7], k: 1, expected: [7] },
  ];
  // Output may be in any order, so compare sorted copies.
  const sameSet = (a, b) =>
    JSON.stringify([...a].sort((x, y) => x - y)) === JSON.stringify([...b].sort((x, y) => x - y));

  for (const { nums, k, expected } of tests) {
    const actual = topKFrequent(nums, k);
    console.log(
      `Input: nums = ${JSON.stringify(nums)}, k = ${k} | Expected: ${JSON.stringify(expected)} | Got: ${JSON.stringify(actual)} | ${sameSet(actual, expected) ? 'PASS' : 'FAIL'}`
    );
  }
}

module.exports = { topKFrequent };

/**
 * Complexity:
 *   Time:  O(n)
 *   Space: O(n)
 *
 * Counting takes one pass, and placing numbers into frequency buckets then scanning them is linear, so no sort is needed.
 * The frequency map, the n + 1 buckets and the result together store at most O(n) values.
 */
