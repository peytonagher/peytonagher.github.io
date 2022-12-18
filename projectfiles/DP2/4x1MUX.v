`timescale 1ns / 1ps

module andGate(output a, input b, c, d);
    assign a = (b & c & d);
endmodule

module notGate(output e, input f);
    assign e = ~f;
endmodule

module orGate(output g, input h, i, j, k);
    assign g = (h | i | j | k);
endmodule

module DP2(Y, IN0, IN1, IN2, IN3, S0, S1); //4x1 mux
    input IN0, IN1, IN2, IN3, S0, S1;
    output Y;
    wire o1, o2, o3, o4, S0x, S1x;
    notGate p1(S0x, S0), p2(S1x, S1);
    andGate p3(o1, IN0, S0x, S1x), p4(o2, IN1, S0x, S1), p5(o3, IN2, S0, S1x), p6(o4, IN3, S0, S1);
    orGate p7(Y, o1, o2, o3, o4);
endmodule