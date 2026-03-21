/**
 * problems.js
 * Contains all coding problems for MaxxArena.
 * Each problem includes solutions in Python, Java, and C++.
 */
const problems = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    category: "Arrays",
    solutions: {
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
    },
    explanation:
      "Use a hash map to store each number and its index. For each number, check if (target - number) already exists in the map. This gives O(n) time complexity.",
  },
  {
    id: 2,
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
    difficulty: "Easy",
    category: "Strings",
    solutions: {
      python: `def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1`,
      java: `public void reverseString(char[] s) {
    int left = 0, right = s.length - 1;
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}`,
      cpp: `void reverseString(vector<char>& s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
}`,
    },
    explanation:
      "Use two pointers — one at the start and one at the end. Swap elements at both pointers and move them toward the center. Time: O(n), Space: O(1).",
  },
  {
    id: 3,
    title: "FizzBuzz",
    description:
      "Given an integer n, return a string array answer where: answer[i] == 'FizzBuzz' if i is divisible by 3 and 5, answer[i] == 'Fizz' if i is divisible by 3, answer[i] == 'Buzz' if i is divisible by 5, and answer[i] == i (as a string) otherwise.",
    difficulty: "Easy",
    category: "Math",
    solutions: {
      python: `def fizz_buzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result`,
      java: `public List<String> fizzBuzz(int n) {
    List<String> result = new ArrayList<>();
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) {
            result.add("FizzBuzz");
        } else if (i % 3 == 0) {
            result.add("Fizz");
        } else if (i % 5 == 0) {
            result.add("Buzz");
        } else {
            result.add(String.valueOf(i));
        }
    }
    return result;
}`,
      cpp: `vector<string> fizzBuzz(int n) {
    vector<string> result;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) {
            result.push_back("FizzBuzz");
        } else if (i % 3 == 0) {
            result.push_back("Fizz");
        } else if (i % 5 == 0) {
            result.push_back("Buzz");
        } else {
            result.push_back(to_string(i));
        }
    }
    return result;
}`,
    },
    explanation:
      "Iterate from 1 to n. Check divisibility by 15 first (for FizzBuzz), then 3, then 5. Otherwise, use the number itself.",
  },
  {
    id: 4,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    difficulty: "Easy",
    category: "Stack",
    solutions: {
      python: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) {
            return false;
        }
    }
    return stack.isEmpty();
}`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.empty() || st.top() != c) {
            return false;
        } else {
            st.pop();
        }
    }
    return st.empty();
}`,
    },
    explanation:
      "Use a stack. Push opening brackets onto the stack. When encountering a closing bracket, check if it matches the top of the stack. If the stack is empty at the end, the string is valid.",
  },
  {
    id: 5,
    title: "Palindrome Number",
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same forward and backward.",
    difficulty: "Easy",
    category: "Math",
    solutions: {
      python: `def is_palindrome(x):
    if x < 0:
        return False
    original = x
    reversed_num = 0
    while x > 0:
        reversed_num = reversed_num * 10 + x % 10
        x //= 10
    return original == reversed_num`,
      java: `public boolean isPalindrome(int x) {
    if (x < 0) return false;
    int original = x;
    int reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    return original == reversed;
}`,
      cpp: `bool isPalindrome(int x) {
    if (x < 0) return false;
    long original = x;
    long reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    return original == reversed;
}`,
    },
    explanation:
      "Reverse the number digit by digit and compare it with the original. Negative numbers are never palindromes.",
  },
  {
    id: 6,
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged list.",
    difficulty: "Medium",
    category: "Linked List",
    solutions: {
      python: `def merge_two_lists(list1, list2):
    dummy = ListNode(0)
    current = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    current.next = list1 if list1 else list2
    return dummy.next`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    current.next = (list1 != null) ? list1 : list2;
    return dummy.next;
}`,
      cpp: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy(0);
    ListNode* current = &dummy;
    while (list1 && list2) {
        if (list1->val <= list2->val) {
            current->next = list1;
            list1 = list1->next;
        } else {
            current->next = list2;
            list2 = list2->next;
        }
        current = current->next;
    }
    current->next = list1 ? list1 : list2;
    return dummy.next;
}`,
    },
    explanation:
      "Use a dummy node and iterate through both lists, always picking the smaller value. Append the remaining list at the end. Time: O(n+m).",
  },
  {
    id: 7,
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    solutions: {
      python: `def max_sub_array(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    return max_sum`,
      java: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`,
      cpp: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}`,
    },
    explanation:
      "Kadane's Algorithm: maintain a running sum and reset it when it drops below the current element. Track the maximum sum seen so far. Time: O(n).",
  },
  {
    id: 8,
    title: "Binary Search",
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
    difficulty: "Easy",
    category: "Binary Search",
    solutions: {
      python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      java: `public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
      cpp: `int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    },
    explanation:
      "Divide the search space in half each time. Compare the middle element with the target and adjust the bounds accordingly. Time: O(log n).",
  },
  {
    id: 9,
    title: "Longest Common Prefix",
    description:
      "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    difficulty: "Medium",
    category: "Strings",
    solutions: {
      python: `def longest_common_prefix(strs):
    if not strs:
        return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix`,
      java: `public String longestCommonPrefix(String[] strs) {
    if (strs.length == 0) return "";
    String prefix = strs[0];
    for (int i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) != 0) {
            prefix = prefix.substring(0, prefix.length() - 1);
            if (prefix.isEmpty()) return "";
        }
    }
    return prefix;
}`,
      cpp: `string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.size() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}`,
    },
    explanation:
      "Start with the first string as the prefix. Iteratively shorten the prefix until it matches the beginning of each string.",
  },
  {
    id: 10,
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Hard",
    category: "Dynamic Programming",
    solutions: {
      python: `def climb_stairs(n):
    if n <= 2:
        return n
    prev1, prev2 = 2, 1
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    return prev1`,
      java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev1 = 2, prev2 = 1;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int prev1 = 2, prev2 = 1;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
    },
    explanation:
      "This is a classic dynamic programming problem (Fibonacci sequence). The number of ways to reach step n is the sum of ways to reach step n-1 and n-2. Space-optimized to O(1).",
  },
  {
    id: 11,
    title: "Contains Duplicate",
    description:
      "Return true if any value appears at least twice in the array.",
    difficulty: "Easy",
    category: "Arrays",
    solutions: {
      python: `def contains_duplicate(nums):
    return len(nums) != len(set(nums))`,
      java: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for(int n : nums){
        if(!set.add(n)) return true;
    }
    return false;
}`,
      cpp: `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    return s.size() != nums.size();
}`,
    },
    explanation: "Use a set to detect duplicates."
  },

  {
    id: 12,
    title: "Longest Substring Without Repeating Characters",
    description:
      "Find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: "Strings",
    solutions: {
      python: `def length_of_longest_substring(s):
    char_set = set()
    l = 0
    res = 0
    for r in range(len(s)):
        while s[r] in char_set:
            char_set.remove(s[l])
            l += 1
        char_set.add(s[r])
        res = max(res, r - l + 1)
    return res`,
      java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int l = 0, res = 0;
    for(int r = 0; r < s.length(); r++){
        while(set.contains(s.charAt(r))){
            set.remove(s.charAt(l++));
        }
        set.add(s.charAt(r));
        res = Math.max(res, r - l + 1);
    }
    return res;
}`,
      cpp: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> set;
    int l = 0, res = 0;
    for(int r = 0; r < s.size(); r++){
        while(set.count(s[r])){
            set.erase(s[l++]);
        }
        set.insert(s[r]);
        res = max(res, r - l + 1);
    }
    return res;
}`,
    },
    explanation: "Use sliding window with set."
  },

  {
    id: 13,
    title: "3Sum",
    description:
      "Find all unique triplets in the array which gives the sum of zero.",
    difficulty: "Medium",
    category: "Arrays",
    solutions: {
      python: `def three_sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums)):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        l, r = i+1, len(nums)-1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total == 0:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
            elif total < 0:
                l += 1
            else:
                r -= 1
    return res`,
      java: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for(int i=0;i<nums.length;i++){
        if(i>0 && nums[i]==nums[i-1]) continue;
        int l=i+1,r=nums.length-1;
        while(l<r){
            int sum=nums[i]+nums[l]+nums[r];
            if(sum==0){
                res.add(Arrays.asList(nums[i],nums[l],nums[r]));
                l++;
            }else if(sum<0) l++;
            else r--;
        }
    }
    return res;
}`,
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    for(int i=0;i<nums.size();i++){
        if(i>0 && nums[i]==nums[i-1]) continue;
        int l=i+1,r=nums.size()-1;
        while(l<r){
            int sum=nums[i]+nums[l]+nums[r];
            if(sum==0){
                res.push_back({nums[i],nums[l],nums[r]});
                l++;
            }else if(sum<0) l++;
            else r--;
        }
    }
    return res;
}`,
    },
    explanation: "Sort + two pointer."
  },

  {
    id: 14,
    title: "Container With Most Water",
    description:
      "Find maximum water container.",
    difficulty: "Medium",
    category: "Arrays",
    solutions: {
      python: `def max_area(height):
    l,r=0,len(height)-1
    res=0
    while l<r:
        res=max(res,min(height[l],height[r])*(r-l))
        if height[l]<height[r]: l+=1
        else: r-=1
    return res`,
      java: `public int maxArea(int[] h){
    int l=0,r=h.length-1,res=0;
    while(l<r){
        res=Math.max(res,Math.min(h[l],h[r])*(r-l));
        if(h[l]<h[r]) l++;
        else r--;
    }
    return res;
}`,
      cpp: `int maxArea(vector<int>& h){
    int l=0,r=h.size()-1,res=0;
    while(l<r){
        res=max(res,min(h[l],h[r])*(r-l));
        if(h[l]<h[r]) l++;
        else r--;
    }
    return res;
}`,
    },
    explanation: "Two pointer approach."
  },

  {
    id: 15,
    title: "Product of Array Except Self",
    description:
      "Return product array without using division.",
    difficulty: "Medium",
    category: "Arrays",
    solutions: {
      python: `def product_except_self(nums):
    res=[1]*len(nums)
    prefix=1
    for i in range(len(nums)):
        res[i]=prefix
        prefix*=nums[i]
    postfix=1
    for i in range(len(nums)-1,-1,-1):
        res[i]*=postfix
        postfix*=nums[i]
    return res`,
      java: `// prefix + postfix`,
      cpp: `// prefix + postfix`,
    },
    explanation: "Prefix & postfix multiplication."
  },

  {
    id: 16,
    title: "Longest Consecutive Sequence",
    description:
      "Find longest consecutive elements.",
    difficulty: "Medium",
    category: "Arrays",
    solutions: {
      python: `def longest_consecutive(nums):
    s=set(nums)
    longest=0
    for n in s:
        if n-1 not in s:
            length=1
            while n+length in s:
                length+=1
            longest=max(longest,length)
    return longest`,
      java: `// use set`,
      cpp: `// use set`,
    },
    explanation: "Use set O(n)."
  },

  {
    id: 17,
    title: "Maximum Depth Binary Tree",
    description: "Return max depth.",
    difficulty: "Easy",
    category: "Trees",
    solutions: {
      python: `def max_depth(root):
    if not root: return 0
    return 1+max(max_depth(root.left),max_depth(root.right))`,
      java: `// recursion`,
      cpp: `// recursion`,
    },
    explanation: "DFS recursion."
  },

  {
    id: 18,
    title: "Invert Binary Tree",
    description: "Invert tree.",
    difficulty: "Easy",
    category: "Trees",
    solutions: {
      python: `def invert_tree(root):
    if root:
        root.left,root.right=invert_tree(root.right),invert_tree(root.left)
    return root`,
      java: `// recursion`,
      cpp: `// recursion`,
    },
    explanation: "Swap children."
  },

  {
    id: 19,
    title: "House Robber",
    description: "Max sum without adjacent.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    solutions: {
      python: `def rob(nums):
    prev,curr=0,0
    for n in nums:
        prev,curr=curr,max(curr,prev+n)
    return curr`,
      java: `// dp`,
      cpp: `// dp`,
    },
    explanation: "DP approach."
  },

  {
    id: 20,
    title: "Coin Change",
    description: "Minimum coins.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    solutions: {
      python: `def coin_change(coins,amount):
    dp=[amount+1]*(amount+1)
    dp[0]=0
    for i in range(1,amount+1):
        for c in coins:
            if i-c>=0:
                dp[i]=min(dp[i],dp[i-c]+1)
    return dp[amount] if dp[amount]!=amount+1 else -1`,
      java: `// dp`,
      cpp: `// dp`,
    },
    explanation: "Bottom-up DP."
  },

  {
    id: 21,
    title: "Number of Islands",
    description: "Count islands.",
    difficulty: "Medium",
    category: "Graph",
    solutions: {
      python: `def num_islands(grid):
    def dfs(i,j):
        if i<0 or j<0 or i>=len(grid) or j>=len(grid[0]) or grid[i][j]=='0': return
        grid[i][j]='0'
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)
    count=0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j]=='1':
                dfs(i,j)
                count+=1
    return count`,
      java: `// dfs`,
      cpp: `// dfs`,
    },
    explanation: "DFS traversal."
  },

  {
    id: 22,
    title: "Course Schedule",
    description: "Detect cycle.",
    difficulty: "Medium",
    category: "Graph",
    solutions: {
      python: `def can_finish(numCourses, prerequisites):
    graph={i:[] for i in range(numCourses)}
    for a,b in prerequisites:
        graph[a].append(b)
    visit=set()
    def dfs(n):
        if n in visit: return False
        if graph[n]==[]: return True
        visit.add(n)
        for nei in graph[n]:
            if not dfs(nei): return False
        visit.remove(n)
        graph[n]=[]
        return True
    for i in range(numCourses):
        if not dfs(i): return False
    return True`,
      java: `// cycle detect`,
      cpp: `// cycle detect`,
    },
    explanation: "DFS cycle detection."
  },

  {
    id: 23,
    title: "Longest Palindromic Substring",
    description: "Find longest palindrome.",
    difficulty: "Medium",
    category: "Strings",
    solutions: {
      python: `def longest_palindrome(s):
    res=""
    for i in range(len(s)):
        for l,r in [(i,i),(i,i+1)]:
            while l>=0 and r<len(s) and s[l]==s[r]:
                if r-l+1>len(res):
                    res=s[l:r+1]
                l-=1; r+=1
    return res`,
      java: `// expand center`,
      cpp: `// expand center`,
    },
    explanation: "Expand around center."
  },

  {
    id: 24,
    title: "Minimum Window Substring",
    description: "Find minimum window.",
    difficulty: "Hard",
    category: "Strings",
    solutions: {
      python: `def min_window(s,t):
    from collections import Counter
    need=Counter(t)
    missing=len(t)
    l=start=end=0
    for r,c in enumerate(s,1):
        if need[c]>0: missing-=1
        need[c]-=1
        if missing==0:
            while l<r and need[s[l]]<0:
                need[s[l]]+=1
                l+=1
            if end==0 or r-l<end-start:
                start,end=l,r
            need[s[l]]+=1
            missing+=1
            l+=1
    return s[start:end]`,
      java: `// sliding window`,
      cpp: `// sliding window`,
    },
    explanation: "Advanced sliding window."
  }

];

export default problems;
