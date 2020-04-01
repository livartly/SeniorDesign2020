import React from 'react'
import {Link} from 'react-router-dom'
import {simplify} from 'mathjs'
import {parse} from 'mathjs'
class MagnitudeOrder extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
             m_FunctionF: null,
             m_FunctionG: null,
             m_C1: 0,
             m_C2: 0,
             m_N : 0,
        };
        this.HandleClick = this.HandleClick.bind(this);
        this.SolveProblem = this.SolveProblem.bind(this);
        this.VerifySolution = this.VerifySolution.bind(this);
        this.ParseEquation = this.ParseEquation.bind(this);
    }

    HandleClick(e)
    {
        document.getElementById("ErrorMessage").style.display = "none";
        document.getElementById("ErrorMessage").innerHTML = "";
        document.getElementById("Answer").style.display = "none";
        document.getElementById("Answer").innerHTML = "";
        e.preventDefault();
      
        this.state.m_FunctionF = document.getElementById("FunctionF").value;
        this.state.m_FunctionG = document.getElementById("FunctionG").value;

        if((this.state.m_FunctionF == "" || this.state.m_FunctionF == null) || this.state.m_FunctionG == "" || this.state.m_FunctionG == null)
        {
            document.getElementById("ErrorMessage").innerHTML = "Error: Must fill out both f(x) and g(x) forms before submitting!";
            document.getElementById("ErrorMessage").style.display = "block";
        }
        else if(this.state.m_FunctionF.includes("sin") || this.state.m_FunctionF.includes("cos") || this.state.m_FunctionF.includes("tan") || this.state.m_FunctionG.includes("tan") || this.state.m_FunctionG.includes("sin" || this.state.m_FunctionG.includes("cos")))
        {
          document.getElementById("ErrorMessage").innerHTML = "Error: Solver currently does not support trig operations";
          document.getElementById("ErrorMessage").style.display = "block";
        }
        else 
        {
          this.state.m_FunctionF = this.state.m_FunctionF.trim();
          this.state.m_FunctionG = this.state.m_FunctionG.trim();
          var FxTerms = this.state.m_FunctionF //.matchAll("(\\+|\\-)?[a-z0-9.^]+|\\(([^()]+)\\)|[/*+-]")
          var GxTerms = this.state.m_FunctionG //.matchAll("(\\+|\\-)?[a-z0-9.^]+|\\(([^()]+)\\)|[/*+-]")
 
          if(this.SolveProblem(FxTerms, GxTerms) == true)
          {
            document.getElementById("Answer").innerHTML = "x >= " + this.state.m_N + ",  " + this.state.m_C1 + "(" + this.state.m_FunctionG
            + ") <= " + this.state.m_FunctionF + " <= " + this.state.m_C2 + "{" + this.state.m_FunctionG + "}";
            document.getElementById("Answer").style.display = "block";
          }
        }
    }

    ParseEquation(Terms, n)
    {
      try
      {   
       while(Terms.includes("log(") && n >= 1)
       { 
          //alert("enter")
         // alert(Terms + " " + Terms.indexOf(")") + " " + Terms.indexOf("log("))
          var Lslice = Terms.slice(Terms.indexOf("log("), Terms.indexOf(")", Terms.indexOf("log(")) + 1)
         // alert("Lslice: " + Lslice)
          var value = Lslice.slice(Lslice.indexOf("log(") + 4, Lslice.indexOf(")", Terms.indexOf("log(")))
          //alert("value: " + value)
          const g = parse(value)
         // alert("g: " + g)
          const simpl = simplify(g)
         // alert("simpl: " + simpl)
          var logNumber = simpl.evaluate({x:n})
          
          Terms = Terms.replace(Lslice, Math.log10(logNumber))
    
       }
       //alert("exit")
       const f = parse(Terms)
       const simp = simplify(f) 
       return simp.evaluate({x:n})
      }

      catch(e)
      {
        alert(e.message)
        return -1
      }
    }

    SolveProblem(FxTerms, GxTerms)  //Will attempt to solve so X > N, 
    {
      var n = 0
      var const1 = 1
      var const2 = 1
      var FxTermsCopy = FxTerms
      var GxTermsCopy = GxTerms

      if(FxTerms.includes("log") || GxTerms.includes("log"))
      {
        n = n + 1
        const2 = const2 + 1
      }

      var FxResult = this.ParseEquation(FxTerms, n)
      var GxResult = this.ParseEquation(GxTerms, n)
      var const2Start = const1
      var const1Start = const2
      
      while(n <= 100 && FxResult >= 0 && GxResult >= 0)
      {
        if(FxResult < (GxResult * (1/const1)))
        {
            const1 = const1 + 1;
        }

        if(FxResult > (GxResult * const2))
        {
          const2 = const2 + 1;
        }

        if(FxResult >= (GxResult * (1/const1)) && FxResult <= (GxResult * const2))
        {
          var flag = this.VerifySolution(FxTerms, GxTerms, const1, const2)
          if(flag == 0)
          {
             //alert("Success: " + "1/"+ const1 + "(" + this.state.m_FunctionG + ") <= " + 
             //    this.state.m_FunctionF + " <= " + const2 + "(" + this.state.m_FunctionG +
             //    ")" + "\nWhere X >= " + n)
             
             if(const1 == 1)
             {
               this.state.m_C1 = "1"
             }
             else this.state.m_C1 = "1/" + const1

             this.state.m_C2 = const2
             this.state.m_N = n

             return true;
          }
          else if(flag == 1)
          {
            const1 = const1 + 1
          }
          else if(flag == 2)
          {
            const2 = const2 + 1
          }
          else
          {
            const1 = const1 + 1
            const2 = const2 + 1
          }

        }
        
        if(const1 >= 1002 || const2 >= 1002)
        {
          n = n + 1
          if(const1 >= 1002 )
          {
            const1 = const1Start
          }
          if(const2 >= 1002)
          {
            const2 = const2Start
          }
        }
       // alert("n = " + n + "     const1 = " + const1 + "     const2 = " + const2)
        FxResult = this.ParseEquation(FxTerms, n)
        GxResult = this.ParseEquation(GxTerms, n)

        if(n >= 100)
        {
        document.getElementById("ErrorMessage").innerHTML = "Error: X has not reached an answer below: X <= 100";
        document.getElementById("ErrorMessage").style.display = "block";
        return false
        }
      }

      alert(FxResult)
      alert(GxResult)
      document.getElementById("ErrorMessage").innerHTML = "Error: Solver has determined that these functions are not growing within scope";
      document.getElementById("ErrorMessage").style.display = "block";
      
    }

    VerifySolution(FxTerms, GxTerms, const1, const2)
    {
      var VerResultFx = this.ParseEquation(FxTerms, 50)
      var VerResultGx = this.ParseEquation(GxTerms, 50)

      if(VerResultFx >= (VerResultGx * (1/const1)) && VerResultFx <= (VerResultGx * const2))
      {
        return 0 //Success
      }
      else if(VerResultFx < (VerResultGx * (1/const1)) && VerResultFx <= (VerResultGx * const2))
      {
        return 1 // Failure due to const1 being too low
      }
      else if(VerResultFx >= (VerResultGx * (1/const1)) && VerResultFx > (VerResultGx * const2))
      {
        return 2 // Failure due to const2 being too low
      }
      else 
      {
        return 3 // Failure due to both
      }
    }

    render()
    {
        return (
          <div>
          <div className="container main">
          <h1>Order Verification</h1>
          <div className="row">
            <div className= "tweleve columns">
              <div className="center">
                <p><b>Entering formulas: </b>

                    <p>
                      Enter in two functions f(x) and g(x). If these functions have the same Order of Magnitude
                      <br></br> then the solver will provide the n, constant1, and constant2 values such that
                      <br></br> (x >= n, constant1 * g(x) {'<='} f(x) {'<='} constant2 * g(x)) <br></br><br></br> 
                      <b>Example:</b><br></br> f(x) = x^2 + 5 <br></br> g(x) = x^2 + sqrt(x^1) + log(x)
                      <br></br>
                      <br></br> Please limit variable usage to only use x
                      
                    </p>
                </p>

                <form id = "FunctionInputForm">
                    <label>
                         f(x): {' '}
                        <input id= "FunctionF">
                          
                        </input>
                        {' '}
                    </label>
                  
                    <label>
                         g(x):
                        <input id= "FunctionG">
                          
                        </input>
                        {' '}
                    </label>
                  
                    <label>
                         <button id = "SubmitButton"   onClick = {this.HandleClick}>
                           Submit
                         </button>
                    </label>
                  
                </form>
               <div> 
                Answer: 
                
               </div>
			      	 <div id = "Output" style={{display: "block", color: "black"}}>
					         <label id = "ErrorMessage" style={{display: "none", color:"red"}}>
						            
					         </label>
                 
                   <label id = "Answer" style={{display: "none", color: "black", fontsize: "15px"}}>
                        Answer
                   </label>
				       </div>
                
          </div>
          </div>
          </div>
          </div>
                    {/* Footer */}
                    <footer>
          <div class="row grey">
            <div class="container main">

              <p class="copyright">
                <h6>Site Map</h6>
              </p>
              <div className="four columns">
                <Link to="/">
                <button type="button">Home</button>
                </Link>
                <Link to="/resources">
                <button type="button">Resources</button>
                </Link>
              </div>

              <div className="four columns">
                <Link to="/about">
                <button type="button">About</button>
                </Link>
                <Link to="/feedback">
                <button type="button">Contact</button>
                </Link>
              </div>

              <div className= "tweleve columns">
              <p class="copyright">
                  <h3>&copy; 2020 Wolfram Beta. All Rights Reserved.</h3>
              </p>
              </div>

            </div>

            </div>
          </footer>
          </div>
        )
    }
}
export default MagnitudeOrder;