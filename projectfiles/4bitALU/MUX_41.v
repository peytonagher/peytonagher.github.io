`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 02/02/2023 01:11:53 PM
// Design Name: 
// Module Name: MUX_41
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


module MUX_41(a,b,c,d,s0,s1,out);
    input a,b,c,d,s0,s1;
    output out;
    wire out1, out2;

    MUX_21 M41(.in0(a), .in1(b), .s(s0), .y(out1));
    MUX_21 M42(.in0(c), .in1(d), .s(s0), .y(out2));
    MUX_21 M43(.in0(out1), .in1(out2), .s(s1), .y(out));

endmodule
