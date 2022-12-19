#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
#include <cctype>
#include <sstream>
#include <fstream>
#include <cmath>
#include <iterator>
#include <algorithm>
#include <numeric>
#include <stdexcept>
#include <map>
#include <set>
#include <utility>
#include <tuple>
using std::string; using std::vector; using std::tuple;


class SudokuGame {
    private:
        vector<vector<int>> grid_;

    public:
        SudokuGame() = default;
        SudokuGame(string filename);

        const vector<vector<int>> & grid() const;
        void print() const;
        int size() const;
        int value(int row, int column) const;
        void value(int row, int column, int newValue);

        ~SudokuGame();
        SudokuGame(const SudokuGame & obj);
        SudokuGame & operator=(const SudokuGame & obj);
};


class SudokuPlayer {
    private:
        tuple<int, int> isValidSpot(const SudokuGame &) const;

    public:
        SudokuPlayer() = default;
        bool solve(SudokuGame & game);
};