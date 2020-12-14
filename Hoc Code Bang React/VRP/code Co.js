let V = 5;

/**
 *
 * @param {2 dimensional array} graph
 * @param {int} s
 * @return {int min_path}
 */
// implementation of traveling Salesman Problem
const travellingSalesmanProblem = (graph, s) => {
  // store all vertex apart from source vertex
  let vertex = [];
  for (let index = 0; index < V; index++) {
    if (index != s) vertex.push(index);
  }
  // store minimum weight Hamiltonian Cycle.
  let min_path = Number.MAX_VALUE;
  let current_pathWeight;
  do {
    current_pathWeight = 0; //store current Path weight
    let k = s; // compute current path weight
    for (let index = 0; index < vertex.length; index++) {
      current_pathWeight += graph[k][vertex[index]];
      k = vertex[index];
    }
    current_pathWeight += graph[k][s];

    // update minimum
    min_path = Math.min(min_path, current_pathWeight);
    console.log(`${s},${vertex},${s}`, current_pathWeight);
  } while (findNextPermutation(vertex));

  return min_path;
};

/**
 *
 * @param {int Array} data
 * @param {int} left
 * @param {int} right
 * @return {int array}
 */
const swap = (data, left, right) => {
  let temp = data[left];
  data.splice(left, 1, data[right]);
  data.splice(right, 1, temp);

  return data;
};

/**
 *
 * @param {int array} data
 * @param {int} left
 * @param {int} right
 * @return {int array}
 */
// Function to reverse the sub-array starting from left to the right both inclusive
const reverse = (data, left, right) => {
  //Reserve the sub-array
  while (left < right) {
    let temp = data[left];
    data.splice(left++, 1, data[right]);
    data.splice(right--, 1, temp);
  }

  //Return the updated array
  return data;
};

/**
 *
 * @param {int array} data
 * @return {boolean}
 */
// Function to find the next permutation of the given integer array
const findNextPermutation = (data) => {
  // If the given dataset is empty or contains only one element next_permutation is not possible
  if (data.length <= 1) return false;

  let last = data.length - 2;
  // find the longest non-increasing suffix and find the pivot
  while (last >= 0) {
    if (data[last] < data[last + 1]) break;
    last--;
  }

  // If there is no increasing pair there is no higher order permutation
  if (last < 0) return false;
  let nextGreater = data.length - 1;

  // Find the rightmost successor to the pivot
  for (let index = data.length - 1; index > last; index--) {
    if (data[index] > data[last]) {
      nextGreater = index;
      break;
    }
  }

  // Swap the successor and the pivot
  data = swap(data, nextGreater, last);

  // Reverse the suffix
  data = reverse(data, last + 1, data.length - 1);

  // Return true as the next_permutation is done
  return true;
};

/**
 * @function main
 */
(function () {
  let s = 0;
  // let graph = [
  //   [0, 10, 15, 20],
  //   [10, 0, 35, 25],
  //   [15, 35, 0, 30],
  //   [20, 25, 30, 0],
  // ];
  let graph1 = [
    [0, 40, 60, 20, 30],
    [40, 0, 40, 45, 20],
    [60, 40, 0, 50, 35],
    [20, 45, 50, 0, 27],
    [30, 20, 35, 27, 0],
  ];
  let minPath = travellingSalesmanProblem(graph1, s);
  console.log(minPath);
})();
