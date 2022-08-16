`timescale 1ns / 1ps

module FSM(clk, s, h, d, t, p, ct, L, state);
    input clk, s, h, d, t;
    output reg p;
    output reg ct;
    output reg [3:0] L;
    output reg [4:0] state;
    
    parameter idle = 0;
    parameter start = 1;
    parameter r50c = 2;
    parameter r100c = 3;
    parameter r150c = 4;
    parameter r200c = 5;
    parameter r250c = 6;
    parameter st30 = 7;
    parameter tim30 = 8;
    parameter st60 = 9;
    parameter tim60 = 10;
    parameter st90 = 11;
    parameter tim90 = 12;
    parameter st120 = 13;
    parameter tim120 = 14;
    parameter d50cb = 15;
    parameter d50ca = 16;
    
    initial begin
        state = idle;
        p = 0;
        L = 4'b0001;
        ct = 0;
    end

    always @(posedge clk) begin
        case (state)
            idle:   if (s) state <= start;
                    else state <= idle;
            start:  if (s && h) state <= r50c;
                    else if (s && d) state <= r100c;
                    else state <= idle;
            r50c:   if (s && h) state <= r100c;
                    else if (s && d) state <= r150c;
                    else if (!s) state <= st30;
            r100c:  if (s && h) state <= r150c;
                    else if (s && d) state <= r200c;
                    else if (!s) state <= st60;
            r150c:  if (s && h) state <= r200c;
                    else if (s && d) state <= r250c;
                    else if (!s) state <= st120;
            r200c:  if (s && h) state <= r250c;
                    else if (!s) state <= d50cb;
            r250c:  state <= d50ca;
            d50cb:  state <= st120;
            d50ca:  state <= d50cb;
            st30:   state <= tim30;
            st60:   state <= tim60;
            st90:   state <= tim90;
            tim90:  if (t) state <= st60;
                    else state <= tim90;
            st120:  state <= tim120;
            tim120: if (t) state <= st90;
                    else state <= tim120;
            default:    state <= idle;
        endcase
    end

    always @(state)
        begin
            p = (state == d50cb || state == d50ca);
            ct = (state == st30 || state == st60 || state == st90 || state == st120);
            L[0] = (state == idle || state == start);
            L[1] = !(state == idle || state == start);
            L[2] = !(state == idle || state == start || state == r50c || state == st30 || state == tim30);
            L[3] = (L[2] && !(state == r100c || state == st60 || state == tim60));
        end
endmodule