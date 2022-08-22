// sudoku.hpp header file


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
    // TO DO: define your own private members/methods as needed
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

        // TO DO: include "rule of three": 
        //          destructor
        //          copy constructor
        //          copy assignment operator

        ~SudokuGame();
        SudokuGame(const SudokuGame & obj);
        SudokuGame & operator=(const SudokuGame & obj);
};


class SudokuPlayer {
    // TO DO: define your own private members/methods as needed
    private:
        tuple<int, int> isValidSpot(const SudokuGame &) const;

    public:
        SudokuPlayer() = default;
        bool solve(SudokuGame & game);
};




// cpp program file


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
#include "sudoku.hpp"
using std::cin; using std::cout; using std::istream; using std::ostream; 
using std::endl; using std::fixed; using std::string; using std::to_string; 
using std::replace; using std::vector; using std::setprecision; 
using std::toupper; using std::tolower; using std::stoi; using std::stringstream; 
using std::istringstream; using std::ostringstream; using std::fstream; 
using std::ifstream; using std::ofstream; using std::istream_iterator; 
using std::ostream_iterator; using std::istreambuf_iterator; using std::transform; 
using std::accumulate; using std::invalid_argument; using std::map; 
using std::multimap; using std::set; using std::pair; using std::tuple; 
using std::make_tuple; using std::tie;

// TO DO: add implementation of SudokuGame and SudokuPlayer methods here.

SudokuGame::SudokuGame(string filename) {
    
    // read file into string
    ifstream input(filename);
    string text(istreambuf_iterator<char>(input), {});

    // split into lines
    int num_lines = count(text.begin(), text.end(), '\n') + 1;
    vector<string> lines(num_lines);
    istringstream iss(text);

    generate(lines.begin(), lines.end(), [& iss]() {
        
        string str;
        getline(iss, str, '\n');
        return str;
    });

    // make grid_ of rows and columns
    vector<vector<int>> newgrid;

    transform(lines.begin(), lines.end(), back_inserter(newgrid), [] (const string & line) {

        int n = count(line.begin(), line.end(), ',') + 1;
        vector<int> cols(n);
        istringstream iss(line);

        generate(cols.begin(), cols.end(), [& iss] () {

            string str;
            getline(iss, str, ',');

            try {
                return stoi(str);
            } 
            catch (invalid_argument & error) {
                return 0;
            }
        });

        return cols;
    });

    input.close();
    grid_ = newgrid;
}



SudokuGame::SudokuGame(const SudokuGame & obj) { 
    grid_ = obj.grid_; 
}



SudokuGame & SudokuGame::operator=(const SudokuGame & obj) {
    grid_ = obj.grid_;
    return *this;
}



SudokuGame::~SudokuGame() { grid_.clear(); }



const vector<vector<int>>& SudokuGame::grid() const { 
    return grid_; 
}



void SudokuGame::print() const {

    for (int i = 0; i < size(); ++i) {

        if (i > 0 && i % 3 == 0) {
            cout << " " << string(size() * 3, '-') << endl;
        }

        for (int j = 0; j < size(); ++j) {

            if (j > 0 && j % 3 == 0) {
                cout << "|";
            }

            cout << " " << grid_[i][j] << " ";

        }

        cout << endl;

    }

    cout << endl;
}



int SudokuGame::size() const {
    return grid_.size();
}



int SudokuGame::value(int row, int column) const {
    return grid_[row][column];
}



void SudokuGame::value(int row, int column, int newValue) {
    grid_[row][column] = newValue;
}



tuple<int, int> SudokuPlayer::isValidSpot(const SudokuGame & game) const {

    for (int i = 0; i < game.size(); ++i) {
        
        for (int j = 0; j < game.size(); ++j) {

            if (game.value(i, j) == 0) {
                return make_tuple(i, j);
            }

        }

    }

    return make_tuple(-1, -1);
}



bool SudokuPlayer::solve(SudokuGame & game) {

    int row, col;
    tie(row, col) = isValidSpot(game); // find next empty cell

    if ((row < 0) || (col < 0)) {
        return true; // solved if no empty cells
    }

    for (int num = 1; num <= 9; ++num) { 

        bool valid = true;

        for (int j = 0; j < game.size() && valid; ++j) {

            valid = (num != game.value(j, col)); // check other cells in col

        }

        for (int j = 0; j < game.size() && valid; ++j) {

            valid = (num != game.value(row, j)); // check other cells in row

        }

        int rowNext = row - (row % 3);
        int colNext = col - (col % 3);

        for (int i = 0; i < 3 && valid; ++i) {

            for (int j = 0; j < 3 && valid; ++j) {

                valid = (num != game.value(rowNext + i, colNext + j));

            }

        }

        if (valid) {
            game.value(row, col, num);

            if (solve(game)) {
                return true;
            }

            else {
                game.value(row, col, 0);
            }
        }

    }

    return false;
}



int main() {

    SudokuGame game("sudoku_game_1.csv");
    cout << endl << "Puzzle" << endl << endl;
    game.print();

    SudokuPlayer player;
    bool solved = player.solve(game);

    if (solved) {
        cout << "Solution found!" << endl << endl;
        game.print();
    } 
    
    else {
        cout << "No solution found." << endl;
    }

    return 0;
}