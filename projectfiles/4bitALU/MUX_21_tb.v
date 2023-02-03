`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 02/02/2023 12:41:42 PM
// Design Name: 
// Module Name: MUX_21_tb
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


module MUX_21_tb;
    reg S, IN0, IN1;
    wire Y;
    MUX_21 dut(.s(S), .in0(IN0), .in1(IN1), .y(Y));
    initial
    begin
        #0 S=0; IN0=0; IN1=0;
        #100 S=0; IN0=0; IN1=1;
        #100 S=0; IN0=1; IN1=0;
        #100 S=0; IN0=1; IN1=1;
        #100 S=1; IN0=0; IN1=0;
        #100 S=1; IN0=0; IN1=1;
        #100 S=1; IN0=1; IN1=0;
        #100 S=1; IN0=1; IN1=1;
    end
endmodule
