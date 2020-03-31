import { LogicalSet } from '../Sets/LogicalSet';

const parseRelationToMapping = (inputRelation) => {
  var fromToMap = {};
  var toFromMap = {};

  for (const relation of inputRelation) {
    if (!fromToMap[relation[0]])
      fromToMap[relation[0]] = new Set();
    if (!toFromMap[relation[1]])
      toFromMap[relation[1]] = new Set();
    if (relation[0] !== relation[1]) {
      fromToMap[relation[0]].add(relation[1]);
      toFromMap[relation[1]].add(relation[0]);
    }
  }
  return { fromToMap, toFromMap };
};

const parseLayers = (toFromMap) => {
  var copy = {};
  var layers = [];
  for (const toKey of Object.keys(toFromMap)) {
    copy[toKey] = new Set(toFromMap[toKey]);
  }
  while (Object.keys(copy).length > 0) {
    let oneLayer = [];
    for (const toKey in copy) {
      if (copy[toKey].size === 0) {
        oneLayer.push(toKey);
      }
    }
    for (const toKey of Object.keys(copy)) {
      for (var i = 0; i < oneLayer.length; i++) {
        copy[toKey].delete(oneLayer[i]);
      }
    }
    for (var j = 0; j < oneLayer.length; j++) {
      delete copy[oneLayer[j]];
    }
    layers.push(oneLayer);
  }
  return layers;
};

const getCriticalEdges = (fromToMap, toFromMap) => {
  var result = [];
  for (const toKey of Object.keys(toFromMap)) {
    var nodeSet = new LogicalSet(toFromMap[toKey]);
    var toArray = Array.from(toFromMap[toKey]);
    for (const fromKey of toArray) {
      if (nodeSet.intersection(fromToMap[fromKey]).size === 0)
        result.push({ from: fromKey, to: toKey });
    }
  }
  return result;
};

const parseNodesFromLayers = (layers, width, height) => {
  var nodes = [];
  var maxX = 0;
  var maxY = layers.length;
  for (const layer of layers) {
    if (layer.length > maxX) maxX = layer.length;
  }
  if (maxX === 0 || maxY === 0) return nodes;

  var unitX = Math.floor(width / (maxX + 1));
  var unitY = Math.floor(height / (maxY + 1));

  for (var i = 0; i < layers.length; i++) {
    for (var j = 0; j < layers[i].length; j++) {
      var node = { id: layers[i][j] };
      node.x = (j + 1) * unitX;
      node.y = height - ((i + 1) * unitY);
      nodes.push(node);
    }
  }
  return nodes;
};

const findMaximalMinimalNodes = (fromToMap, toFromMap) => {
  var maximalNodes = [];
  var minimalNodes = [];
  for (const fromKey of Object.keys(fromToMap))
    if (fromToMap[fromKey].size === 0)
      maximalNodes.push(fromKey);
  for (const toKey of Object.keys(toFromMap))
    if (toFromMap[toKey].size === 0)
      minimalNodes.push(toKey);
  return { maximalNodes, minimalNodes };
};

export const parseInputDataToGraphData = (inputRelation, width, height) => {
  // convert all input data to string
  for (var i = 0; i < inputRelation.length; i++) {
    inputRelation[i][0] = inputRelation[i][0].toString();
    inputRelation[i][1] = inputRelation[i][1].toString();
  }

  var { fromToMap, toFromMap } = parseRelationToMapping(inputRelation);
  var { maximalNodes, minimalNodes } = findMaximalMinimalNodes(fromToMap, toFromMap);
  var layers = parseLayers(toFromMap);
  var nodes = parseNodesFromLayers(layers, width, height);
  var edges = getCriticalEdges(fromToMap, toFromMap);
  return {
    graphData: { nodes, edges },
    extremes: { maximalNodes, minimalNodes }
  };
};