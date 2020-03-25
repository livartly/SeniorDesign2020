/**
 * Validate parent set is partitioned completely
 *
 * @param   {String} parentString - comma delimited string form of set
 *  
 * @param   {Array} partitions - list of strings for each partition, 
 *  comma-delimited
 *
 * @returns {Null}
 */
export const validatePartition = (parentString, partitions) => {
  var aggregate = new Set();
  var parentSet = new Set(parentString.replace(/ /g, "").split(','));
  for (const partitionString of partitions) {
    var cleanPartitionString = partitionString.replace(/ /g, "");
    var partitionArray = cleanPartitionString.split(',');
    for (const item of partitionArray) {
      if (!parentSet.has(item)) {
        throw new Error(
          "Invalid Partition: " + item + " was not found in the parent set"
        );
      }
      if (aggregate.has(item)) {
        throw new Error(
          "Invalid Partition: " + item + " was found multiple times"
        );
      }
      aggregate.add(item);
    }
  }
  if (parentSet.size !== aggregate.size) {
    throw new Error("Invalid Partition: Partitions do not contain all items");
  }
};