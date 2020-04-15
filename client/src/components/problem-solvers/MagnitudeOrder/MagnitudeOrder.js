import React from 'react'
import nerdamer from 'nerdamer/nerdamer.core.js'
import 'nerdamer/Algebra.js'
import 'nerdamer/Calculus.js'
import 'nerdamer/Solve.js'
import {simplify} from 'mathjs';
import {parse} from 'mathjs';
import { Form, Card } from 'react-bootstrap';
import { sendProblem } from '../../../utils/problemsAPIUtil';

class MagnitudeOrder extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
          m_FxEquation: "",
          m_GxEquation: "",
          m_nValue: "",
          m_c1Value: "",
          m_c2Value: "",
          error: null,
          error2: null,
          Verification: null,
          Answer: null,
          SameOrderFlag: false,
       };
        
        this.VerifyOrder = this.VerifyOrder.bind(this);
        this.VerifyInputs = this.VerifyInputs.bind(this);
        this.setFxEquation = this.setFxEquation.bind(this);
        this.setGxEquation = this.setGxEquation.bind(this);
        this.setNValue = this.setNValue.bind(this);
        this.setc1Value = this.setc1Value.bind(this);
        this.setc2Value = this.setc2Value.bind(this);
    }

    VerifyOrder(e)
    {
      var EquationF = this.state.m_FxEquation.trim();
      var EquationG = this.state.m_GxEquation.trim();
      
      try
      {
       if(EquationF != null && EquationF.trim() != "" && EquationG != null && EquationG.trim() != "")
       {
         //Solve
         EquationF = EquationF.toLowerCase();
         EquationG = EquationG.toLowerCase();

         if(EquationF.includes("sin") || EquationF.includes("tan") || EquationF.includes("cos") || EquationF.includes("cot") || EquationF.includes("csc") || EquationF.includes("sec"))
         {
          this.setState({ Verification:null, error: "Error: Trigonometric functions are not supported by the solver at this time." });
          return;
         }
         if(EquationG.includes("sin") || EquationG.includes("tan") || EquationG.includes("cos") || EquationG.includes("cot") || EquationG.includes("csc") || EquationG.includes("sec"))
         {
          this.setState({ Verification:null, error: "Error: Trigonometric functions are not supported by the solver at this time." });
          return;
         }

         var fxOrder = "deg(" + EquationF.trim() + ",x)" 
         var gxOrder = "deg(" + EquationG.trim() + ",x)"

         fxOrder = nerdamer(fxOrder).toString()
         gxOrder = nerdamer(gxOrder).toString()

         //alert(fxOrder + "  " + gxOrder)
         if(fxOrder === gxOrder && (fxOrder != 0 && gxOrder != 0)) //Fx and Gx have the same order due to only being basic polynomials
         {
           
          this.setState({ Verification: " Verification Success: F(x) and G(x) are the same order", error: null, SameOrderFlag: true });
          return;
         }
         else if(fxOrder != gxOrder || (fxOrder == 0 && gxOrder == 0)) //Check if they are not same order or contain a highest order of sqrt or log.
         {
            if(fxOrder == 0 && gxOrder == 0) //Check for log, sqrt, const
            {
              if(EquationF.includes("log"))//Check for sqrtx. logx, or const as highest order
              {
                fxOrder = this.checkLog(EquationF);
                //alert("fxOrder: " + fxOrder);
              }
              if(EquationG.includes("log"))//Check for sqrtx. logx, or const as highest order
              {
                gxOrder = this.checkLog(EquationG);
               // alert("gxOrder: " + gxOrder);
              }
              if(EquationF.includes("sqrt"))
              {
                fxOrder = this.checkSqrt(EquationF);
               // alert("fxOrder: " + fxOrder);
              }
              if(EquationG.includes("sqrt"))
              {
                gxOrder = this.checkSqrt(EquationG);
               // alert("gxOrder: " + gxOrder);
              }

              if(fxOrder != -1 || gxOrder != -1 )
              {
                if(fxOrder == gxOrder) // Either logorder==logorder, 0==0, const == const, sqrt == sqrt
                {
                  this.setState({ Verification: " Verification Success: F(x) and G(x) are the same order", error: null, SameOrderFlag: true });
                  return;
                }
                else 
                {
                  this.setState({ Verification: " Verification Failure: F(x) and G(x) {do not} have the same order", error: null, SameOrderFlag: false });
                  return;
                }
              }

            }
            else //Order does not equal and does not have an order of (log(), x^(1/2), or const)
            {
            //  alert("Functions have different orders and do not equal")
              this.setState({ Verification: " Verification Failure: F(x) and G(x) {do not} have the same order", error: null, SameOrderFlag: false });
              return;
            }
         }
         else //
         {
          this.setState({ Verification: " Verification Failure: F(x) and G(x) {do not} have the same order", error: null, SameOrderFlag: false });
          return;
         }
       }
       else
       {
        this.setState({ Verification: null, error: "Error: F(x) and G(x) must have input values" });
        return;
       }
      }
      catch(err)
      {
        this.setState({ Verification:null, error: "Error: Incorrect Formatting Detected" });
        return;
      }
       
    }

    checkLog(func)
    {
      var strtIdx = func.indexOf("log(");
      var logIdx = func.indexOf("log");
      var endIdx;

      while(true)
      {
        endIdx = func.indexOf(")", strtIdx);
        
       // alert(strtIdx + "  " + endIdx + "  " + logIdx)
        if(strtIdx != -1 && endIdx != -1)
        {
          var polynomial = func.slice(strtIdx + 1, endIdx);
          if(polynomial.includes("x"))
          {
            return "logOrder";
          }
          logIdx = func.indexOf("log", endIdx); //Find the next log instance if it exists
          strtIdx = func.indexOf("log(", endIdx); //Find the next log instance if it exists
          endIdx = func.indexOf(")", strtIdx); ////Find the next log closing if it exists
        }
        else if(logIdx != -1 && (strtIdx == -1 || endIdx == -1))
        {
          //Error: log found but not correct syntax
          this.setState({ Verification:null, error: "Error: Log values must be formatted like the example provided above." });
          return -1;
        }
        else
        {
          return "const";
        }
      }
    }

    checkSqrt(func)
    {
      var strtIdx = func.indexOf("sqrt(");
      var logIdx = func.indexOf("sqrt");
      var endIdx;

      while(true)
      {
        endIdx = func.indexOf(")", strtIdx);
        
       // alert(strtIdx + "  " + endIdx + "  " + logIdx)
        if(strtIdx != -1 && endIdx != -1)
        {
          var polynomial = func.slice(strtIdx + 1, endIdx);
          if(polynomial.includes("x"))
          {
            return "sqrtOrder";
          }
          logIdx = func.indexOf("sqrt", endIdx); //Find the next log instance if it exists
          strtIdx = func.indexOf("sqrt(", endIdx); //Find the next log instance if it exists
          endIdx = func.indexOf(")", strtIdx); ////Find the next log closing if it exists
        }
        else if(logIdx != -1 && (strtIdx == -1 || endIdx == -1))
        {
          //Error: log found but not correct syntax
          this.setState({ Verification:null, error: "Error: Sqrt values must be formatted like the example provided above." });
          return -1;
        }
        else
        {
          return "const";
        }
      }
    }

    setFxEquation(event)
    {
      this.setState({
        m_FxEquation: event.currentTarget.value,
        VerifyOrder: false,
        Verification: null,
        error: null,
        error2: null,
        Answer: null
        });
    }

    setGxEquation(event)
    {
      this.setState({
        m_GxEquation: event.currentTarget.value,
        VerifyOrder: false,
        Verification: null,
        error: null,
        error2: null,
        Answer: null
        });
    }

    setNValue(event)
    {
      this.setState({
        m_nValue: event.currentTarget.value.trim(),
        Answer: null
        });
    }

    setc1Value(event)
    {
      this.setState({
        m_c1Value: event.currentTarget.value.trim(),
        Answer: null
        });
    }

    setc2Value(event)
    {
      this.setState({
        m_c2Value: event.currentTarget.value.trim(),
        Answer: null
        });
    }

    VerifyInputs()
    { 
      //alert(this.state.SameOrderFlag)
      this.setState({error2: null });
        if(this.state.SameOrderFlag == true)
        {
          var nValue = this.state.m_nValue;
          var c1Value = this.state.m_c1Value;
          var c2Value = this.state.m_c2Value;
          var EquationF = this.state.m_FxEquation;
          var EquationG = this.state.m_GxEquation;
          var maxN = 100;

          //EquationF != null && EquationF.trim() != ""
          if((nValue != null && nValue.trim() != "") && (c1Value != null && c1Value.trim() != "") && (c2Value != null && c2Value.trim() != ""))
          {
              var funcLowerBoundG;
              var funcHigherBoundG;
              var funcSolutionF;

              if(this.testValues(nValue, c1Value, c2Value) === true)
              {
                try
                {
                funcSolutionF = this.solveFunction(EquationF, nValue, null);
                funcLowerBoundG = this.solveFunction(EquationG, nValue, c1Value);
                funcHigherBoundG = this.solveFunction(EquationG, nValue, c2Value);
                }
                catch(err)
                {
                  this.setState({ Verification:null, error2: "Error: Incorrect Formatting Detected" });
                  return;
                }
                
                if(funcLowerBoundG <= funcSolutionF && funcSolutionF <= funcHigherBoundG)
                {
                  funcSolutionF = this.solveFunction(EquationF, maxN, null);
                  funcLowerBoundG = this.solveFunction(EquationG, maxN, c1Value);
                  funcHigherBoundG = this.solveFunction(EquationG, maxN, c2Value);

                  if(funcLowerBoundG <= funcSolutionF && funcSolutionF <= funcHigherBoundG)
                  {
                    sendProblem({
                      userID: this.props.user.id,
                      username: this.props.user.username,
                      email: this.props.user.email,
                      typeIndex: 12,
                      input: {
                        m_FxEquation: this.state.m_FxEquation,
                        m_GxEquation: this.state.m_GxEquation,
                        m_nValue: this.state.m_nValue,
                        m_c1Value: this.state.m_c1Value,
                        m_c2Value: this.state.m_c2Value
                      }
                    });

                    this.setState({Answer: "Verification was Successful.\n The inputs provided are a correct solution." });
                    return;
                  }
                  else 
                  {
                    this.setState({Answer: "The inputs provided were unsuccessful.\n Try inputting different variable values." });
                    return;
                  }
                }
                else
                {
                  //alert(funcSolutionF + "   " + funcLowerBoundG + "  " + funcHigherBoundG)
                  this.setState({Answer: "The inputs provided were unsuccessful.\n Try inputting different variable values." });
                  return;
                }
               // alert(funcSolutionF + "   " + funcLowerBoundG + "  " + funcHigherBoundG)
                
              }
              else
              {
                return;
              }

          }
          else
          {
         //   alert(nValue + " " + c1Value + "  " + c2Value )
            this.setState({error2: "Error: Must have values for all three of the above variable values: N, C1, C2" });
            return;
          }
        }
        else
        {
          this.setState({error2: "Error: Must have successfully verified f(x) and g(x) to be same order before inputting Variable Values." });
          return;
        }
    }

    solveFunction(func, nValue, cValue)
    {
      while(func.includes("log("))
      { 
         //alert("enter")
        // alert(Terms + " " + Terms.indexOf(")") + " " + Terms.indexOf("log("))
         var Lslice = func.slice(func.indexOf("log("), func.indexOf(")", func.indexOf("log(")) + 1)
        // alert("Lslice: " + Lslice)
         var value = Lslice.slice(Lslice.indexOf("log(") + 4, Lslice.indexOf(")", func.indexOf("log(")))
         //alert("value: " + value)
         const g = parse(value)
        // alert("g: " + g)
         const simpl = simplify(g)
        // alert("simpl: " + simpl)
         var logNumber = simpl.evaluate({x:nValue})

         func = func.replace(Lslice, Math.log10(logNumber))
      }

      var terms = func;

      if(cValue == null) //Solve for fx
      {
        const f = parse(terms);
        const simpl = simplify(f);
        return simpl.evaluate({x:nValue})
      }

      if(cValue.includes("/"))
      {
        cValue = simplify(parse(cValue)).evaluate();
      }

      terms = cValue + "(" + func + ")";
      const f = parse(terms);
      const simpl = simplify(f);
      return simpl.evaluate({x:nValue})
      
    }

    testValues(nValue, c1Value, c2Value)
    {
      if(nValue < 1 || nValue > 100)
      {
        this.setState({error2: "Error: Invalid N value. N must be >= 1 and <= 100" });
        return false;
      }
      if(c1Value <= 0)
      {
        this.setState({error2: "Error: Invalid c1 value. c1 must be > 0" });
        return false;
      }
      if(c2Value <= 0)
      {
        this.setState({error2: "Error: Invalid c2 value. c2 must be > 0" });
        return false;
      }
      if(nValue.includes(".") || nValue.includes("/"))
      {
        this.setState({error2: "Error: N Value must be a whole number" });
        return false;
      }

      return true;
    }

    render()
    {
        return (
          <div>
          <div className="container" style={{ marginTop: "50px" }}>
            <Card>
            <Form style={{marginLeft: "10px", marginRight: "10px"}}>
            <h1>Order Verification</h1>
              <Form.Group controlId="truthTableBuilder.instructions">
                <Form.Label><b>Instructions</b></Form.Label>
                <p>
                In the two input boxes below 'Function Input', provide two functions: 1) f(x) 2) g(x). Once you click the Verify Order button, the solver will determine if the 
                functions are of the same Order of Magnitude, AKA: have the same growth rate. Once your functions have been Verified successfully, input the three variable values 
                N, c1, and c2 in the three input boxes below 'Variable Values' that should make it so the relationship that (x >= N), and {'c1*g(x) <= f(x) <= c2*g(x)'} holds true. Once
                the Verify Inputs button is clicked, the solver will verify if the N, c1, and c2 values holds the definition provided in the previous statement true.
                </p>
              </Form.Group>
              <Form.Group controlId="truthTableBuilder.FunctionInput">
                <Form.Label><b>Examples</b> </Form.Label>
                <p>1) f(x) = x<br></br>
                g(x) = 17x + 1</p>
                <p>2) f(x) = 3x^3 - 7x<br></br>
                g(x) = (x^3)/2</p>
                <p>4) f(x) = sqrt(x + 100)<br></br>
                g(x) = sqrt(x)</p>
                <p>5) f(x) = x^3 + log(x)<br></br>
                g(x) = x^3</p>
                <form id = "FunctionInputForm">
                <Form.Label>Function Input</Form.Label>
                    <div>
                         f(x): {' '}
                        <input
                        value = {this.state.m_FxEquation}
                        onChange = {this.setFxEquation}>
                          
                        </input>
                    </div>
                    <div>
                         g(x):
                        <input
                        value = {this.state.m_GxEquation}
                        onChange = {this.setGxEquation}>
                        
                        </input>
                    </div>
                  <br></br>
                    <label>
                         <button type="button"  onClick = {this.VerifyOrder}>
                           Verify Order
                         </button>
                         <span style={{ color: 'black'}}>
                         {this.state.Verification ? this.state.Verification : ""}
                        </span>
                    </label><br></br>
                    <span style={{ color: 'red' }}>
                    {this.state.error ? this.state.error : ""}
                    </span>
                </form>
              </Form.Group>

              <Form.Group >
                <Form.Label>Variable Values</Form.Label> <Form.Label style= {{marginLeft: "125px"}}>Variable Restrictions</Form.Label>

                <div>
                  N:
                  <input
                  value = {this.state.nValue}
                  onChange = {this.setNValue}
                  style = {{marginLeft: "10px"}}>
                 </input>
                 <Form.Label style= {{marginLeft: "18px", fontWeight: "normal"}}>{'N >= 1 and N <= 100, N must be a whole number'}</Form.Label>
                </div>
                <div>
                  C1:
                  <input
                  value = {this.state.c1Value}
                  onChange = {this.setc1Value}
                  style = {{marginLeft: "2px"}}>
                 </input>
                 <Form.Label style= {{marginLeft: "18px", fontWeight: "normal"}}>{'C1 > 0'}</Form.Label>
                </div>
                <div>
                  C2:
                  <input
                  value = {this.state.c2Value}
                  onChange = {this.setc2Value}
                  style = {{marginLeft: "2px"}}>
                 </input>
                 <Form.Label style= {{marginLeft: "18px", fontWeight: "normal"}}>{'C2 > 0 '}</Form.Label>
                </div>

                <br></br>
                <label>
                  <button type="button"  onClick = {this.VerifyInputs}>
                    Verify Inputs
                  </button>
                </label><br></br>
                <span style={{ color: 'red' }}>
                    {this.state.error2 ? this.state.error2 : ""}
                </span>
              </Form.Group>

              <Form.Group controlId="truthTableBuilder.cardOutput">
                <Form.Label>Result</Form.Label>
                <Card body style={{ minHeight: "100px" }}>
                <span style={{ color: 'black' }}>
                {this.state.Answer ? this.state.Answer : ""}
                </span>
                </Card>
              </Form.Group>
              </Form>
              </Card>
         </div>
         <br></br>
         <br></br>
          </div>
        )
    }
}
export default MagnitudeOrder;