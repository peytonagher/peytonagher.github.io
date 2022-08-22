class Matrix(object):

    '''This function initializes a matrix with default row/column values
    of 2'''

    def __init__(self,num_rows = 2,num_cols = 2):
        self.num_rows = num_rows
        self.num_cols = num_cols
        self.array = []
        if (num_rows < 0) or (num_cols < 0):
            raise ValueError("Matrix: Error, the dimensions must be positive integers!")
        for i in range(num_rows): # for loop to build the array with 0's
            row = []
            for i in range(num_cols):
                row.append(0)
            self.array.append(row)


    '''This function returns a string of the matrix'''

    def __str__(self):
        matrix_string = ""
        base_str = str(self.array)
        base_str = base_str.replace(",","")
        for x in range(len(base_str)):
            if x != 0:
                if base_str[x - 1] == "]": # finds the closed bracket
                    if (base_str[x] == " "):
                        matrix_string += "\n " # adds newline to closed bracket
                    else:
                        matrix_string += base_str[x]
                else:
                    matrix_string += base_str[x]
            else:
                matrix_string += base_str[x]
        return matrix_string


    '''Returns the same output as __str__'''

    def __repr__(self):
        return self.__str__()


    '''This function gets the values from the matrix with iijj serving as
    indexes'''

    def __getitem__(self, iijj):
        if (type(iijj) is not tuple) and (type(iijj) is not int):
            raise ValueError("Matrix: Error, the indices must be a positive integer or a tuple of integers!")
        if type(iijj) is tuple: # accounts for tuple indexes
            if (type(iijj[0]) is not int) or  (type(iijj[1]) is not int):
                raise ValueError("Matrix: Error, the indices must be a positive integer or a tuple of integers!")
            if (not iijj[0] > 0) or (not iijj[1] > 0):
                raise IndexError("Matrix: Error, bad indexing!")
            if (iijj[0] > self.num_rows) or (iijj[1] > self.num_cols):
                raise IndexError("Matrix: Error, index out of range!")
            return self.array[iijj[0] - 1][iijj[1] - 1]
        if type(iijj) is int: # accounts for integer indexes
            if iijj < 0:
                raise IndexError("Matrix: Error, bad indexing!")
            if iijj > self.num_rows:
                raise IndexError("Matrix: Error, index out of range!")
            return self.array[iijj - 1]


    '''This function allows the ability to set values from the matrix'''

    def __setitem__(self, iijj, value):
        if (type(value) is not int) and (type(value) is not float):
            raise ValueError("Matrix: Error, You can only assign a float or int to a matrix!")
        if type(iijj) is tuple:
            if (type(iijj[0]) is not int) or (type(iijj[1]) is not int):
                raise ValueError("Matrix: Error, the indices must be a tuple of integers!")
        elif type(iijj) is not tuple:
            raise ValueError("Matrix: Error, the indices must be a tuple of integers!")
        if (not iijj[0] > 0) or (not iijj[1] > 0):
            raise IndexError("Matrix: Error, bad indexing!")
        if (not iijj[0] <= self.num_rows) or (not iijj[1] <= self.num_cols):
            raise IndexError("Matrix: Error, index out of range!")
        self.array[iijj[0] - 1][iijj[1] - 1] = value


    '''This function performs matrix addition and returns a new matrix'''

    def __add__(self,B):
        if type(B) is not Matrix:
            raise ValueError("Matrix: Error, you can only add a matrix to another matrix!")
        A_rows, A_cols = self.num_rows, self.num_cols
        B_rows, B_cols = B.num_rows, B.num_cols
        if (A_rows != B_rows) or (A_cols != B_cols):
            raise ValueError("Matrix: Error, matrices dimensions must agree in addition!")
        result_matrix = Matrix(A_rows,A_cols) # builds the result matrix
        for r in range(self.num_rows):
            for c in range(self.num_cols):
                result_matrix.array[r][c] = self.array[r][c] + B.array[r][c]
        return result_matrix


    '''This function processes and returns the dot product of two lists of

    def dot_product(self,L1,L2):
        numbers'''
        if len(L2) != len(L1):
            raise ValueError("Dot Product: must be same length")
        result = 0
        for x in range(len(L1)):    # multiplies via dot product if the lists
            result += L1[x] * L2[x] # are of the same length
        return result 


    '''This function performs matrix multiplication which utilizes the dot 
    product function and returns a new matrix'''

    def __mul__(self,B):
        if (type(B) is not Matrix) or (type(self) is not Matrix):
            raise ValueError("Matrix: Error, you can only multiply a matrix to another matrix!")
        elif self.num_cols != B.num_rows:
            raise ValueError("Matrix: Error, matrices dimensions must agree in multiplication!")
        else: # matrix multiplication as long as dimensions/types are the same
            matrix = Matrix(self.num_rows, B.num_cols)
            for x in range(self.num_rows):
                if (B.num_cols >= self.num_cols):
                    for c in range(B.num_cols):
                        row = self.__getitem__(x + 1)
                        column = []
                        for i in range(B.num_rows):
                            item = (i + 1, c + 1)
                            column.append(B.__getitem__(item))
                        result = matrix.dot_product(row, column)
                        index = (x + 1, c + 1)
                        matrix.__setitem__(index, result)
                else:
                    for c in range(self.num_cols):
                        row = self.__getitem__(x + 1)
                        column = []
                        for i in range(B.num_rows):
                            item = (i + 1, c + 1)
                            column.append(B.__getitem__(item))
                        result = matrix.dot_product(row, column)
                        index = (x + 1, c + 1)
                        matrix.__setitem__(index, result)
            return matrix


    '''This function returns a transposed matrix as a new matrix'''

    def transpose(self):
        A_rows = self.num_rows
        A_cols = self.num_cols
        result_matrix = Matrix(A_cols, A_rows)
        for row in range(result_matrix.num_rows): 
            row += 1 # counter to transpose row by row
            for column in range(result_matrix.num_cols):
                column += 1 # counter to transpose column by columnn
                result_matrix[row,column] = self[column,row]
        return result_matrix


    '''This function evaluates if the matrix dimensions are equal or not
    and returns a boolean value'''

    def __eq__(self,B):
        if type(B) is not Matrix: # checks for type of B
            return False
        if (self.num_rows != B.num_rows) or (self.num_cols != B.num_cols):
            return False
        for row in range(self.num_rows):
            row += 1
            for column in range(self.num_cols):
                column += 1
                if self[row,column] != B[row,column]:
                    return False
                elif self[row,column] == B[row,column]:
                    return True # returns True if rows/columns are equal


    '''This function performs scalar multiplication (multiplication of
    a scalar and a matrix)'''

    def __rmul__(self,i):
        if type(i) is not int:
            raise ValueError("Matrix Error: scaler must be an int.")
        result_matrix = Matrix(self.num_rows,self.num_cols)
        for row in range(result_matrix.num_rows): # for loop sets up scalar
            row += 1                              # multiplication row by column
            for column in range(result_matrix.num_cols):
                column += 1
                result_matrix[row,column] = i * self[row,column]
        return result_matrix