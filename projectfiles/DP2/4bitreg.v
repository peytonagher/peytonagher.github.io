module register_4bit(

    input [3:0]d,
    input clk,
    input ld,
    input rst,
    output reg [3:0]q
    );
    always @ (posedge(clk), posedge(rst))
    begin
    if (rst)
        q <= 4'b0000;
    else if (ld)
        q = d;
    end
    
endmodule