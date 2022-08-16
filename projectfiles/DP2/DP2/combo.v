module combo(   
    
    input a,     
    input b,     
    output w,     
    output x,     
    output y,     
    output z     
    );        

    assign w = (a ^ b);     
    assign x = ~(a ^ b);
    assign y = ~(a & b);     
    assign z = ~(a | b);   

endmodule
