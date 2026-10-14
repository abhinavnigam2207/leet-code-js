/**
 * Problem: Alien Dictionary (Foreign Dictionary)
 * Difficulty: Hard
 *
 * There is a foreign language which uses the latin alphabet, but the order among
 * letters is not "a", "b", "c" ... "z" as in English.
 *
 * You receive a list of non-empty strings words from the dictionary, where the
 * words are sorted lexicographically based on the rules of this new language.
 *
 * Derive the order of letters in this language. If the order is invalid, return
 * an empty string. If there are multiple valid orders of letters, return any of them.
 *
 * A string a is lexicographically smaller than a string b if either of the
 * following is true:
 *   - The first letter where they differ is smaller in a than in b.
 *   - a is a prefix of b and a.length < b.length.
 *
 * Example 1:
 *   Input: ["z","o"]
 *   Output: "zo"
 *   Explanation: From "z" and "o", we know 'z' < 'o', so return "zo".
 *
 * Example 2:
 *   Input: ["hrn","hrf","er","enn","rfnn"]
 *   Output: "hernf"
 *   Explanation:
 *     from "hrn" and "hrf", we know 'n' < 'f'
 *     from "hrf" and "er", we know 'h' < 'e'
 *     from "er" and "enn", we know 'r' < 'n'
 *     from "enn" and "rfnn" we know 'e' < 'r'
 *     so one possible solution is "hernf"
 *
 * Example 3:
 *   Input: ["abc","ab"]
 *   Output: ""
 *   Explanation: "abc" cannot come before its own prefix "ab", so the order is invalid.
 *
 * Constraints:
 *   - The input words will contain characters only from lowercase 'a' to 'z'.
 *   - 1 <= words.length <= 100
 *   - 1 <= words[i].length <= 100
 */

/**
 * Approach:
 *   Compare each pair of adjacent words: the first position where they differ tells us one
 *   letter comes before another, which becomes a directed edge. If a longer word appears
 *   before its own prefix, the input is invalid. A topological sort of these letters gives the
 *   order; if a cycle stops us from placing every letter, no valid order exists.
 *
 * Data structures:
 *   Graph as a Map of letter -> Set of next letters - stores each "comes before" rule once
 *   (the Set skips duplicate edges) and lets us visit a letter's neighbours directly.
 *   Map of in-degrees + a queue (Kahn's algorithm) - repeatedly takes letters with no remaining
 *   predecessors, which yields a valid order and detects cycles in linear time.
 */

/**
 * @param {string[]} words
 * @return {string}
 */
function foreignDictionary(words) {
  const graph = new Map();
  const inDegree = new Map();
  for (const word of words) {
    for (const ch of word) {
      if (!graph.has(ch)) {
        graph.set(ch, new Set());
        inDegree.set(ch, 0);
      }
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const first = words[i];
    const second = words[i + 1];
    const minLen = Math.min(first.length, second.length);

    // A word followed by its own prefix can never be sorted.
    if (first.length > second.length && first.startsWith(second)) return '';

    for (let j = 0; j < minLen; j++) {
      if (first[j] !== second[j]) {
        if (!graph.get(first[j]).has(second[j])) {
          graph.get(first[j]).add(second[j]);
          inDegree.set(second[j], inDegree.get(second[j]) + 1);
        }
        break; // only the first difference carries information
      }
    }
  }

  const queue = [];
  for (const [ch, degree] of inDegree) {
    if (degree === 0) queue.push(ch);
  }

  const order = [];
  for (let head = 0; head < queue.length; head++) {
    const ch = queue[head];
    order.push(ch);
    for (const next of graph.get(ch)) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }

  // Letters left unplaced mean a cycle, so no valid order exists.
  return order.length === graph.size ? order.join('') : '';
}

if (require.main === module) {
  // More than one order can be correct, so check the result against every rule in the input.
  const isValidOrder = (words, order) => {
    const letters = new Set(words.join(''));
    if (order.length !== letters.size || new Set(order).size !== letters.size) return false;
    const rank = new Map([...order].map((ch, i) => [ch, i]));
    for (let i = 0; i < words.length - 1; i++) {
      const [a, b] = [words[i], words[i + 1]];
      const j = [...a].findIndex((ch, k) => ch !== b[k]);
      if (j === -1 || j >= b.length) {
        if (a.length > b.length) return false;
        continue;
      }
      if (rank.get(a[j]) > rank.get(b[j])) return false;
    }
    return true;
  };

  const tests = [
    { words: ['z', 'o'], expected: 'zo' },
    { words: ['hrn', 'hrf', 'er', 'enn', 'rfnn'], expected: 'hernf' },
    { words: ['abc', 'ab'], expected: '' },
  ];
  for (const { words, expected } of tests) {
    const actual = foreignDictionary(words);
    const pass = expected === '' ? actual === '' : isValidOrder(words, actual);
    console.log(
      `Input: ${JSON.stringify(words)} | Expected: "${expected}" | Got: "${actual}" | ${pass ? 'PASS' : 'FAIL'}`
    );
  }
}

module.exports = { foreignDictionary };

/**
 * Complexity:
 *   Time:  O(N + V + E)
 *   Space: O(V + E)
 *
 * N is the total length of all words, scanned once to collect letters and compare neighbours;
 * the topological sort then visits each of the V letters and E edges once.
 * The graph, in-degree map and queue store at most V letters and E edges (V <= 26, E <= 26^2).
 */
