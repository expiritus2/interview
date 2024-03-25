const { findPath } = require('./index3');

const graph = { A: ['B', 'D'], B: ['C', 'N', 'Z'], D: ['E', 'F'], F: ['S'] }

async function fetchFlights(from) {
  return graph[from];
}

describe('solution', () => {
  it('case 1', async () => {
    const result = await findPath('A', 'N', fetchFlights); // Promise.resolve(['A', 'B', 'N']);)
    expect(result).toEqual(['A', 'B', 'N']);
  });

  it('case 2', async () => {
    const result = await findPath('A', 'S', fetchFlights); // Promise.resolve(['A', 'D', 'F', 'S']);)
    expect(result).toEqual(['A', 'D', 'F', 'S']);
  });

  it('case 3', async () => {
    const result = await findPath('B', 'S', fetchFlights) // Promise.reject(new Error('No way');)
    expect(result).toEqual('No way');
  });
});
