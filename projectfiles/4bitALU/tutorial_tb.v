`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 02/02/2023 11:45:59 AM
// Design Name: 
// Module Name: tutorial_tb
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


module tutorial_tb;
    reg A, B, C;
    wire X, Y;
    tutorial dut(.a(A), .b(B), .c(C), .x(X), .y(Y));
    initial
    begin
        #0 A=0; B=0; C=0;
        #100 A=0; B=0; C=1;
        #100 A=0; B=1; C=0;
        #100 A=0; B=1; C=1;
        #100 A=1; B=0; C=0;
        #100 A=1; B=0; C=1;
        #100 A=1; B=1; C=0;
        #100 A=1; B=1; C=1;
    end
endmodule
