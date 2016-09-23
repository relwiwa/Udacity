"""You're going to write a binary search function.
You should use an iterative approach - meaning
using loops.
Your function should take two inputs:
a Python list to search through, and the value
you're searching for.
Assume the list only has distinct elements,
meaning there are no repeated values, and 
elements are in a strictly increasing order.
Return the index of value, or -1 if the value
doesn't exist in the list."""

import math

def binary_search(input_array, value):
  min = 0
  max = len(input_array) - 1
  while (min <= max):
    middle = math.floor((min + max) / 2)
    if input_array[middle] == value:
      return middle
    elif input_array[middle] < value:
      min = middle + 1
    else:
      max = middle - 1
    
  return -1

test_list = [1,3,9,11,15,19,29]
test_val1 = 25
test_val2 = 15
print(binary_search(test_list, test_val1))
print(binary_search(test_list, test_val2))

# 1 3 9 11 15 19 29
# min = 0, max = 6, middle = 3
# 11 != 25
# 11 < 25 => min = 3 + 1 = 4
# (1 3 9 11) 15 19 29
# min = 4, max = 6, middle = 6 + 4 = 10 / 2 = 5
# 19 != 25
# 19 < 25 => min = 5 + 1 = 6
# (1 3 9 11 15 19) 29
# min = 6, max = 6, middle = 6 + 6 = 12 / 2 = 6
# 29 != 25
# 29 > 25 => max = 6 - 1 = 5
# min > max => end while loop, element not in array