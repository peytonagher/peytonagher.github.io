`timescale 1ns / 1ps

module DP2_tb; //4x1 mux
    reg IN0, IN1, IN2, IN3, S0, S1;
    wire Y;
    MUX dut (.Y(Y), .IN0(IN0), .IN1(IN1), .IN2(IN2), .IN3(IN3), .S0(S0), .S1(S1));
    initial
        begin
            #0 S0=0; S1=0; IN0=1; IN1=0; IN2=0; IN3=0;
            #100 S0=0; S1=1; IN0=0; IN1=1; IN2=0; IN3=0;
            #100 S0=1; S1=0; IN0=0; IN1=0; IN2=1; IN3=0;
            #100 S0=1; S1=1; IN0=0; IN1=0; IN2=0; IN3=1;
        end
endmodule