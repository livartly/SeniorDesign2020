# Types of problems

## 1.1 Statements, Symbolic Representations and Tautologies
### Truth Table Builder
User will input a well-formed formula (wff) and optionally, to show intermediates (verbose on/off). The output will be a truth table that has a row for each combination of the individual arguments. The output will also indicate if the wff provided is a tautology (last column is always true) or a contradiction (last column is never true).  

## 1.2 Propositional Logic
Omitting because entirety is based on proofs. Will verify with instructor.

## 3.1 Recursive Definitions
### Recursive Sequence Builder
User will input one or more base cases, a recurrence relation, and the number of additional elements expected (n). The Recursive Sequence Builder will validate the input will yield tractable results and then output the next n number of elements in the recurrence relation.

## 4.1 Sets
### Subset Determination
User will define and provide all elements for two or more sets. Sets may consist of strings or numbers. The output will display all cases where a set is a proper subset of another set.

### Powerset
User will provide all elements of a set. The engine will check if the powerset will have a reasonable size. If so, the output will be the powerset of the provided set.

### Set Operations (Union, Intersection, Subtraction, Cartesian Product)
User will define and provide all elements of two separate sets. User will also pick one of the 4 supported operations of sets. The output will be the result of the set operation.

## 5.1 Relations
### Multiplicity Classifier
User will provide a relation (which can be viewed as list of ordered pairs). The program will classify the provided relation as either one-to-one, one-to-many, many-to-one, or many-to-many.

### Closure (Reflexive, Transitive, Symmetric, Anti-Symmetric)
User will provide a set and a relation. The engine will verify the relation is bound by the provided set and then classify the relation for each of the supported properties (reflexive, transitive, symmetric, anti-symmetric). In addition, the output will display the reflexive, transitive, and symmetric closure for the provided relation.

### Hasse Diagram (5.1 problems 31, 32)
User will provide a set and a partial ordering. The engine will illustrate a Hasse diagram for the given information. It will also list all least, minimal, greatest, and maximal elements.

### Equivalence Class (5.1 problem 51)
User will provide the partitions to a set. If there is any overlap conflict (same element is in multiple partition) an error will be provided. The engine will list the pairs for the given correesponding equivalence relation.

## 5.2 Topological Sorting
### PERT Chart (5.2 problem 3-6)
User will fill out a table with information on several tasks, including task name, prerequisite tasks, and time required. The engine will output a PERT chart from the provided information and give the minimum time required to complete all nodes on the critical path.

### Topological sort (5.2 problem 9-14)
This can be an addendum to PERT chart problems. User provides a table with information on tasks with information on prerequisite tasks for each. The engine will sort the tasks via topological sort and output the order.

## 5.4 Functions
### Form conversion (5.4 problem 53)
User will select either array to cycle form conversion or vice versa. User will also provide a set and the appropriate input type for a function. The engine will convert to the other type.

### Composition of cycles (5.4 problem 56-59)
User will provide a set and series of composition functions. The engine will give the composition of the cycles.

## 5.5 Order of Magnitude
### Same order verification (5.5 problem 1-6)
User will provide two functions f(x) and g(x). If f and g have the same order of magnitude, the engine will satisfy the requirement by provide n, c1, and c2 such that for x > n, c1g(x) < f(x) < c2g(x). If f and g do not have the same order of magnitude, the engine will indicate as such.

### Finding order of magnitude with Masters' Theorem (5.5 problem 21-26)
User will input a recurrence relation, S(n). The engine will use Masters' Theorem to determine what order of magnitude S has.

## 5.7 Matrices (Only Boolean Matrix section)
### Boolean Matrices calculator (5.7 problem 47-50)
User will enter two boolean matrices, A and B. The engine will verify that both are square matrices and have the same dimensions. The engine will them output the results for 4 operations (A^B, AvB, AXB, BXA).

## 6.1 Graphs and Their Representations
### Graph Converter
User will indicate if the provided graph is undirected or directed. User will be able to input a graph in one of four modes: visually, adjacency matrix, adjacency relation, or adjacency list. The engine will translate the graph into the other three modes. (Very challenging)

## 6.2 Trees and Their Representations
### Expression tree illustrator (6.2 problem 5-8)
User will input a mathematical expression which may contain variables (strings), integers, one of the 4 basic math operations, and parenthesis/braces. The engine will illustrate the expression tree.

### Tree converter (6.2 problem 9-12)
User will input a table in left-child/right-child representation of a tree. The engine will validate that a viable binary tree can be illustrated and will provide the binary tree representation. The inverse method is also supported (binary tree to left-child/right-child representation)

### Traversal-Preorder, Postorder, Inorder (6.2 problem 19-24)
User will input a binary tree via a graphical tool and provides names for each of the nodes. The engine will provide the pre order, in order, and post order traversal for the tree.

### Notation conversion-infix, prefix, postfix (6.2 problem 25-32)
User will provide an expression and indicate which type of notation it is to be considered in. The expression will be space delimited and contain either characters, integers, basic operators, and parenthesis. The engine will output the same expression represented in the other two notations.

## 7.1 Directed Graphs and Binary Relations; Warshall’s Algorithm
### Reachability Matrix
User will input a adjacency matrix, A, and the reach as an integer. The engine will verify that A is square. Using Warshall's Algorithm, the engine will compute the reachability matrix for the given reach and adjacency matrix.