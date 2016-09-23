"""Implement quick sort in Python.
Input a list.
Output a sorted list."""
def quicksort(array):
  n = len(array)
  if n <= 1:
    return array
  else:
    return quicksort_in_place(array, 0, n - 1)

def quicksort_in_place(ar, start, end):
  pivot = ar[end]
  # separator element keeps track of first element that's bigger than pivot element
  # everythings organized via it, swapping smaller and pivot element, plus recursion of sub-arrays
  separator = None

  for i in range(0, end):
    if ar[i] > pivot:
      if separator is None:
        separator = i
    else:
      if separator is not None:
        swap = ar[separator]
        ar[separator] = ar[i]
        ar[i] = swap
        separator += 1

  if separator is None:
    separator = end
  ar[end] = ar[separator]
  ar[separator] = pivot

  if separator - 1 > start:
    ar = quicksort_in_place(ar, start, separator - 1)
  if end - separator > 1:
    ar = quicksort_in_place(ar, separator + 1, end) 

  return ar

test = [21, 4, 1, 3, 21, 14, 14, 9, 20, 25, 6, 21,  14]
print(quicksort(test))