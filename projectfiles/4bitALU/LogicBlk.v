`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 02/02/2023 02:01:42 PM
// Design Name: 
// Module Name: LogicBlk
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


module LogicBlk(a,b,s0,s1,y);
    input a,b,s0,s1;
    output y;
    wire INV, XOR, AND, OR;
    
    assign INV = ~a;
    assign XOR = a ^ b;
    assign AND = a & b;
    assign OR = a | b;
    
    MUX_41 M41(.a(INV), .b(XOR), .c(AND), .d(OR), .s0(s0), .s1(s1), .out(y));
    
endmodule
