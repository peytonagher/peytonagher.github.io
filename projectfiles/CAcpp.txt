#include <iostream>
#include <string>
using std::cin;
using std::cout;
using std::endl;
using std::string;
using std::to_string;


/* This function takes a string of CA numbers and returns the sum
of them */

int get_line_sum(string start)
{
    int total = 0;
    for (int i = 0; i < static_cast<int>(start.length()); i++)
    {
        total += start[i] - 48; //ASCII value of 48 for char 0
    }
    return total;
}


/* This function uses a 3 character string as a code to scan a 
multiline string for a match and returns the corresponding value
of that match as a char */

char get_next_state(string start, string rules)
{
    int length = static_cast<int>(rules.length());
    for (int i = 0; i < length - 1; i++)
    {
        string line = start.substr(i, 3);
        if (rules.find(line) != std::string::npos)
        {
            int new_index = rules.find(line) + 7;
            char num = rules.at(new_index);
            return num;
        }
        else
        {
            char num = '0';
            return num;
        }
    }
    return 0;
}


/* This function takes a reference to a 7 character start string
representing the current generation of CA and updates each
character throughout the length of the start string 
with a multiline rules string when passing into the
get_next_state function */

void update_line(string &start, string rules)
{
    string temp = "";
    int length = static_cast<int>(start.length());
    for (int i = 0; i < length; i++)
    {
        if (i == 0)
        {
            string new_temp = "";
            new_temp.push_back(start[length - 1]);
            new_temp.push_back(start[0]);
            new_temp.push_back(start[1]);
            temp += get_next_state(new_temp, rules);
        }
        else if (i == length - 1)
        {
            string new_temp = "";
            new_temp.push_back(start[i - 1]);
            new_temp.push_back(start[i]);
            new_temp.push_back(start[0]);
            temp += get_next_state(new_temp, rules);
        }
        else
        {
            string new_temp = "";
            new_temp.push_back(start[i - 1]);
            new_temp.push_back(start[i]);
            new_temp.push_back(start[i + 1]);
            temp += get_next_state(new_temp, rules);
        }
    }
    start = temp;
}


/* This function takes a multiline string of rules, an int for how many
generations to update the CA, and a start state string, it returns a 
multiline string representing each successive step of CA and the sum
of the digits across the same step of CA */

string run_cellular_automata(string rules, int n, string start)
{
    string line = "";
    line += start + " sum = " + to_string(get_line_sum(start)) + '\n';
    for (int i = 0; i < n - 1; i++)
    {
        update_line(start, rules);
        line += start + " sum = " + to_string(get_line_sum(start)) + '\n';
    }
    return line;
}

int main()
{
    int n;
    string rules;
    string start;
    string input;
    rules = "";
    while (getline(cin, input))
    {
        if (input == ".")
        {
            break;
        }
        else
        {
            rules += input + '\n';
        }
    }
    cin >> n;
    cin >> start;
    cout << run_cellular_automata(rules, n, start) << endl;
    return 0;
}

// INPUT:
/*
001 -> 2
010 -> 1
100 -> 3
002 -> 1
.
10
0001000
*/