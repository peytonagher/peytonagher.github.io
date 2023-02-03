`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 02/02/2023 02:29:54 PM
// Design Name: 
// Module Name: LogicBlk_tb
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


module LogicBlk_tb;
    wire Y;
    reg A,B,S1,S0;
    LogicBlk logicblk(.a(A), .b(B), .s0(S0), .s1(S1), .y(Y));
    initial
    begin
        #0 A=0; B=0; S1=0; S0=0;
        #100 A=1; B=0; S1=0; S0=0;
        #100 A=1; B=0; S1=0; S0=1;
        #100 A=1; B=0; S1=1; S0=0;
        #100 A=1; B=0; S1=1; S0=1;
    end
endmodule
