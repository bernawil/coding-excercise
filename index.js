// Problem 1

// Graph root representation
const root = {
  value: { id: 1, label: "a" },
  children: [
    {
      value: { id: 2, label: "B" },
      children: [
        {
          value: { id: 5, label: "E" },
          children: []
        },
        {
          value: { id: 6, label: "F" },
          children: []
        },
        {
          value: { id: 7, label: "G" },
          children: []
        }
      ]
    },
    {
      value: { id: 3, label: "C" },
      children: []
    },
    {
      value: { id: 4, label: "D" },
      children: [
        {
          value: { id: 8, label: "H" },
          children: []
        },
        {
          value: { id: 9, label: "I" },
          children: []
        }
      ]
    }
  ]
};

//  Problem 2

//  Stub an API
const api = (succeeds = true) => ({
  // mock an http request to the server serializing & deserializing the graph
  get: () =>
    new Promise(
      (resolve, reject) =>
        succeeds
          ? resolve(JSON.parse(JSON.stringify(root)))
          : reject({ error: "test error" })
    )
});

// Problem 3
// Implements Depth First Search
// Note: assumes id is unique, returns a single match
const find = (node, nodeId) => {
  if (node.value.id === nodeId) return node.value.label;
  if (!node.children.length) return null;
  let match = null;
  node.children.forEach(child => {
    if (!match) match = find(child, nodeId);
  });
  return match;
};

// Full Test
const graphTestValues = {
  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};

const test = () => {
  console.log("Problem 2:");

  console.log("failing request test");
  const failApi = api(false);
  failApi.get().catch(err => {
    console.log("server response: ", err);
  });

  console.log("test successful request");
  const successApi = api(true);
  successApi.get().then(graph => {
    console.log("Problem 3: test graph search");
    graphTestValues.ids.forEach(value => {
      const match = find(graph, value);
      match
        ? console.log(`node with id ${value} holds label ${match}`)
        : console.log(`no node with id ${value} found`);
    });
  });
};

// Program entry point
test();
