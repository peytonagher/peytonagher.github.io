`timescale 1ns / 1ps

module MUX_21_tb;     
    reg IN1, IN2, S;     
    wire Y;     
    MUX_21 dut (.out(Y), .in1(IN1), .in2(IN2), .S(S));     
    initial         
        begin             
            #0 S=0; IN1=0; IN2=0;
            #100 S=0; IN1=0; IN2=1;
            #100 S=0; IN1=1; IN2=0;
            #100 S=0; IN1=1; IN2=1;
            #100 S=1; IN1=0; IN2=0;
            #100 S=1; IN1=0; IN2=1;
            #100 S=1; IN1=1; IN2=0;
            #100 S=1; IN1=1; IN2=1;    
            #900 $finish;            
        end       
endmodule