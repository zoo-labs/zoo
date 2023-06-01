[View code on GitHub](zoo-labs/zoo/blob/master/zdk/research/MultiRouting/src/MultiRouter3.ts)

The `Graph` class in the `zoo` project is responsible for finding the best route for a given trade between two tokens. It does this by constructing a graph of all the pools that contain the two tokens and then finding the path with the highest output. The graph is constructed by creating a `Vertice` object for each token and an `Edge` object for each pool. The `Edge` object contains information about the pool, the two vertices it connects, and the amount of liquidity that has been passed between them. The `Vertice` object contains information about the token and a list of all the edges that connect it to other vertices.

The `Graph` class has several methods that are used to find the best route. The `findBestPath` method takes the starting and ending tokens, as well as the amount of input, and returns the path with the highest output. It does this by using Dijkstra's algorithm to find the shortest path between the two vertices. The `addPath` method takes a path and applies the swaps necessary to move liquidity along that path. The `findBestRoute` method takes the starting and ending tokens, as well as the amount of input, and returns the best route. It does this by calling `findBestPath` multiple times and applying the swaps necessary to move liquidity along each path. Finally, the `getRouteLegs` method returns an array of `RouteLeg` objects that describe the path taken by the trade.

Overall, the `Graph` class is a critical component of the `zoo` project as it enables users to find the best route for a given trade. This is essential for ensuring that trades are executed efficiently and that users get the best possible price. Below is an example of how the `Graph` class might be used in the larger project:

```javascript
const pools = [pool1, pool2, pool3]; // an array of all the pools in the system
const graph = new Graph(pools); // create a new graph object
const route = graph.findBestRoute(token1, token2, amountIn); // find the best route for a trade between token1 and token2
console.log(route); // print the details of the best route
```
## Questions: 
 1. What is the purpose of the `Graph` class and how is it used in the project?
- The `Graph` class represents a graph of `Vertice` and `Edge` objects that model liquidity pools and routes between them.
- It is used to find the best path and route for a given input amount between two tokens, taking into account gas costs and liquidity constraints.

2. What is the significance of the `GasConsumption` constant in the `Edge` class?
- The `GasConsumption` constant represents the amount of gas consumed by a swap operation in the corresponding liquidity pool.
- It is used to calculate the gas cost of a swap and to determine whether a swap is profitable based on the resulting output amount.

3. How does the `findBestRoute` method in the `Graph` class handle multiple iterations of finding the best path and route?
- The `findBestRoute` method divides the input amount into `steps` equal parts and finds the best path and route for each part.
- It then aggregates the output amount, gas cost, and total output amount for all iterations to determine the final route.