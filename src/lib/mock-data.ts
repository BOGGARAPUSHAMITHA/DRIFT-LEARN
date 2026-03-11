// Mock data for the entire application

export type UserRole = "student" | "instructor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Question {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topic: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  hints: string[];
  starterCode: Record<string, string>;
}

export interface Submission {
  id: string;
  studentId: string;
  questionId: string;
  questionTitle: string;
  code: string;
  language: string;
  result: "pass" | "fail";
  executionTime: number;
  timestamp: string;
  topic: string;
  difficulty: string;
}

export interface StudentAnalytics {
  studentId: string;
  totalSolved: number;
  accuracy: number;
  currentLevel: string;
  streak: number;
  topicAccuracy: Record<string, number>;
  driftScore: number;
  driftHistory: number[];
  weeklySubmissions: { day: string; count: number }[];
  accuracyTrend: { date: string; accuracy: number }[];
  topicProgress: { topic: string; solved: number; total: number; accuracy: number }[];
  difficultyProgress: { level: string; solved: number; total: number }[];
  timePerProblem: { date: string; minutes: number }[];
}

export const TOPICS = [
  "Arrays", "Strings", "Recursion", "Sorting", "Searching",
  "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Dynamic Programming"
];

export const LANGUAGES = ["Python", "Java", "C++", "JavaScript"];

