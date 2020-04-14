import React from 'react'
import { Form, Card } from 'react-bootstrap';
import { sendProblem } from '../../../utils/problemsAPIUtil';

class MastersTheorem extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
             m_RecurrenceEquation: " " //Needed state obtained from the user

             //Removed m_aValue, m_bValue, m_dValue due to them not needing to be states.
             //these values are obtained through parsing m_RecurrenceEquation, and they
             //get used internal to the javascript.
        };
        this.HandleClick = this.HandleClick.bind(this);
        this.SolveProblem = this.SolveProblem.bind(this);
        this.ParseEquation = this.ParseEquation.bind(this);
        this.setRecurrenceEquation = this.setRecurrenceEquation.bind(this);
    }

    HandleClick(e)
    {
        document.getElementById("Answer").style.display = "none";
        document.getElementById("Answer").innerHTML = "";
        document.getElementById("ErrorMessage").style.display = "none";
        document.getElementById("ErrorMessage").innerHTML = "";
      
        e.preventDefault();

       this.ParseEquation()

    }

    setRecurrenceEquation(event)
    {
      this.setState({
        m_RecurrenceEquation: event.currentTarget.value.trim()
        });
    }

    ParseEquation()
    {
      var aValue = null;
      var bValue = null;
      var dValue = null;
        if(this.state.m_RecurrenceEquation != null && this.state.m_RecurrenceEquation != "")
        {
            var StartIndex = 0;
            var TempString = this.state.m_RecurrenceEquation + " eol";
            var EndIndex = TempString.indexOf("(", StartIndex);
            


            TempString = TempString.trim()
          
            //alert(TempString)
            if((StartIndex != -1 && EndIndex != -1) && (StartIndex + 1) <= (EndIndex))  //Used to grab and set the a value
            {
              aValue = this.state.m_RecurrenceEquation.slice(StartIndex, EndIndex -1);
                
              aValue.trim();
                if(aValue == "" || aValue == " ")
                {
                  aValue = "1";
                }
                if(aValue.includes("-") || aValue.includes("/") || aValue.includes("\\"))
                {
                  aValue = "-1";
                }
                
                aValue = parseInt(aValue);
                TempString = TempString.slice(EndIndex, TempString.length);
                
            }
		       	else
		      	{
              document.getElementById("ErrorMessage").innerHTML = "Error: Invalid Format of Recurrence Equation has been detected. Try to format Recurrence Input like the examples above.";
              document.getElementById("ErrorMessage").style.display = "block";
				      return false;
            }
            
            StartIndex = TempString.indexOf("/");
            EndIndex = TempString.indexOf(")");
          
            if((StartIndex != -1 && EndIndex != -1) && ((StartIndex + 1) <= (EndIndex -1)))
            {
                bValue = TempString.slice(StartIndex + 1 , EndIndex);
                bValue.trim();
                bValue = parseInt(bValue);
                TempString = TempString.slice(EndIndex + 1, TempString.length);
                TempString = TempString.trim();
            }
            else
            {
              bValue = 0;
            }

            //alert(TempString)
            
            if(!TempString.slice(0, TempString.indexOf(" eol")).includes(" "))
            {
              document.getElementById("ErrorMessage").innerHTML = "Error: Invalid Format of Recurrence Equation has been detected. Try to include spacing between terms like in the examples.";
              document.getElementById("ErrorMessage").style.display = "block";
              return false
            }

            StartIndex = TempString.indexOf(" ");
            EndIndex = TempString.indexOf("eol");

            
           // alert("Value: " + parseInt(TempString) + "   NormalTemp: " + TempString)

            if((StartIndex != -1 && EndIndex != -1) && ((StartIndex + 1) <= (EndIndex -1)))
            {
              TempString = TempString.slice(StartIndex + 1, EndIndex -1);
             
              if((TempString.includes("O(") == true || TempString.includes("o(") == true) && TempString.includes(")")) //Function contains O(value)
              {
                TempString = TempString.slice(TempString.indexOf("(") + 1, TempString.indexOf(")"));
                TempString.trim();
              }
              if(TempString.includes("logn") == true)
              {
                  TempString = TempString.slice(0, TempString.indexOf("logn"));
                  TempString.trim();
              }
              
              StartIndex = TempString.indexOf("^");
              
              if(TempString == "n" || TempString == "n^")
              {
                dValue = 1;   
              }
              else if((TempString.includes("n^") == true || TempString.includes("n ^")) && (TempString.includes("/n") == false))
              {
                
                dValue = TempString.slice(StartIndex + 1 , TempString.length);
                dValue.trim();

                TempString = TempString.slice(StartIndex + 1);
                
                if(TempString.includes("^")) //Weird formatting discovered
                {
                  document.getElementById("ErrorMessage").innerHTML = "Error: Invalid Format of Recurrence Equation has been detected. Detected weird syntax for ^.";
                  document.getElementById("ErrorMessage").style.display = "block";
                  return false;
                }

                //alert(dValue)

                if(dValue.includes("(") && dValue.includes(")"))
                {
                  dValue = dValue.slice(dValue.indexOf("(") + 1, dValue.indexOf(")"));
                }
                //alert(dValue)
                if(dValue.includes("/"))
                {
                  var TempNumber1 = dValue.slice(0, dValue.indexOf("/"));
                  var TempNumber2 = dValue.slice(dValue.indexOf("/") + 1, dValue.length);
                  //alert(TempNumber1 + "   " + TempNumber2);
                  
                  if(isNaN(parseFloat(TempNumber1)) == false && isNaN(parseFloat(TempNumber2)) == false && TempNumber1 != 0 && TempNumber2 != 0)
                  {
                    dValue = parseFloat(parseFloat(TempNumber1) / parseFloat(TempNumber2)).toFixed(2);
                  }
                  else if(TempString.includes("+") || TempString.includes("-"))
                  {
                    
                   TempString = TempString.replace("+", " ");
                   TempString = TempString.replace("-", " ");
                   TempString = TempString.trim();
                
                   dValue = parseInt(TempString);
                  }
                  else dValue = -1
                }
                
                if(dValue.includes("."))
                {
                  dValue = parseFloat(dValue).toFixed(2);
                }
                else
                {
                  dValue = parseInt(dValue);
                }
                
                TempString = TempString.slice(EndIndex, TempString.length);
              }
              else if(TempString.includes("+") || TempString.includes("-"))
              {
               TempString = TempString.replace("+", " ");
               TempString = TempString.replace("-", " ");
               TempString = TempString.trim();
            
               
              }
              else dValue = 0;
              
            }
            else
            {
              document.getElementById("ErrorMessage").innerHTML = "Error: Invalid Format of Recurrence Equation has been detected. Try to format your problem like the provided example.";
              document.getElementById("ErrorMessage").style.display = "block";
              return false;
            }
            
            //alert("Welcome: " + parseInt(TempString) + "   dValue: " + dValue)
              if(this.SolveProblem(aValue, bValue, dValue) == true)
              {
                return true; //Successfully parsed and solved
              }
              else return false;

        }
        return false;
    }

    SolveProblem(aValue, bValue, dValue)
    {
      var IncorrectData = false;
      
       if(aValue < 1 || isNaN(aValue))
        {
          IncorrectData = true;
          document.getElementById("ErrorMessage").innerHTML =  "Error: Invalid Format of Recurrence Equation has been detected.";
       }
      
       if(bValue <= 1 || isNaN(bValue))
       {
          IncorrectData = true;
          document.getElementById("ErrorMessage").innerHTML = document.getElementById("ErrorMessage").innerHTML + " <br></br> Error: Invalid Format of Recurrence Equation has been detected.";
        }
          
       if(dValue < 0 || isNaN(dValue))
       {
          IncorrectData = true;
          document.getElementById("ErrorMessage").innerHTML = document.getElementById("ErrorMessage").innerHTML + " <br></br> Error: Invalid Format of Recurrence Equation has been detected.";
       }
      
      if(IncorrectData != true)
      {

        //alert(aValue + " " + bValue + " " + dValue)

         if(aValue < Math.pow(bValue, dValue)) // a < b^d == O(n^d)
         {
            document.getElementById("Answer").innerHTML = "&Theta;(n" + dValue.toString().sup() + ")"; 
            document.getElementById("Answer").style.display = "block";
         }
         else if(aValue == Math.pow(bValue, dValue))
         {
           if(dValue != 1)
           {
            document.getElementById("Answer").innerHTML = "&Theta;(n" + dValue.toString().sup() + "logn)"; 
            document.getElementById("Answer").style.display = "block";
           }
           else
           {
            document.getElementById("Answer").innerHTML = "&Theta;(n" + "logn)"; 
            document.getElementById("Answer").style.display = "block";
           }
         }
         else
         {
           if(bValue === aValue)
           {
            document.getElementById("Answer").innerHTML = "&Theta;(n" + "1".sup() + ")"; 
            document.getElementById("Answer").style.display = "block";
           }
           else 
           {
            document.getElementById("Answer").innerHTML = "&Theta;(n" + ("log" + bValue.toString().sub() + " " + aValue).sup() + ")"; 
            document.getElementById("Answer").style.display = "block";
           }
         }
         
         //sendProblem({});
         
         sendProblem({
          userID: this.props.user.id,
          username: this.props.user.username,
          email: this.props.user.email,
          typeIndex: 7,
          input: {
            m_RecurrenceEquation: this.state.m_RecurrenceEquation
          }
          });
         //send data to data base
        return true;
      }
      document.getElementById("ErrorMessage").style.display = "block";
      
      return false;
    }

    render()
    {
        return (
          <div>
          <div className="container" style={{ marginTop: "50px" }}>
          <Card>
            <Form style={{marginLeft: "10px", marginRight: "10px"}}>
            <h1>Master's Theorem</h1>
              <Form.Group controlId="truthTableBuilder.instructions">
                <Form.Label>Instructions</Form.Label>
                <p>
                Enter a valid Recurrence Relation into the textbox below. The solver will use Master's Theorem to determine an
                Order of Magnitude Expression to explain the work done by the Recurrence Relation.
                </p>
                <Form.Label>Usage</Form.Label>
                <p>
                Click on the textbox below and enter a valid Recurrence Relation. Once your Recurrence Relation is entered, press Submit
                to get your answer in the result box below.<br></br><br></br>
                  <ul> Input Constraints
                    <li>&#8730;n - Represented by n^(0.5) or n^(1/2).</li>
                    <li>
                      Spacing - Try to space inputs like the examples below. The solver works best when spaces are included between operations.
                    </li>
                  </ul>
                </p>
              </Form.Group>
              <Form.Group controlId="truthTableBuilder.textInput">
                <Form.Label>Examples</Form.Label>
                <p>S(n) = 2S(n/4) + n^2 <br></br>
                   S(n) = 3S(n/3) + n^(1/2)</p>
                <form id = "RecurrenceEquationForm">
                <Form.Label>Recurrence Equation Input</Form.Label>
                    <div>
                       S(n) = <input
                        as="select"
                        onChange = {this.setRecurrenceEquation}> 
                        </input>
                        
                        
                    </div>
                    <button id = "SubmitButton"  onClick = {this.HandleClick} >
                           Submit
                        </button>
                </form>
              </Form.Group>

              <Form.Group controlId="truthTableBuilder.cardOutput">
                <Form.Label>Result</Form.Label>
                <Card body style={{ minHeight: "100px" }}>
                <div id = "Output" style={{fontSize: "16px"}}>
					         <div id = "ErrorMessage" style={{display: "none", color:"red"}}>
					         </div>
                 
                   <div id = "Answer">
                   </div>
				       </div>
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

export default MastersTheorem;