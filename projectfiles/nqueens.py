from z3 import *
import numpy as np


# n x n 
def nxn(n):
    mySolver = Solver()
    board = []
    q_count = []
    diagonal = []
    count = 0
    display_sol = True
    num_solutions = 0


# this loop builds the chessboard with potential spots for queens 
    for i in range(n):
        board.append(Int('p(%i,j)' % (i + 1)))


# this loop indexes queens into each column on the board based on a
# lower bound and an upper bound
    for i in range(n):
            q_lower = 1 <= board[i]
            q_upper = board[i] <= n
            q_count.append(And(q_lower, q_upper))


# this nested loop checks the diagonal case of the chessboard, and takes
# account for placing a queen in a corner spot
    for i in range(n):
        for j in range(i):
            if (i == j):
                diagonal.append(True)
            else:
               angle1 = board[i] - board[j] != (i - j)
               angle2 = board[i] - board[j] != (j - i)     
               diagonal.append(And((angle1, angle2)))

    mySolver.add(q_count + [Distinct(board)] + diagonal)
    print(mySolver.check())
    print('\n')

    while mySolver.check() == sat:
        model = mySolver.model()
        solution = []

        for i in range(n):
            current_spot = model.evaluate(board[i])
            solution.append(current_spot)


# if the solution is satisfiable then its model (list of rows (i) and corresponding
# spots in the column  where the queen should be placed (j)) will be printed along 
# with a list of column (j) values for each row (i)
        if display_sol == True:
            print(model)
            print('\n')
            print(solution)
            print('\n')
            b_size = int(n)
            matrix_board = np.zeros(shape = (b_size, b_size))
            count = 0


# this loop builds a numpy matrix of the first solution to be printed after
            for val in solution:
                val = str(val)
                val = int(val) - 1
                matrix_board[count, val] = 1
                count += 1               

            print("1s represent queen placements in the below matrix:\n")
            print(matrix_board)
            display_sol = False
            num_solutions += 1

# this loop iterates over a list and adds a Or statement for the next solution
# same for lines 85-87
            for i in range(n): 
                nextsol = [solution[i] != board[i] for i in range(n)]
                mySolver.add(Or(nextsol))
        else:
            num_solutions += 1

            for i in range(n):
                nextsol = [solution[i] != board[i] for i in range(n)]
                mySolver.add(Or(nextsol))
    
    return num_solutions



def main():
    print("\nCSE260 programming project")
    n = input("\nn = ?: ")
    input_n = "\nn = {n}: "
    print(input_n.format(n = n))

    num_solutions = nxn(int(n))
    print("\n# of solutions: " + str(num_solutions) + "\n")


if __name__ == "__main__":
    main()