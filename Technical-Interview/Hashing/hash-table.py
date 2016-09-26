"""Write a HashTable class that stores strings
in a hash table, where keys are calculated
using the first two letters of the string."""

class HashTable(object):
    def __init__(self):
        self.table = [None]*10000

    """remember to store lists at each bucket, and not just the string itself"""
    def store(self, string):
        """Input a string that's stored in 
        the table."""
        lookup = self.lookup(string)
        if lookup == -1:
            hash = self.calculate_hash_value(string)
            self.table[hash] = [string]
        elif lookup is None:
            hash = self.calculate_hash_value(string)
            self.table[hash].append(string)

    def lookup(self, string):
        """Return the hash value if the
        string is already in the table.
        Return -1 otherwise."""
        hash = self.calculate_hash_value(string)
        if self.table[hash] is None:
            return -1
        elif string in self.table[hash]:
            return hash
        else:
            return None

    """You can assume that the string will have at least two letters,
    and the first two characters are uppercase letters (ASCII values
    from 65 to 90).""" 
    def calculate_hash_value(self, string):
        """Helper function to calulate a
        hash value from a string."""
        return ord(string[0]) * 100 + ord(string[1])
    
# Setup
hash_table = HashTable()

# Test calculate_hash_value
# Should be 8568
print(hash_table.calculate_hash_value('UDACITY'))

# Test lookup edge case
# Should be -1
print(hash_table.lookup('UDACITY'))

# Test store
hash_table.store('UDACITY')
# Should be 8568
print(hash_table.lookup('UDACITY'))

# Test store edge case
hash_table.store('UDACIOUS')
# Should be 8568
print(hash_table.lookup('UDACIOUS'))
