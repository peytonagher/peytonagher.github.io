module register_4bit_tb;

    reg [3:0] D; 
    reg CLK, LD, RST;
    wire [3:0] Q;
    register_4bit rgs(.d(D), .clk(CLK), .ld(LD), .rst(RST), .q(Q));
    initial
    begin
        #50 D <= 4'b0000; RST = 0; LD = 1; CLK = 1;
        #50 D <= 4'b0001; RST = 0; LD = 1; CLK = 0;
        #50 D <= 4'b0001; RST = 0; LD = 1; CLK = 1;
        #50 D <= 4'b0010; RST = 0; LD = 1; CLK = 0;
        #50 D <= 4'b0011; RST = 0; LD = 1; CLK = 1;
        #50 D <= 4'b0100; RST = 0; LD = 1; CLK = 0;
        #50 D <= 4'b0101; RST = 0; LD = 1; CLK = 1;
        #50 D <= 4'b0110; RST = 0; LD = 1; CLK = 0;
        #50 D <= 4'b0111; RST = 0; LD = 1; CLK = 1;
        #50 D <= 4'b1000; RST = 0; LD = 1; CLK = 0;
        #50 D <= 4'b1001; RST = 0; LD = 1; CLK = 1;
        #50 D <= 4'b1010; RST = 0; LD = 1; CLK = 0;
        #50 D <= 4'b1010; RST = 1; LD = 1; CLK = 1;
        #50 D <= 4'b1010; RST = 0; LD = 1; CLK = 0;
    $finish;
    end
    
endmodule