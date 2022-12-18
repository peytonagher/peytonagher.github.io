`timescale 1ns / 1ps

module PM_FSM_tb();
    reg tbs, tbh, tbd, tbt, tbclk;
    wire tbct, tbp;
    wire [3:0] tbL;
    wire [4:0] tbstate;
    localparam clkper=10; //periodic clk: period = 10*(100ns) --> freq = 1MHz

PM_FSM i0 (tbs, tbh, tbd, tbt, tbclk, tbp, tbct, tbL, tbstate);    
//1MHz clock
    initial tbclk=0;  
    always       
        #(clkper/2) tbclk=~tbclk; 
//reset inputs    
    initial begin
        tbs=0; tbh=0; tbd=0; tbt=1; //t idles high
        end
///////////////
// Must comment out all but one of the "insert coin" cases below
///////////////
///insert 50c////        
    initial begin //clk starts with half-cycle delay; clkper will change signals out of phase with clk
        #clkper tbs=1;//press Start
        #clkper tbh =1;
        #clkper tbh=0; //coin done
            tbs =0; //release Start
        #(1.5*clkper) tbt = 0; //simulate timer starting
        #(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
        #(10*clkper) $finish;
	end
	
///insert 50c+50c////        
    initial begin //clk starts with half-cycle delay; clkper will change signals out of phase with clk
        #clkper tbs=1;//press Start
        #clkper tbh =1;
			#clkper tbh=0; //coin1 done
		#clkper tbh =1;
			#clkper tbh=0; //coin2 done
            tbs =0; //release Start
        #(1.5*clkper) tbt = 0; //simulate timer cycle1 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle2 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
        #(10*clkper) $finish;		
        end        
		
///insert 100c+100c////        
    initial begin //clk starts with half-cycle delay; clkper will change signals out of phase with clk
        #clkper tbs=1;//press Start
        #clkper tbd =1;
			#clkper tbd=0; //coin1 done
		#clkper tbd =1;
			#clkper tbd=0; //coin2 done
            tbs =0; //release Start
		#clkper //wait for dispense coin state
        #(1.5*clkper) tbt = 0; //simulate timer cycle1 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle2 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle3 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle4 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
        #(10*clkper) $finish;		
        end        		

///insert 100c+50c+100c////        
    initial begin //clk starts with half-cycle delay; clkper will change signals out of phase with clk
        #clkper tbs=1;//press Start
        #clkper tbd =1;
			#clkper tbd=0; //coin1 done
		#clkper tbh =1;
			#clkper tbh=0; //coin2 done			
		#clkper tbd =1;
			#clkper tbd=0; //coin3 done
            tbs =0; //release Start
		#clkper //wait for dispense coin state
			#clkper //wait for #2 dispense coin state
        #(1.5*clkper) tbt = 0; //simulate timer cycle1 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle2 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle3 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle4 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
        #(10*clkper) $finish;		
        end        		

///insert 100c+50c+100c, then insert 50c////        
    initial begin //clk starts with half-cycle delay; clkper will change signals out of phase with clk
//Purchase1
        #clkper tbs=1;//press Start
        #clkper tbd =1;
			#clkper tbd=0; //coin1 done
		#clkper tbh =1;
			#clkper tbh=0; //coin2 done			
		#clkper tbd =1;
			#clkper tbd=0; //coin3 done
            tbs =0; //release Start
		#clkper //wait for dispense coin state
			#clkper //wait for #2 dispense coin state
        #(1.5*clkper) tbt = 0; //simulate timer cycle1 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle2 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle3 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
		#(1.5*clkper) tbt = 0; //simulate timer cycle4 starting
			#(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
        #(6*clkper) //wait before next purchase
//Purchase2        
        #clkper tbs=1;//press Start
        #clkper tbh =1;
        #clkper tbh=0; //coin done
            tbs =0; //release Start
        #(1.5*clkper) tbt = 0; //simulate timer starting
        #(3*clkper) tbt = 1; //timer complete; simulated 4 clock timer delay
        #(6*clkper) $finish;
        end           		
endmodule