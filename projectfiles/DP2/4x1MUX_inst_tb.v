`timescale 1ns / 1ps

module MUX_41_tb; //made with instantiated 2x1 mux's
    wire outF;
    reg A, B, C, D, S0, S1;
    MUX_41 mux(.out(outF), .a(A), .b(B), .c(C), .d(D), .s0(S0), .s1(S1));
    initial
        begin
            #0 A=1; B=0; C=0; D=0; S1=0; S0=0;
            #100 A=0; B=1; C=0; D=0; S1=0; S0=1;
            #100 A=0; B=0; C=1; D=0; S1=1; S0=0;
            #100 A=0; B=0; C=0; D=1; S1=1; S0=1;
            #400 $finish;
        end
endmodule