class Node(object):
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST(object):
    def __init__(self, root):
        self.root = Node(root)

    def insert(self, new_val):
        self.insert_helper(self.root, new_val)

    def search(self, find_val):
        return self.search_helper(self.root, find_val)

    def insert_helper(self, start_node, new_val):
        if new_val < start_node.value:
            if start_node.left is None:
                start_node.left = Node(new_val)
            else:
                self.insert_helper(start_node.left, new_val)
        else:
            if start_node.right is None:
                start_node.right = Node(new_val)
            else:
                self.insert_helper(start_node.right, new_val)

    def search_helper(self, curr_node, find_val):
        if curr_node is not None:
            if find_val == curr_node.value:
                return True
            elif find_val < curr_node.value:
                return self.search_helper(curr_node.left, find_val)
            else:
                return self.search_helper(curr_node.right, find_val) 
        else:
            return False

# Set up tree
tree = BST(4)

# Insert elements
tree.insert(2)
tree.insert(1)
tree.insert(3)
tree.insert(5)

# Check search
# Should be True
print(tree.search(4))
# Should be False
print(tree.search(6))