from typing import TypeVar, List

# for more information on type hinting, check out https://docs.python.org/3/library/typing.html
T = TypeVar("T")  # represents generic type
Node = TypeVar("Node")  # represents a Node object (forward-declare to use in Node __init__)
DLL = TypeVar("DLL")


# pro tip: PyCharm auto-renders docstrings (the multiline strings under each function definition)
# in its "Documentation" view when written in the format we use here. Open the "Documentation"
# view to quickly see what a function does by placing your cursor on it and using CTRL + Q.
# https://www.jetbrains.com/help/pycharm/documentation-tool-window.html


# noinspection PyRedeclaration
class Node:
    """
    Implementation of a doubly linked list node.
    Do not modify.
    """
    __slots__ = ["value", "next", "prev", "child"]

    def __init__(self, value: T, next: Node = None, prev: Node = None, child: Node = None) -> None:
        """
        Construct a doubly linked list node.

        :param value: value held by the Node.
        :param next: reference to the next Node in the linked list.
        :param prev: reference to the previous Node in the linked list.
        :return: None.
        """
        self.next = next
        self.prev = prev
        self.value = value

        # The child attribute is only used for the application problem
        self.child = child

    def __repr__(self) -> str:
        """
        Represents the Node as a string.

        :return: string representation of the Node.
        """
        return f"Node({str(self.value)})"

    __str__ = __repr__


# noinspection PyRedeclaration
class DLL:
    """
    Implementation of a doubly linked list without padding nodes.
    Modify only below indicated line.
    """
    __slots__ = ["head", "tail", "size"]

    def __init__(self) -> None:
        """
        Construct an empty doubly linked list.

        :return: None.
        """
        self.head = self.tail = None
        self.size = 0

    def __repr__(self) -> str:
        """
        Represent the DLL as a string.

        :return: string representation of the DLL.
        """
        result = []
        node = self.head
        while node is not None:
            result.append(str(node))
            node = node.next
            if node is self.head:
                break
        return " <-> ".join(result)

    def __str__(self) -> str:
        """
        Represent the DLL as a string.

        :return: string representation of the DLL.
        """
        return repr(self)

    def __eq__(self, other: DLL) -> bool:
        """
        :param other: compares equality with this List
        :return: True if equal otherwise False
        """
        cur_node = self.head
        other_node = other.head
        while True:
            if cur_node != other_node:
                return False
            if cur_node is None and other_node is None:
                return True
            if cur_node is None or other_node is None:
                return False
            cur_node = cur_node.next
            other_node = other_node.next
            if cur_node is self.head and other_node is other.head:
                return True
            if cur_node is self.head or other_node is other.head:
                return False


    # MODIFY BELOW #
    # Refer to the classes provided to understand the problems better#

    def empty(self) -> bool:
        """
        Returns: True if DLL is empty, else False.
        """
        return self.size == 0


    def push(self, val: T, back: bool = True) -> None:
        """
        Adds a Node containing val to the back (or front) of the DLL
        and updates size accordingly.

        Returns: None.
        """
        new_node = Node(val)

        if self.empty():
            self.head, self.tail = new_node, new_node
        elif back is True:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        elif back is False:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.size += 1


    def pop(self, back: bool = True) -> None:
        """
        Removes a Node from the back (or front) of the DLL and updates
        size accordingly. In the case that the DLL is empty, pop does nothing.

        Returns: None.
        """
        if self.head is None and self.tail is None:
            self.head, self.tail = self.head, self.tail
        elif self.head is self.tail:
            self.head, self.tail = None, None
            self.size -= 1
        elif back is True:
            self.tail.prev.next = None
            self.tail = self.tail.prev
            self.size -= 1
        elif back is False:
            self.head.next.prev = None
            self.head = self.head.next
            self.size -= 1


    def list_to_dll(self, source: List[T]) -> None:
        """
        Creates a DLL from a standard Python list. If there are
        already nodes in the DLL, the DLL should be cleared and
        replaced by source.

        Returns: None.
        """
        self.head, self.tail = None, None
        self.size = 0

        for i in source:
            self.push(i)


    def dll_to_list(self) -> List[T]:
        """
        Creates a standard Python list from a DLL.

        Returns: list[T] containing the values of the nodes in the DLL.
        """
        dll_list = []
        node = self.head

        while node:
            dll_list.append(node.value)
            node = node.next

        return dll_list


    def _find_nodes(self, val: T, find_first: bool = False) -> List[Node]:
        """
        Construct list of Node with value val in the DLL and returns the
        associated Node object list.

        Returns: list of Node objects in the DLL whose value is val.
        If val does not exist in the DLL, returns empty list.
        """
        result = []
        node = self.head

        while node:
            if node.value is val:
                result.append(node)

                if find_first:
                    return result

            node = node.next

        return result


    # noinspection PyTypeChecker
    def find(self, val: T) -> Node:
        """
        Finds first Node with value val in the DLL and returns the
        associated Node object.

        Returns: first Node object in the DLL whose value is val.
        If val does not exist in the DLL, return None.
        """
        nodes = self._find_nodes(val, True)

        if len(nodes) == 0:
            return None
        else:
            return nodes[0]


    def find_all(self, val: T) -> List[Node]:
        """
        Finds all Node objects with value val in the DLL and returns a
        standard Python list of the associated Node objects.

        Returns: standard Python list of all Node objects in the DLL
        whose value is val. If val does not exist in the DLL,
        returns an empty list.
        """
        return self._find_nodes(val)


    def _remove_node(self, to_remove: Node) -> None:
        """
        Given a reference to a node in the linked list, remove it

        Returns: None.
        """
        if to_remove.prev:
            to_remove.prev.next = to_remove.next
        if to_remove.next:
            to_remove.next.prev = to_remove.prev

        if self.head is to_remove:
            self.head = to_remove.next
        if self.tail is to_remove:
            self.tail = to_remove.prev

        self.size -= 1


    def remove(self, val: T) -> bool:
        """
        removes first Node with value val in the DLL.

        Returns: True if a Node with value val was found
        and removed from the DLL, else False.
        """
        node = self.head

        while node:
            if node.value is val:
                self._remove_node(node)
                return True

            node = node.next

        return False


    def remove_all(self, val: T) -> int:
        """
        removes all Node objects with value val in the DLL.

        Returns: number of Node objects with value val removed
        from the DLL. If no node containing val exists in
        the DLL, returns 0.
        """
        count, node = 0, self.head

        while node:
            next = node.next

            if node.value is val:
                count += 1
                self._remove_node(node)

            node = next

        return count


    def reverse(self) -> None:
        """
        Reverses the DLL in-place by modifying all next
        and prev references of Node objects in DLL.
        Updates self.head and self.tail accordingly.

        Returns: None.
        """
        if self.head is None:
            self.head = self.head

        else:
            node, head = self.head, self.head
            self.head = self.tail
            self.tail = head

            while node is not None:
                temp = node.next
                node.next = node.prev
                node.prev = temp
                node = temp


# noinspection SpellCheckingInspection
def dream_escaper(dll: DLL) -> DLL:
    """
    INSERT DOCSTRING HERE!
    """
    pass
