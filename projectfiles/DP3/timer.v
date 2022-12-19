`timescale 100ps / 10ps

module timerFSM(
    input tclk,
    input ct,
    output reg t,
    output reg [10:0] count
    );
    
    initial
        begin
            count = 11'b11100001000;
            t = 0;
        end
        
    always @(negedge tclk)
        begin
            if (count == 0)
                t <= 1;
            else
                t <= 0;
        end
    always @(posedge tclk)
        begin
            if (ct == 1)
                count = 11'b11100001000;
            else 
                count = (count - 11'b1);
        end
endmodule