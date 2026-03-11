
-- Seed quizzes into the database
INSERT INTO public.quizzes (id, title, topic, difficulty, questions) VALUES
('a1000000-0000-0000-0000-000000000001', 'Array Fundamentals', 'Arrays', 'Beginner', '[
  {"id":"q1","question":"What is the time complexity of accessing an element by index in an array?","options":["O(1)","O(n)","O(log n)","O(n²)"],"correctAnswer":0,"explanation":"Arrays provide O(1) random access because elements are stored in contiguous memory."},
  {"id":"q2","question":"Which operation is most expensive in an unsorted array?","options":["Access","Search","Append","Read length"],"correctAnswer":1,"explanation":"Searching in an unsorted array requires O(n) linear scan."},
  {"id":"q3","question":"What happens when you insert at the beginning of an array?","options":["O(1) operation","All elements shift right","Array is copied","Nothing changes"],"correctAnswer":1,"explanation":"Inserting at index 0 requires shifting all existing elements to the right, O(n)."},
  {"id":"q4","question":"Which data structure is an array most similar to?","options":["Linked List","Tuple","Stack","Graph"],"correctAnswer":1,"explanation":"Tuples, like arrays, store elements in contiguous indexed positions."},
  {"id":"q5","question":"What is a 2D array?","options":["An array of pointers","An array of arrays","A linked list variant","A hash table"],"correctAnswer":1,"explanation":"A 2D array is essentially an array where each element is itself an array."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000002', 'Advanced Array Techniques', 'Arrays', 'Intermediate', '[
  {"id":"q1","question":"What is the two-pointer technique used for?","options":["Sorting arrays","Solving pair/subarray problems efficiently","Binary search","Memory management"],"correctAnswer":1,"explanation":"Two pointers help solve pair-sum, subarray, and partition problems in O(n)."},
  {"id":"q2","question":"Kadane''s algorithm solves which problem?","options":["Sorting","Maximum subarray sum","Binary search","Matrix multiplication"],"correctAnswer":1,"explanation":"Kadane''s algorithm finds the maximum contiguous subarray sum in O(n)."},
  {"id":"q3","question":"What is a sliding window?","options":["A GUI element","A fixed-size subarray moving through data","A sorting method","A tree traversal"],"correctAnswer":1,"explanation":"Sliding window maintains a window of elements and slides it across the array."},
  {"id":"q4","question":"Prefix sum arrays are useful for?","options":["Sorting","Range sum queries","Graph traversal","String matching"],"correctAnswer":1,"explanation":"Prefix sums allow O(1) range sum queries after O(n) preprocessing."},
  {"id":"q5","question":"Dutch National Flag algorithm partitions array into how many parts?","options":["2","3","4","5"],"correctAnswer":1,"explanation":"It partitions into three parts: less than, equal to, and greater than pivot."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000003', 'String Basics', 'Strings', 'Beginner', '[
  {"id":"q1","question":"Are strings mutable in Python?","options":["Yes","No","Depends on length","Only in Python 3"],"correctAnswer":1,"explanation":"Strings in Python are immutable. Any modification creates a new string."},
  {"id":"q2","question":"What does string concatenation with + create?","options":["Modifies in place","A new string object","A pointer","Nothing"],"correctAnswer":1,"explanation":"Since strings are immutable, concatenation always creates a new string."},
  {"id":"q3","question":"Time complexity of checking if a character is in a string?","options":["O(1)","O(n)","O(log n)","O(n²)"],"correctAnswer":1,"explanation":"Without a hash set, checking membership requires scanning the string."},
  {"id":"q4","question":"What is a palindrome?","options":["A sorted string","A string that reads same forwards and backwards","An anagram","A substring"],"correctAnswer":1,"explanation":"Palindromes read identically in both directions, like ''racecar''."},
  {"id":"q5","question":"Which is the most efficient way to build a string from parts?","options":["Repeated +","join() method","String formatting only","Manual char array"],"correctAnswer":1,"explanation":"join() is O(n) total, while repeated + can be O(n²) due to copying."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000004', 'Recursion Fundamentals', 'Recursion', 'Beginner', '[
  {"id":"q1","question":"What must every recursive function have?","options":["A loop","A base case","A global variable","Multiple parameters"],"correctAnswer":1,"explanation":"Without a base case, recursion would continue infinitely causing a stack overflow."},
  {"id":"q2","question":"What data structure does recursion use internally?","options":["Queue","Array","Call stack","Heap"],"correctAnswer":2,"explanation":"Each recursive call adds a frame to the call stack."},
  {"id":"q3","question":"What is tail recursion?","options":["Recursion without a base case","Recursive call is the last operation","Recursion with two calls","Indirect recursion"],"correctAnswer":1,"explanation":"In tail recursion, the recursive call is the final operation, enabling optimization."},
  {"id":"q4","question":"Fibonacci without memoization has what complexity?","options":["O(n)","O(n²)","O(2^n)","O(log n)"],"correctAnswer":2,"explanation":"Naive recursive Fibonacci has exponential O(2^n) due to overlapping subproblems."},
  {"id":"q5","question":"What is memoization?","options":["A sorting technique","Caching results of function calls","A loop optimization","Memory allocation"],"correctAnswer":1,"explanation":"Memoization stores computed results to avoid redundant calculations."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000005', 'Sorting Algorithms', 'Sorting', 'Beginner', '[
  {"id":"q1","question":"What is the time complexity of Bubble Sort?","options":["O(n)","O(n log n)","O(n²)","O(log n)"],"correctAnswer":2,"explanation":"Bubble sort compares adjacent elements in nested loops, giving O(n²)."},
  {"id":"q2","question":"Which sorting algorithm is divide-and-conquer?","options":["Bubble Sort","Selection Sort","Merge Sort","Insertion Sort"],"correctAnswer":2,"explanation":"Merge Sort divides the array in half, sorts each half, then merges."},
  {"id":"q3","question":"Is Merge Sort stable?","options":["Yes","No","Depends on implementation","Only for integers"],"correctAnswer":0,"explanation":"Merge Sort preserves the relative order of equal elements."},
  {"id":"q4","question":"Best case of Insertion Sort?","options":["O(n²)","O(n log n)","O(n)","O(1)"],"correctAnswer":2,"explanation":"When the array is already sorted, insertion sort only makes n-1 comparisons."},
  {"id":"q5","question":"Quick Sort''s worst case occurs when?","options":["Array is random","Array is already sorted and pivot is first/last","Array has duplicates","Array is small"],"correctAnswer":1,"explanation":"Sorted input with poor pivot selection leads to O(n²) partitions."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000006', 'Searching Algorithms', 'Searching', 'Beginner', '[
  {"id":"q1","question":"Binary search requires the array to be?","options":["Empty","Sorted","Reversed","Unique elements only"],"correctAnswer":1,"explanation":"Binary search halves the search space, which only works on sorted data."},
  {"id":"q2","question":"Time complexity of binary search?","options":["O(n)","O(n²)","O(log n)","O(1)"],"correctAnswer":2,"explanation":"Each comparison eliminates half the remaining elements."},
  {"id":"q3","question":"Linear search works on?","options":["Only sorted arrays","Only linked lists","Any collection","Only trees"],"correctAnswer":2,"explanation":"Linear search scans elements one by one and works on any collection."},
  {"id":"q4","question":"What is interpolation search?","options":["Binary search variant using value distribution","A graph algorithm","A sorting method","A string matching algorithm"],"correctAnswer":0,"explanation":"Interpolation search estimates position based on value, useful for uniform data."},
  {"id":"q5","question":"Hash-based search has average complexity of?","options":["O(n)","O(log n)","O(1)","O(n²)"],"correctAnswer":2,"explanation":"Hash tables provide O(1) average lookup using hash functions."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000007', 'Linked List Concepts', 'Linked Lists', 'Intermediate', '[
  {"id":"q1","question":"What is the main advantage of linked lists over arrays?","options":["Faster access","Dynamic size and O(1) insertion at head","Less memory","Sorting"],"correctAnswer":1,"explanation":"Linked lists grow dynamically and inserting at head is O(1)."},
  {"id":"q2","question":"How do you detect a cycle in a linked list?","options":["Sort it","Floyd''s cycle detection (two pointers)","Use a stack","Count nodes"],"correctAnswer":1,"explanation":"Floyd''s algorithm uses slow and fast pointers that meet if a cycle exists."},
  {"id":"q3","question":"Time complexity of accessing the nth element?","options":["O(1)","O(n)","O(log n)","O(n²)"],"correctAnswer":1,"explanation":"You must traverse from head through n nodes sequentially."},
  {"id":"q4","question":"A doubly linked list node has?","options":["One pointer","Two pointers (next and prev)","Three pointers","No pointers"],"correctAnswer":1,"explanation":"Each node points to both next and previous nodes."},
  {"id":"q5","question":"Reversing a linked list requires?","options":["Extra array","Three pointers: prev, current, next","Recursion only","Sorting first"],"correctAnswer":1,"explanation":"Iterative reversal uses prev, current, and next pointers to flip links."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000008', 'Stacks and Queues', 'Stacks and Queues', 'Intermediate', '[
  {"id":"q1","question":"Stack follows which principle?","options":["FIFO","LIFO","Random","Priority"],"correctAnswer":1,"explanation":"Last In, First Out — the most recently added element is removed first."},
  {"id":"q2","question":"Queue follows which principle?","options":["LIFO","FIFO","Random","Sorted"],"correctAnswer":1,"explanation":"First In, First Out — elements are processed in arrival order."},
  {"id":"q3","question":"Which problem is typically solved using a stack?","options":["BFS","Balanced parentheses","Shortest path","Sorting"],"correctAnswer":1,"explanation":"Stacks track opening brackets and match them with closing ones."},
  {"id":"q4","question":"A priority queue is typically implemented with?","options":["Array","Linked list","Heap","Stack"],"correctAnswer":2,"explanation":"Heaps provide O(log n) insertion and O(1) access to min/max element."},
  {"id":"q5","question":"What is a monotonic stack?","options":["A stack that only grows","A stack maintaining sorted order of elements","A circular stack","A double-ended stack"],"correctAnswer":1,"explanation":"A monotonic stack maintains elements in increasing or decreasing order."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000009', 'Tree Fundamentals', 'Trees', 'Intermediate', '[
  {"id":"q1","question":"A binary tree node has at most how many children?","options":["1","2","3","Unlimited"],"correctAnswer":1,"explanation":"Binary means two — each node has at most a left and right child."},
  {"id":"q2","question":"What is inorder traversal of a BST?","options":["Random order","Sorted order","Reverse order","Level order"],"correctAnswer":1,"explanation":"Inorder traversal (left, root, right) of a BST produces sorted output."},
  {"id":"q3","question":"Height of a balanced BST with n nodes?","options":["O(n)","O(log n)","O(n²)","O(1)"],"correctAnswer":1,"explanation":"A balanced BST halves nodes at each level, giving O(log n) height."},
  {"id":"q4","question":"BFS on a tree uses which data structure?","options":["Stack","Queue","Heap","Array"],"correctAnswer":1,"explanation":"BFS processes nodes level by level using a queue."},
  {"id":"q5","question":"What is a complete binary tree?","options":["All leaves at same depth","Every level fully filled except possibly last","Every node has 2 children","A sorted tree"],"correctAnswer":1,"explanation":"Complete binary trees fill levels left to right, last level may be partial."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000010', 'Graph Basics', 'Graphs', 'Advanced', '[
  {"id":"q1","question":"DFS uses which data structure?","options":["Queue","Stack/Recursion","Heap","Array"],"correctAnswer":1,"explanation":"DFS explores depth-first using a stack (explicit or via recursion)."},
  {"id":"q2","question":"BFS finds shortest path in?","options":["Weighted graphs","Unweighted graphs","All graphs","Only trees"],"correctAnswer":1,"explanation":"BFS guarantees shortest path only when all edge weights are equal (unweighted)."},
  {"id":"q3","question":"Dijkstra''s algorithm cannot handle?","options":["Large graphs","Negative edge weights","Directed graphs","Sparse graphs"],"correctAnswer":1,"explanation":"Negative weights can cause Dijkstra to find incorrect shortest paths."},
  {"id":"q4","question":"Topological sort works on?","options":["Undirected graphs","DAGs (Directed Acyclic Graphs)","Cyclic graphs","Weighted graphs only"],"correctAnswer":1,"explanation":"Topological ordering is only defined for directed acyclic graphs."},
  {"id":"q5","question":"Space complexity of adjacency matrix?","options":["O(V)","O(E)","O(V²)","O(V+E)"],"correctAnswer":2,"explanation":"An adjacency matrix stores a V×V grid regardless of edge count."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000011', 'Dynamic Programming Intro', 'Dynamic Programming', 'Advanced', '[
  {"id":"q1","question":"What are the two properties needed for DP?","options":["Sorting and searching","Optimal substructure and overlapping subproblems","Divide and conquer","Greedy choice and feasibility"],"correctAnswer":1,"explanation":"DP requires optimal substructure (solution from subproblems) and overlapping subproblems."},
  {"id":"q2","question":"What is the difference between top-down and bottom-up DP?","options":["No difference","Top-down uses recursion+memoization, bottom-up uses iteration","Top-down is faster","Bottom-up uses more memory"],"correctAnswer":1,"explanation":"Top-down solves recursively and caches; bottom-up builds solution iteratively from base cases."},
  {"id":"q3","question":"The 0/1 Knapsack problem is solved with?","options":["Greedy","DP","Sorting","BFS"],"correctAnswer":1,"explanation":"0/1 Knapsack requires considering all combinations, making DP the optimal approach."},
  {"id":"q4","question":"What is the time complexity of the LCS problem?","options":["O(n)","O(n log n)","O(n×m)","O(2^n)"],"correctAnswer":2,"explanation":"Longest Common Subsequence DP table is n×m where n and m are string lengths."},
  {"id":"q5","question":"Coin change problem: minimum coins for amount?","options":["Greedy always works","DP is needed for optimal solution","Sorting suffices","Binary search"],"correctAnswer":1,"explanation":"Greedy fails for some coin sets; DP systematically finds the minimum."}
]'::jsonb),
('a1000000-0000-0000-0000-000000000012', 'Programming Basics', 'Programming Basics', 'Beginner', '[
  {"id":"q1","question":"What is a variable?","options":["A function","A named storage location for data","A loop","An operator"],"correctAnswer":1,"explanation":"Variables store values that can be referenced and modified."},
  {"id":"q2","question":"Which is NOT a primitive data type?","options":["int","float","Array","boolean"],"correctAnswer":2,"explanation":"Arrays are composite/reference types, not primitives."},
  {"id":"q3","question":"What does a for loop do?","options":["Declares a variable","Repeats code a specific number of times","Defines a function","Handles errors"],"correctAnswer":1,"explanation":"For loops iterate a block of code for a defined number of iterations."},
  {"id":"q4","question":"What is a function?","options":["A variable type","A reusable block of code","A data structure","A file type"],"correctAnswer":1,"explanation":"Functions encapsulate reusable logic that can be called with different arguments."},
  {"id":"q5","question":"What is the purpose of conditional statements?","options":["Loop execution","Execute code based on conditions","Define variables","Import modules"],"correctAnswer":1,"explanation":"if/else statements allow branching based on boolean conditions."}
]'::jsonb)
ON CONFLICT (id) DO NOTHING;
