`timescale 100ps / 10ps

module timer_tb();
    reg TCLK;
    reg CT;
    wire T;
    wire [10:0] DC;
    localparam clkper = 2;
    
    timerFSM down_counter(.tclk(TCLK), .ct(CT), .t(T), .count(DC));
    
    initial begin
        TCLK = 0;
    end

    always #(clkper/2) TCLK = ~TCLK;
    
    initial begin
        CT = 1;
        #clkper CT <= 0;
        #(clkper * (11'b11100001000 + 2)) CT = 1;
        #(clkper * 2) CT = 0;
        #(clkper * (11'b11100001000 + 100)) $finish;
    end
endmodule