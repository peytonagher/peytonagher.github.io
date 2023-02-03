`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 02/02/2023 01:21:50 PM
// Design Name: 
// Module Name: MUX_41_tb
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module MUX_41_tb;
    wire OUT;
    reg A, B, C, D, S0, S1;
    MUX_41 mux(.out(OUT), .a(A), .b(B), .c(C), .d(D), .s0(S0), .s1(S1));
    initial
    begin
        #0 A=0; B=0; C=0; D=0; S1=0; S0=0;
        #100 A=1; B=0; C=0; D=0; S1=0; S0=0;
        #100 A=0; B=1; C=0; D=0; S1=0; S0=1;
        #100 A=0; B=0; C=1; D=0; S1=1; S0=0;
        #100 A=0; B=0; C=0; D=1; S1=1; S0=1;
    end
endmodule
