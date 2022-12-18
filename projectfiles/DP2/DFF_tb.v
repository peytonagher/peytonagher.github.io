module DFFr_tb;

    wire Q, QBAR;
    reg D;
    reg CLK;
    reg RST;
    DFFr dff(.d(D), .clk(CLK), .rst(RST), .q(Q), .qbar(QBAR));

    initial
    begin
        CLK = 0;
        forever #10 CLK = ~CLK;
    end 
    initial
    begin
        #0 RST = 1; 
           D = 0;
        #100 RST = 0; 
             D = 1;
        #100 D = 0;
        #100 D = 1;
    end 

    endmodule

// other testbenches below:

//    initial
//    begin
//        RST = 1; D = 0;
//        #1000 $finish;
//    end
//    always begin CLK =0;
//        CLK = 0;
//        #(100/2);
//        CLK = 1;
//        #(100/2);
//    end
//    always #75 RST = !RST;
//    always #50 D = !D;
//    endmodule

//    always #10 CLK = ~CLK;
//    initial
//    begin
//        CLK = 1'b0;
//        RST = 1'b1;
//        D = 1'b1;
//        #(100/2) RST = 1'b0;
//        forever #(100/2) D = ~D;
//    end
//    endmodule

    
//    initial begin
//        RST = 1; D <= 0;
//        #100; RST=0; D <= 1;
//        #100; D <= 0;
//        #100; D <= 1;
//    end
//    endmodule
    

// q 0 -> 1 on trigger 
// q 1 -> 0 on trigger
// q 1 -> 0 when rst -> 1 