export const mockQuestions: Question[] = [
  {
    id: "q1", title: "Two Sum", difficulty: "Beginner", topic: "Arrays",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }],
    hints: ["Try using a hash map to store seen values.", "For each element, check if target - element exists in the map."],
    starterCode: { Python: "def two_sum(nums, target):\n    # Write your solution here\n    pass", JavaScript: "function twoSum(nums, target) {\n  // Write your solution here\n}", Java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n    }\n}", "C++": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n    }\n};" }
  },
  {
    id: "q2", title: "Reverse String", difficulty: "Beginner", topic: "Strings",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    examples: [{ input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }],
    hints: ["Use two pointers from both ends."],
    starterCode: { Python: "def reverse_string(s):\n    pass", JavaScript: "function reverseString(s) {\n}", Java: "class Solution {\n    public void reverseString(char[] s) {\n    }\n}", "C++": "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n    }\n};" }
  },
  {
    id: "q3", title: "Fibonacci Number", difficulty: "Beginner", topic: "Recursion",
    description: "The Fibonacci numbers form a sequence such that each number is the sum of the two preceding ones. Given n, calculate F(n).",
    examples: [{ input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." }],
    hints: ["Base cases: F(0) = 0, F(1) = 1", "Try memoization for optimization."],
    starterCode: { Python: "def fib(n):\n    pass", JavaScript: "function fib(n) {\n}", Java: "class Solution {\n    public int fib(int n) {\n    }\n}", "C++": "class Solution {\npublic:\n    int fib(int n) {\n    }\n};" }
  },
  {
    id: "q4", title: "Bubble Sort", difficulty: "Beginner", topic: "Sorting",
    description: "Implement bubble sort algorithm to sort an array of integers in ascending order.",
    examples: [{ input: "arr = [64, 34, 25, 12, 22, 11, 90]", output: "[11, 12, 22, 25, 34, 64, 90]" }],
    hints: ["Compare adjacent elements and swap if needed.", "Repeat until no swaps are needed."],
    starterCode: { Python: "def bubble_sort(arr):\n    pass", JavaScript: "function bubbleSort(arr) {\n}", Java: "class Solution {\n    public int[] bubbleSort(int[] arr) {\n    }\n}", "C++": "class Solution {\npublic:\n    vector<int> bubbleSort(vector<int>& arr) {\n    }\n};" }
  },
  {
    id: "q5", title: "Binary Search", difficulty: "Beginner", topic: "Searching",
    description: "Given a sorted array of integers and a target value, return the index of the target if found, otherwise return -1.",
    examples: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }],
    hints: ["Use two pointers: left and right.", "Compare middle element with target."],
    starterCode: { Python: "def binary_search(nums, target):\n    pass", JavaScript: "function binarySearch(nums, target) {\n}", Java: "class Solution {\n    public int search(int[] nums, int target) {\n    }\n}", "C++": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n    }\n};" }
  },
  {
    id: "q6", title: "Reverse Linked List", difficulty: "Intermediate", topic: "Linked Lists",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }],
    hints: ["Use three pointers: prev, current, next.", "Iterate through the list reversing pointers."],
    starterCode: { Python: "def reverse_list(head):\n    pass", JavaScript: "function reverseList(head) {\n}", Java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n    }\n}", "C++": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n    }\n};" }
  },
  {
    id: "q7", title: "Valid Parentheses", difficulty: "Intermediate", topic: "Stacks",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [{ input: 's = "([])"', output: "true" }, { input: 's = "(]"', output: "false" }],
    hints: ["Use a stack to track opening brackets.", "When you see a closing bracket, check the stack top."],
    starterCode: { Python: "def is_valid(s):\n    pass", JavaScript: "function isValid(s) {\n}", Java: "class Solution {\n    public boolean isValid(String s) {\n    }\n}", "C++": "class Solution {\npublic:\n    bool isValid(string s) {\n    }\n};" }
  },
  {
    id: "q8", title: "Implement Queue using Stacks", difficulty: "Intermediate", topic: "Queues",
    description: "Implement a first in first out (FIFO) queue using only two stacks.",
    examples: [{ input: 'push(1), push(2), peek(), pop(), empty()', output: "1, 1, false" }],
    hints: ["Use two stacks: one for push, one for pop.", "Transfer elements between stacks when needed."],
    starterCode: { Python: "class MyQueue:\n    def __init__(self):\n        pass", JavaScript: "class MyQueue {\n  constructor() {\n  }\n}", Java: "class MyQueue {\n    public MyQueue() {\n    }\n}", "C++": "class MyQueue {\npublic:\n    MyQueue() {\n    }\n};" }
  },
  {
    id: "q9", title: "Maximum Depth of Binary Tree", difficulty: "Intermediate", topic: "Trees",
    description: "Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from root to leaf.",
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }],
    hints: ["Use recursion: depth = 1 + max(left_depth, right_depth)", "Base case: null node returns 0"],
    starterCode: { Python: "def max_depth(root):\n    pass", JavaScript: "function maxDepth(root) {\n}", Java: "class Solution {\n    public int maxDepth(TreeNode root) {\n    }\n}", "C++": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n    }\n};" }
  },
  {
    id: "q10", title: "Number of Islands", difficulty: "Advanced", topic: "Graphs",
    description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    examples: [{ input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: "2" }],
    hints: ["Use DFS or BFS to traverse connected land cells.", "Mark visited cells to avoid counting them again."],
    starterCode: { Python: "def num_islands(grid):\n    pass", JavaScript: "function numIslands(grid) {\n}", Java: "class Solution {\n    public int numIslands(char[][] grid) {\n    }\n}", "C++": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n    }\n};" }
  },
  {
    id: "q11", title: "Longest Increasing Subsequence", difficulty: "Advanced", topic: "Dynamic Programming",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    examples: [{ input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The LIS is [2,3,7,101]" }],
    hints: ["Use DP where dp[i] = length of LIS ending at index i.", "For optimization, use binary search with patience sorting."],
    starterCode: { Python: "def length_of_lis(nums):\n    pass", JavaScript: "function lengthOfLIS(nums) {\n}", Java: "class Solution {\n    public int lengthOfLIS(int[] nums) {\n    }\n}", "C++": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n    }\n};" }
  },
  {
    id: "q12", title: "Merge Sort", difficulty: "Intermediate", topic: "Sorting",
    description: "Implement the merge sort algorithm to sort an array of integers.",
    examples: [{ input: "arr = [38, 27, 43, 3, 9, 82, 10]", output: "[3, 9, 10, 27, 38, 43, 82]" }],
    hints: ["Divide the array into halves recursively.", "Merge the sorted halves back together."],
    starterCode: { Python: "def merge_sort(arr):\n    pass", JavaScript: "function mergeSort(arr) {\n}", Java: "class Solution {\n    public int[] mergeSort(int[] arr) {\n    }\n}", "C++": "class Solution {\npublic:\n    vector<int> mergeSort(vector<int>& arr) {\n    }\n};" }
  },
];

