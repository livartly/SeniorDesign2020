import React from 'react'
import {Link} from 'react-router-dom'
import {simplify} from 'mathjs'
import {parse} from 'mathjs'
import { Form, Row, Col, Card } from 'react-bootstrap';

class MagnitudeOrder extends React.Component 
{
    constructor(props)
    {
        super(props);
        
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
      

        var FunctionF = document.getElementById("FunctionF").value;
        var FunctionG = document.getElementById("FunctionG").value;

        if((FunctionF == "" || FunctionF == null) || FunctionG == "" || FunctionG == null)
        {
            document.getElementById("ErrorMessage").innerHTML = "Error: Must fill out both f(x) and g(x) forms before submitting!";
            document.getElementById("ErrorMessage").style.display = "block";
        }
        else if(FunctionF.includes("sin") || FunctionF.includes("cos") || FunctionF.includes("tan") || FunctionG.includes("tan") || FunctionG.includes("sin" || FunctionG.includes("cos")))
        {
          document.getElementById("ErrorMessage").innerHTML = "Error: Solver currently does not support trig operations";
          document.getElementById("ErrorMessage").style.display = "block";
        }
        else 
        {
          FunctionF = FunctionF.trim();
          FunctionG = FunctionG.trim();
          var FxTerms = FunctionF //.matchAll("(\\+|\\-)?[a-z0-9.^]+|\\(([^()]+)\\)|[/*+-]")
          var GxTerms = FunctionG //.matchAll("(\\+|\\-)?[a-z0-9.^]+|\\(([^()]+)\\)|[/*+-]")
 
          if(this.SolveProblem(FxTerms, GxTerms) != false)
          {
            //does nothing
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
      
      while(n <= 50 && FxResult >= 0 && GxResult >= 0)
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
               const1 = "1"
             }
             else const1 = "1/" + const1

            

             document.getElementById("Answer").innerHTML = "x >= " + n + ",  " + const1 + "(" + GxTerms
             + ") <= " + FxTerms + " <= " + const2 + "{" + GxTerms + "}";
             document.getElementById("Answer").style.display = "block";


             return true;
          }
          else if(flag == 1)
          {
            if(n < 10)
            {
              const1 = const1 + 1
            }
            else const1 = const1 + 20
          }
          else if(flag == 2)
          {
            if(n < 10)
            {
              const2 = const2 + 1
            }
            else const2 = const2 + 20
          }
          else
          {
            if(n < 10)
            {
              const1 = const1 + 1
              const2 = const2 + 1
            }
            else
            {
              const1 = const1 + 20
              const2 = const2 + 20
            }
          }

        }
        
        if(const1 >= 100 || const2 >= 100)
        {
          n = n + 1
          if(const1 >= 100 )
          {
            const1 = const1Start
          }
          if(const2 >= 100)
          {
            const2 = const2Start
          }
        }
       // alert("n = " + n + "     const1 = " + const1 + "     const2 = " + const2)
        FxResult = this.ParseEquation(FxTerms, n)
        GxResult = this.ParseEquation(GxTerms, n)

        if(n >= 50)
        {
        document.getElementById("ErrorMessage").innerHTML = "Error: f(x) growth rate does not fall within g(x)";
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
      var VerResultFx = this.ParseEquation(FxTerms, 500)
      var VerResultGx = this.ParseEquation(GxTerms, 500)

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
          <div className="container" style={{ marginTop: "50px" }}>
            <Form>
            <h1>Order Verification</h1>
              <Form.Group controlId="truthTableBuilder.instructions">
                <Form.Label><b>Instructions</b></Form.Label>
                <p>
                Enter in two functions f(x) and g(x). If these functions have the same Order of Magnitude then the solver will provide the n, constant1, and constant2 values such that
                (x >= n, constant1 * g(x) {'<='} f(x) {'<='} constant2 * g(x)). Please limit variable usage to only use x.
                </p>
              </Form.Group>
              <Form.Group controlId="truthTableBuilder.textInput">
                <Form.Label><b>Example</b> </Form.Label>
                <p>f(x) = x^2 + 5</p>
                <p>g(x) = x^2 + sqrt(x^1) + log(x)</p>
                <form id = "FunctionInputForm">
                    <label>
                         f(x): {' '}
                        <input id= "FunctionF">
                          
                        </input>
                        {' '}
                    </label>
                  <br></br>
                    <label>
                         g(x):
                        <input id= "FunctionG">
                          
                        </input>
                        {' '}
                    </label>
                  <br></br>
                    <label>
                         <button id = "SubmitButton"   onClick = {this.HandleClick}>
                           Submit
                         </button>
                    </label>
                  
                </form>
              </Form.Group>

              <Form.Group controlId="truthTableBuilder.cardOutput">
                <Form.Label>Result</Form.Label>
                <Card body style={{ minHeight: "100px" }}>
                <div id = "Output" style={{display: "block", color: "black"}}>
					         <label id = "ErrorMessage" style={{display: "none", color:"red"}}>
						            
					         </label>
                 
                   <label id = "Answer" style={{display: "none", color: "black", fontsize: "15px"}}>
                   </label>
				       </div>
                </Card>
              </Form.Group>
            </Form>
         </div>
         <br></br>
         <br></br>
          </div>
        )
    }
}
export default MagnitudeOrder;