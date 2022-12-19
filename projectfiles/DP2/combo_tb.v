module combo_tb;   

    reg A, B;     
    wire W, X, Y, Z;     
    DP2 dut (.a(A), .b(B), .w(W), .x(X), .y(Y), .z(Z));     

    initial    
    begin         
        #0 A=0; B=0;         
        #100 A=0; B=1;         
        #100 A=1; B=0;         
        #100 A=1; B=1;     
    end 

endmodule 
