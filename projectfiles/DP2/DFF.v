module DFFr(d,clk,rst,q,qbar);

    input d, clk, rst;
    output reg q;
    output qbar;
    always @ (posedge(clk), posedge(rst))
    begin
        if (rst == 1'b1)
            q <= 1'b0;
        else 
            q <= d;
    end
    assign qbar = ~q;

endmodule