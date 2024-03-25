// функция поиска вариантов перелетов из точки

// Например, для

// findPath('A', 'N', fetchFlights).then((result) => console.log(result)); // Promise.resolve(['A', 'B', 'N']);)
// findPath('A', 'S', fetchFlights).then((result) => console.log(result)); // Promise.resolve(['A', 'D', 'F', 'S']);)
// findPath('B', 'S', fetchFlights).then((result) => console.log(result)); // Promise.reject(new Error('No way');)

// graph = { A: [B, D], B: [C, N, Z], D: [E, F], F: [S] }

async function findPath(start, end, fetchFlights) {
  const visited = new Set();
  const stack = [
    [start, [start]]
  ];

  while (stack.length > 0) {
    const [currentNode, path] = stack.pop();

    if (currentNode === end) {
      return path;
    }

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      const neighbors = await fetchFlights(currentNode) || [];
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push([neighbor, [...path, neighbor]]);
        }
      }
    }
  }

  return 'No way';
}

module.exports = {
  findPath
}
