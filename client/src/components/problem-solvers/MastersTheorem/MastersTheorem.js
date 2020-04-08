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

        if(this.ParseEquation() == true)
        {   

        }
        else 
        {
            document.getElementById("ErrorMessage").innerHTML = "Error: Invalid Format of Recurrence Equation has been detected. Try to format your problem like the provided example.";
            document.getElementById("ErrorMessage").style.display = "block";
        }
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
            var EndIndex = this.state.m_RecurrenceEquation.indexOf("(", StartIndex);
            var TempString = this.state.m_RecurrenceEquation + " eol";
          
            if((StartIndex != -1 && EndIndex != -1) && (StartIndex + 1) <= (EndIndex -1))  //Used to grab and set the a value
            {
              aValue = this.state.m_RecurrenceEquation.slice(StartIndex + 1, EndIndex -1);
                
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
				      return false;
			      }
              
            //alert("TempString: " + TempString)
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
          
            StartIndex = TempString.indexOf(" ");
            EndIndex = TempString.indexOf("eol");
          
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
              else if((TempString.includes("n^") == true || TempString.includes("n ^")) && (TempString.includes("/n") == false|| !TempString.includes("\n") == false))
              {
                
                dValue = TempString.slice(StartIndex + 1 , TempString.length);
                dValue.trim();

                TempString = TempString.slice(StartIndex + 1);
                
                if(TempString.includes("^")) //Weird formatting discovered
                {
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
                  else dValue = "-1";
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
              else dValue = -1;
              
            }
            else
            {
              return false;
            }
            
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
         if(aValue < Math.pow(bValue, dValue)) // a < b^d == O(n^d)
         {
            document.getElementById("Answer").innerHTML = "O(n" + dValue.toString().sup() + ")"; 
            document.getElementById("Answer").style.display = "block";
         }
         else if(aValue == Math.pow(bValue, dValue))
         {
            document.getElementById("Answer").innerHTML = "O(n" + dValue.toString().sup() + "logn)"; 
            document.getElementById("Answer").style.display = "block";
         }
         else
         {
            document.getElementById("Answer").innerHTML = "O(n" + ("log" + dValue.toString().sub() + " " + aValue).sup() + ")"; 
            document.getElementById("Answer").style.display = "block";
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
            <Form>
            <h1>Master's Theorem</h1>
              <Form.Group controlId="truthTableBuilder.instructions">
                <Form.Label>Instructions</Form.Label>
                <p>
                Enter a formula of standard propositional, predicate, or modal logic. Enter a valid Recurrence Equation in order to solve it using Master's theorem.
                </p>
              </Form.Group>
              <Form.Group controlId="truthTableBuilder.textInput">
                <Form.Label>Example</Form.Label>
                <p>S(n) = 2S(n/4) + n^2</p>
                <form id = "RecurrenceEquationForm">
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
                <div id = "Output">
					         <div id = "ErrorMessage" style={{display: "none", color:"red"}}>
					         </div>
                 
                   <div id = "Answer">
                   </div>
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

export default MastersTheorem;