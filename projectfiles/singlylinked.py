from typing import TypeVar          # For use in type hinting

# Type Declarations
T = TypeVar('T')        # generic type
SLL = TypeVar('SLL')    # forward declared
Node = TypeVar('Node')  # forward declare `Node` type


class SLLNode:
    """
    Node implementation
    Do not modify.
    """
    __slots__ = ['val', 'next']

    def __init__(self, value: T, next: Node = None) -> None:
        """
        Initialize an SLL Node
        :param value: value held by node
        :param next: reference to the next node in the SLL
        :return: None
        """
        self.val = value
        self.next = next

    def __str__(self) -> str:
        """
        Overloads `str()` method to casts nodes to strings
        return: string
        """
        return '(Node: ' + str(self.val) + ' )'

    def __repr__(self) -> str:
        """
        Overloads `repr()` method for use in debugging
        return: string
        """
        return '(Node: ' + str(self.val) + ' )'

    def __eq__(self, other: Node) -> bool:
        """
        Overloads `==` operator to compare nodes
        :param other: right operand of `==`
        :return: bool
        """
        return self is other if other is not None else False


class SinglyLinkedList:
    """
    Implementation of an SLL
    """
    __slots__ = ['head', 'tail']

    def __init__(self) -> None:
        """
        Initializes an SLL
        :return: None
        DO NOT MODIFY THIS FUNCTION
        """
        self.head = None
        self.tail = None

    def __repr__(self) -> str:
        """
        Represents an SLL as a string
        DO NOT MODIFY THIS FUNCTION
        """
        return self.to_string()

    def __eq__(self, other: SLL) -> bool:
        """
        Overloads `==` operator to compare SLLs
        :param other: right hand operand of `==`
        :return: `True` if equal, else `False`
        DO NOT MODIFY THIS FUNCTION
        """
        comp = lambda n1, n2: n1 == n2 and (comp(n1.next, n2.next) if (n1 and n2) else True)
        return comp(self.head, other.head)



# ============ Modify below ============ #

    def push(self, value: T) -> None:
        """
        Pushes an SLLNode to the end of the list
        :param value: value to push to the list
        :return: None
        """
        new_node = SLLNode(value)

        if self.head is None:
            self.head, self.tail = new_node, new_node
        else:
            self.tail.next, self.tail = new_node, new_node


    def to_string(self) -> str:
        """
        Converts an SLL to a string
        :return: string representation of the linked list
        """
        string_SLL, curr_node = "", self.head

        if self.head is None:
            return "None"

        while curr_node is not None:
            string_SLL += str(curr_node.val) + " --> "
            curr_node = curr_node.next

        return string_SLL[0:-5]


    def length(self) -> int:
        """
        Determines number of nodes in the list
        :return: number of nodes in list
        """
        num_nodes, node = 0, self.head

        while node:
            num_nodes += 1
            node = node.next

        return num_nodes


    def sum_list(self) -> T:
        """
        Sums the values in the list
        :return: sum of values in list
        """
        node = self.head

        if node is None:
            return None

        else:
            sum_all, node = node.val, node.next
            while node:
                sum_all += node.val
                node = node.next

        return sum_all


    def remove(self, value: T) -> bool:
        """
        Removes the first node containing `value` from the SLL
        :param value: value to remove
        :return: True if a node was removed, False otherwise
        """
        node, last_node = self.head, self.head

        while node:
            if node.val == value:
                if self.head == self.tail:
                    self.head, self.tail = None, None
                    return True
                if node is self.tail:
                    last_node.next = None
                    self.tail = last_node
                    return True
                if node is self.head:
                    self.head = node.next
                    return True

                else:
                    last_node.next = node.next
                    return True

            last_node = node
            node = node.next

        else:
            return False


    def remove_all(self, value: T) -> bool:
        """
        Removes all instances of a node containing `value` from the SLL
        :param value: value to remove
        :return: True if a node was removed, False otherwise
        """
        node, last_node = self.head, self.head
        remove = False

        while node:
            if node.val == value:
                if node is self.head:
                    self.head = node.next
                    remove = True
                if node is self.tail:
                    last_node.next = None
                    self.tail = last_node
                    remove = True
                else:
                    last_node.next = node.next
                    remove = True

            last_node = node
            node = node.next

            if self.length() == 0:
                self.head, self.tail = None, None

        return remove


    def search(self, value: T) -> bool:
        """
        Searches the SLL for a node containing `value`
        :param value: value to search for
        :return: `True` if found, else `False`
        """
        node = self.head

        while node:
            if node.val == value:
                return True
            node = node.next

        else:
            return False


    def count(self, value: T) -> int:
        """
        Returns the number of occurrences of `value` in this list
        :param value: value to count
        :return: number of time the value occurred
        """
        num_value, node = 0, self.head

        while node:
            if node.val == value:
                num_value += 1
            node = node.next

        return num_value


def show_encrypted(data: SLL) -> None:
    """
    Reverses the SLL
    :param data: an SLL
    :return: None
    """
    last_node, ptr_carry = None, None
    curr_node = data.head

    if data.head is None or data.head.next is None:
        return None

    while curr_node is not None:
        ptr_carry = curr_node.next
        curr_node.next = last_node
        last_node = curr_node
        curr_node = ptr_carry

    data.tail, data.head = data.head, data.tail
