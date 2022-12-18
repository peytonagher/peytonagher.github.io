`timescale 1ns / 1ps

module MUX_21(in1, in2, S, out);          
    input in1;          
    input in2;          
    input S;          
    output out;          
    wire o1, o2, o3;          
    and (o2, o1, in1);         
    and (o3, in2, S);         
    not (o1, S);          
    or (out, o2, o3);  
endmodule