// Generate mock submissions for a student
function generateSubmissions(studentId: string): Submission[] {
  const subs: Submission[] = [];
  const now = Date.now();
  for (let i = 0; i < 35; i++) {
    const q = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
    const passed = Math.random() > 0.35;
    subs.push({
      id: `sub-${studentId}-${i}`,
      studentId,
      questionId: q.id,
      questionTitle: q.title,
      code: q.starterCode["Python"] || "",
      language: LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)],
      result: passed ? "pass" : "fail",
      executionTime: Math.floor(Math.random() * 500) + 50,
      timestamp: new Date(now - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      topic: q.topic,
      difficulty: q.difficulty,
    });
  }
  return subs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateAnalytics(studentId: string, submissions: Submission[]): StudentAnalytics {
  const passed = submissions.filter(s => s.result === "pass").length;
  const accuracy = submissions.length > 0 ? Math.round((passed / submissions.length) * 100) : 0;

  const topicAcc: Record<string, number> = {};
  TOPICS.forEach(topic => {
    const topicSubs = submissions.filter(s => s.topic === topic);
    if (topicSubs.length > 0) {
      const topicPassed = topicSubs.filter(s => s.result === "pass").length;
      topicAcc[topic] = Math.round((topicPassed / topicSubs.length) * 100);
    } else {
      topicAcc[topic] = 0;
    }
  });

  const driftHistory: number[] = [];
  for (let i = 0; i < 30; i++) {
    driftHistory.push(parseFloat((Math.random() * 0.6 + (studentId === "s3" ? 0.35 : 0.05)).toFixed(2)));
  }
  const driftScore = driftHistory[driftHistory.length - 1];

  const accuracyTrend = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    accuracyTrend.push({ date: d.toISOString().slice(5, 10), accuracy: Math.round(50 + Math.random() * 40 + (studentId === "s3" ? -20 : 0)) });
  }

  const topicProgress = TOPICS.map(topic => {
    const topicSubs = submissions.filter(s => s.topic === topic);
    const topicPassed = topicSubs.filter(s => s.result === "pass").length;
    return { topic, solved: topicPassed, total: 10, accuracy: topicAcc[topic] };
  });

  const weeklySubmissions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => ({
    day, count: Math.floor(Math.random() * 8)
  }));

  const difficultyProgress = [
    { level: "Beginner", solved: Math.floor(Math.random() * 10) + 5, total: 20 },
    { level: "Intermediate", solved: Math.floor(Math.random() * 8) + 2, total: 20 },
    { level: "Advanced", solved: Math.floor(Math.random() * 5), total: 15 },
  ];

  const timePerProblem = [];
  for (let i = 14; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    timePerProblem.push({ date: d.toISOString().slice(5, 10), minutes: Math.floor(Math.random() * 30) + 5 });
  }

  return {
    studentId,
    totalSolved: passed,
    accuracy,
    currentLevel: accuracy > 70 ? "Intermediate" : "Beginner",
    streak: Math.floor(Math.random() * 10) + 1,
    topicAccuracy: topicAcc,
    driftScore,
    driftHistory,
    weeklySubmissions,
    accuracyTrend,
    topicProgress,
    difficultyProgress,
    timePerProblem,
  };
}

export const mockStudents: User[] = [
  { id: "s1", name: "Alex Chen", email: "alex@student.edu", role: "student" },
  { id: "s2", name: "Maria Garcia", email: "maria@student.edu", role: "student" },
  { id: "s3", name: "James Wilson", email: "james@student.edu", role: "student" },
  { id: "s4", name: "Priya Patel", email: "priya@student.edu", role: "student" },
  { id: "s5", name: "Liam O'Brien", email: "liam@student.edu", role: "student" },
  { id: "s6", name: "Yuki Tanaka", email: "yuki@student.edu", role: "student" },
];

export const mockInstructor: User = { id: "i1", name: "Dr. Sarah Mitchell", email: "mitchell@university.edu", role: "instructor" };

export const allSubmissions: Record<string, Submission[]> = {};
export const allAnalytics: Record<string, StudentAnalytics> = {};

mockStudents.forEach(s => {
  allSubmissions[s.id] = generateSubmissions(s.id);
  allAnalytics[s.id] = generateAnalytics(s.id, allSubmissions[s.id]);
});

// Force s3 to have high drift for demo
allAnalytics["s3"].driftScore = 0.82;
allAnalytics["s3"].driftHistory[29] = 0.82;
allAnalytics["s3"].driftHistory[28] = 0.78;
allAnalytics["s3"].driftHistory[27] = 0.75;
allAnalytics["s3"].accuracy = 42;
allAnalytics["s3"].topicAccuracy["Recursion"] = 25;
allAnalytics["s3"].topicAccuracy["Dynamic Programming"] = 20;

// Force s5 to have borderline drift
allAnalytics["s5"].driftScore = 0.71;
allAnalytics["s5"].driftHistory[29] = 0.71;
allAnalytics["s5"].accuracy = 55;
allAnalytics["s5"].topicAccuracy["Trees"] = 30;
