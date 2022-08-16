`timescale 1ns / 1ps

module MUX_41(a, b, c, d, s0, s1, out); //made with instantiated 2x1 mux's
    input a, b, c, d, s0, s1;
    output out;
    wire out1, out2;
    MUX_21 M41(.in1(a), .in2(b), .S(s0), .out(out1));
    MUX_21 M42(.in1(c), .in2(d), .S(s0), .out(out2));
    MUX_21 M43(.in1(out1), .in2(out2), .S(s1), .out(out));
endmodule